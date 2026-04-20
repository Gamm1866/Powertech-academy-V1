#!/usr/bin/env python3
"""
PowerTech Academy — Google Ads Uploader COMPLETAMENTE AUTOMÁTICO
================================================================
Lee el CSV, autentica con OAuth2, crea/actualiza Ad Groups y RSAs.

Ejecutar:  python3 powertech_ads_upload_auto.py
"""

import csv
import json
import os
import sys
import time
from pathlib import Path

# ─── Configuración ─────────────────────────────────────────────────────────────
CUSTOMER_ID       = "9525479015"
CAMPAIGN_NAME     = "Fire Alarm Training Florida"
CSV_FILE          = "powertech_ads_variants_ES.csv"
CLIENT_SECRETS    = "client_secret_67496794985-05nb7q7tcau7btl288ggbn101cirkpb6.apps.googleusercontent.com.json"
NEW_AD_GROUP_NAME = "Búsqueda ES — Fire Alarm"
FINAL_URL         = "https://powertechacademy.com"
GOOGLE_ADS_YAML   = "google-ads.yaml"
TOKEN_CACHE       = ".google_ads_token.json"
ADS_API_VERSION   = "v17"
SCOPES            = ["https://www.googleapis.com/auth/adwords"]

# Descripciones EN de fallback cuando no hay RSA existente con descripciones
EN_FALLBACK_DESCRIPTIONS = [
    "Hands-on fire alarm training in South Florida. Get certified in 2–3 months.",
    "94% job placement. Start your career in Fire & Life Safety today.",
]

# ─── Helpers de output ─────────────────────────────────────────────────────────
GREEN  = "\033[92m"
RED    = "\033[91m"
CYAN   = "\033[96m"
YELLOW = "\033[93m"
BOLD   = "\033[1m"
RESET  = "\033[0m"

def ok(msg):   print(f"{GREEN}  ✅ {msg}{RESET}")
def err(msg):  print(f"{RED}  ❌ {msg}{RESET}")
def info(msg): print(f"{CYAN}  ℹ  {msg}{RESET}")
def warn(msg): print(f"{YELLOW}  ⚠  {msg}{RESET}")
def step(msg): print(f"\n{BOLD}{CYAN}▶ {msg}{RESET}")
def sep():     print("─" * 65)


# ══════════════════════════════════════════════════════════════════
#  PASO 1 — Verificar e instalar dependencias automáticamente
# ══════════════════════════════════════════════════════════════════
def ensure_dependencies():
    step("Verificando dependencias...")
    packages = {
        "google-ads":             "google.ads.googleads",
        "google-auth-oauthlib":   "google_auth_oauthlib",
        "google-auth":            "google.oauth2.credentials",
    }
    missing = []
    for pkg, module in packages.items():
        try:
            __import__(module)
            ok(f"{pkg} ✓")
        except ImportError:
            missing.append(pkg)
            warn(f"{pkg} — NO encontrado")

    if missing:
        info(f"Instalando: {' '.join(missing)} ...")
        import subprocess
        subprocess.check_call([sys.executable, "-m", "pip", "install", "--quiet"] + missing)
        ok("Dependencias instaladas")


# ══════════════════════════════════════════════════════════════════
#  PASO 2 — Leer CSV
# ══════════════════════════════════════════════════════════════════
def read_variants() -> dict:
    step("Leyendo variantes del CSV...")

    if not Path(CSV_FILE).exists():
        err(f"Archivo no encontrado: {CSV_FILE}")
        sys.exit(1)

    variants: dict = {"titles_en": [], "titles_es": [], "descriptions_es": []}

    with open(CSV_FILE, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            tipo, idioma, texto = row["Tipo"], row["Idioma"], row["Texto"]
            if tipo == "Título" and idioma == "EN":
                variants["titles_en"].append(texto)
            elif tipo == "Título" and idioma == "ES":
                variants["titles_es"].append(texto)
            elif tipo == "Descripción" and idioma == "ES":
                variants["descriptions_es"].append(texto)

    ok(f"Títulos EN ({len(variants['titles_en'])}): {variants['titles_en']}")
    ok(f"Títulos ES ({len(variants['titles_es'])}): {variants['titles_es']}")
    ok(f"Descripciones ES ({len(variants['descriptions_es'])})")
    return variants


# ══════════════════════════════════════════════════════════════════
#  PASO 3 — Autenticación OAuth2 con caché de token
# ══════════════════════════════════════════════════════════════════
def authenticate():
    step("Autenticando con Google Ads API...")

    from google.ads.googleads.client import GoogleAdsClient
    import google.oauth2.credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    import google.auth.transport.requests

    # — Leer developer_token —————————————————————————————
    dev_token = os.environ.get("GOOGLE_ADS_DEVELOPER_TOKEN", "")
    login_cid  = None

    if Path(GOOGLE_ADS_YAML).exists():
        try:
            import yaml  # type: ignore
            with open(GOOGLE_ADS_YAML) as f:
                yml = yaml.safe_load(f)
            dev_token  = yml.get("developer_token", dev_token)
            login_cid  = str(yml.get("login_customer_id", "")).replace("-", "") or None
        except Exception as e:
            warn(f"No se pudo leer {GOOGLE_ADS_YAML}: {e}")

    if not dev_token:
        err("developer_token no encontrado.")
        print(
            "\nSoluciones:\n"
            "  1. Agrega 'developer_token: TU_TOKEN' en google-ads.yaml\n"
            "  2. O ejecuta: export GOOGLE_ADS_DEVELOPER_TOKEN=TU_TOKEN\n"
        )
        sys.exit(1)

    # — Leer client_id / client_secret del JSON de secretos —
    if not Path(CLIENT_SECRETS).exists():
        err(f"No se encontró: {CLIENT_SECRETS}")
        sys.exit(1)

    with open(CLIENT_SECRETS) as f:
        secrets_raw = json.load(f)
    secrets_block = secrets_raw.get("web") or secrets_raw.get("installed", {})
    client_id     = secrets_block["client_id"]
    client_secret = secrets_block["client_secret"]

    # — Obtener credentials (token cacheado o flujo OAuth) —
    refresh_token = None
    cached_token  = None

    if Path(TOKEN_CACHE).exists():
        with open(TOKEN_CACHE) as f:
            cached = json.load(f)
        if cached.get("client_id") == client_id:
            refresh_token = cached.get("refresh_token")
            cached_token  = cached.get("token")
            info("Token OAuth cacheado encontrado, reusando...")

    if refresh_token:
        credentials = google.oauth2.credentials.Credentials(
            token=cached_token,
            refresh_token=refresh_token,
            token_uri="https://oauth2.googleapis.com/token",
            client_id=client_id,
            client_secret=client_secret,
            scopes=SCOPES,
        )
        # Refrescar si expiró
        try:
            request = google.auth.transport.requests.Request()
            credentials.refresh(request)
            ok("Credentials refrescadas correctamente")
        except Exception as e:
            warn(f"Token expirado o inválido ({e}), re-autenticando...")
            refresh_token = None

    if not refresh_token:
        info("Abriendo navegador para autorización OAuth2...")
        flow = InstalledAppFlow.from_client_secrets_file(
            CLIENT_SECRETS, scopes=SCOPES
        )
        credentials = flow.run_local_server(port=0, prompt="consent", access_type="offline")
        refresh_token = credentials.refresh_token

        with open(TOKEN_CACHE, "w") as f:
            json.dump({
                "client_id":     client_id,
                "token":         credentials.token,
                "refresh_token": refresh_token,
            }, f, indent=2)
        ok(f"Token guardado en {TOKEN_CACHE}")

    # — Construir GoogleAdsClient —————————————————————————
    config: dict = {
        "developer_token": dev_token,
        "client_id":       client_id,
        "client_secret":   client_secret,
        "refresh_token":   refresh_token,
        "use_proto_plus":  True,
    }
    if login_cid:
        config["login_customer_id"] = login_cid

    client = GoogleAdsClient.load_from_dict(config, version=ADS_API_VERSION)
    ok("GoogleAdsClient inicializado\n")
    return client


# ══════════════════════════════════════════════════════════════════
#  PASO 4 — Obtener Campaign ID
# ══════════════════════════════════════════════════════════════════
def get_campaign_id(client) -> int | None:
    step(f"Buscando campaña: '{CAMPAIGN_NAME}'...")

    ga_service = client.get_service("GoogleAdsService")
    # Escapar comillas simples en el nombre
    safe_name = CAMPAIGN_NAME.replace("'", "\\'")
    query = f"""
        SELECT campaign.id, campaign.name
        FROM campaign
        WHERE campaign.name = '{safe_name}'
          AND campaign.status != 'REMOVED'
        LIMIT 1
    """

    try:
        response = ga_service.search(customer_id=CUSTOMER_ID, query=query)
        for row in response:
            cid = row.campaign.id
            ok(f"Campaña encontrada: '{row.campaign.name}'  →  ID: {cid}")
            return cid
    except Exception as e:
        err(f"Error en búsqueda de campaña: {e}")
        return None

    err(f"Campaña '{CAMPAIGN_NAME}' no encontrada en la cuenta {CUSTOMER_ID}")
    return None


# ══════════════════════════════════════════════════════════════════
#  PASO 5 — Obtener primer Ad Group de la campaña
# ══════════════════════════════════════════════════════════════════
def get_existing_ad_group(client, campaign_id: int) -> tuple[int | None, str]:
    step("Buscando Ad Group existente (EN)...")

    ga_service = client.get_service("GoogleAdsService")
    query = f"""
        SELECT ad_group.id, ad_group.name
        FROM ad_group
        WHERE campaign.id = {campaign_id}
          AND ad_group.status != 'REMOVED'
        ORDER BY ad_group.id ASC
        LIMIT 1
    """

    try:
        response = ga_service.search(customer_id=CUSTOMER_ID, query=query)
        for row in response:
            ag_id   = row.ad_group.id
            ag_name = row.ad_group.name
            ok(f"Ad Group: '{ag_name}'  →  ID: {ag_id}")
            return ag_id, ag_name
    except Exception as e:
        err(f"Error buscando ad group: {e}")

    err("No se encontró ningún Ad Group activo en la campaña")
    return None, ""


# ══════════════════════════════════════════════════════════════════
#  PASO 6 — Obtener RSA existente (para reusar sus descriptions)
# ══════════════════════════════════════════════════════════════════
def get_rsa_descriptions(client, ad_group_id: int) -> list[str]:
    """Devuelve los texts de descriptions del primer RSA activo, o lista vacía."""
    ga_service = client.get_service("GoogleAdsService")
    query = f"""
        SELECT
            ad_group_ad.ad.id,
            ad_group_ad.ad.responsive_search_ad.descriptions
        FROM ad_group_ad
        WHERE ad_group.id = {ad_group_id}
          AND ad_group_ad.status != 'REMOVED'
          AND ad_group_ad.ad.type = 'RESPONSIVE_SEARCH_AD'
        LIMIT 1
    """
    try:
        response = ga_service.search(customer_id=CUSTOMER_ID, query=query)
        for row in response:
            rsa = row.ad_group_ad.ad.responsive_search_ad
            descs = [d.text for d in rsa.descriptions if d.text]
            if descs:
                info(f"Descripciones EN existentes reutilizadas: {descs}")
                return descs
    except Exception as e:
        warn(f"No se pudo leer RSA existente: {e}")
    return []


# ══════════════════════════════════════════════════════════════════
#  PASO 7 — Crear RSA en un Ad Group dado
# ══════════════════════════════════════════════════════════════════
def create_rsa(client, ad_group_id: int, titles: list[str], descriptions: list[str],
               label: str) -> bool:
    step(f"Creando RSA [{label}] → {len(titles)} títulos, {len(descriptions)} descripciones...")

    if len(titles) < 3:
        warn(f"Google Ads requiere mínimo 3 headlines. Tienes {len(titles)}. Abortando RSA {label}.")
        return False
    if len(descriptions) < 2:
        warn(f"Se necesitan mínimo 2 descriptions. Usando fallback EN.")
        descriptions = EN_FALLBACK_DESCRIPTIONS

    ad_group_ad_service = client.get_service("AdGroupAdService")

    op = client.get_type("AdGroupAdOperation")
    aga = op.create

    # Resource name del ad group
    aga.ad_group = client.get_service("AdGroupService").ad_group_path(
        CUSTOMER_ID, ad_group_id
    )
    aga.status = client.enums.AdGroupAdStatusEnum.ENABLED

    rsa = aga.ad.responsive_search_ad

    # Headlines (máx 15, mín 3)
    for text in titles[:15]:
        h = client.get_type("AdTextAsset")
        h.text = text[:30]
        rsa.headlines.append(h)

    # Descriptions (máx 4, mín 2)
    for text in descriptions[:4]:
        d = client.get_type("AdTextAsset")
        d.text = text[:90]
        rsa.descriptions.append(d)

    aga.ad.final_urls.append(FINAL_URL)

    try:
        response = ad_group_ad_service.mutate_ad_group_ads(
            customer_id=CUSTOMER_ID, operations=[op]
        )
        rname = response.results[0].resource_name
        ok(f"RSA [{label}] creado → {rname}")
        for t in titles[:15]:
            print(f"        • Título:      {t}")
        for d in descriptions[:4]:
            print(f"        • Descripción: {d[:70]}{'...' if len(d)>70 else ''}")
        return True
    except Exception as e:
        err(f"Error creando RSA [{label}]: {e}")
        _print_google_ads_error(e)
        return False


# ══════════════════════════════════════════════════════════════════
#  PASO 8 — Crear Ad Group ES
# ══════════════════════════════════════════════════════════════════
def create_es_ad_group(client, campaign_id: int) -> int | None:
    step(f"Creando Ad Group ES: '{NEW_AD_GROUP_NAME}'...")

    op = client.get_type("AdGroupOperation")
    ag = op.create

    ag.name     = NEW_AD_GROUP_NAME
    ag.campaign = client.get_service("CampaignService").campaign_path(
        CUSTOMER_ID, campaign_id
    )
    ag.status        = client.enums.AdGroupStatusEnum.ENABLED
    ag.type_         = client.enums.AdGroupTypeEnum.SEARCH_STANDARD
    ag.cpc_bid_micros = 1_000_000  # $1.00 CPC

    try:
        response = client.get_service("AdGroupService").mutate_ad_groups(
            customer_id=CUSTOMER_ID, operations=[op]
        )
        rname  = response.results[0].resource_name
        new_id = int(rname.split("/")[-1])
        ok(f"Ad Group ES creado: '{NEW_AD_GROUP_NAME}'  →  ID: {new_id}")
        return new_id
    except Exception as e:
        err(f"Error creando Ad Group ES: {e}")
        _print_google_ads_error(e)
        return None


# ══════════════════════════════════════════════════════════════════
#  Helper — Mostrar detalles de errores de Google Ads
# ══════════════════════════════════════════════════════════════════
def _print_google_ads_error(exc):
    try:
        from google.ads.googleads.errors import GoogleAdsException
        if isinstance(exc, GoogleAdsException):
            for error in exc.failure.errors:
                warn(f"  Google Ads Error: {error.message}")
                if error.location:
                    for fv in error.location.field_value_references:
                        warn(f"    Campo: {fv.field_name}")
    except Exception:
        pass


# ══════════════════════════════════════════════════════════════════
#  MAIN
# ══════════════════════════════════════════════════════════════════
def main():
    start = time.time()
    print()
    print("═" * 65)
    print(f"  {BOLD}📤  PowerTech Academy — Google Ads Uploader AUTOMÁTICO{RESET}")
    print("═" * 65)

    summary = {
        "campaign_id":          None,
        "existing_ag_id":       None,
        "existing_ag_name":     "",
        "en_rsa_created":       False,
        "new_es_ag_id":         None,
        "es_rsa_created":       False,
        "errors":               [],
    }

    # 1. Dependencias
    ensure_dependencies()

    # 2. CSV
    variants = read_variants()

    # 3. Auth
    client = authenticate()

    # 4. Campaign ID
    campaign_id = get_campaign_id(client)
    if not campaign_id:
        err("No se pudo obtener el Campaign ID. Abortando.")
        sys.exit(1)
    summary["campaign_id"] = campaign_id

    # 5. Ad Group existente
    ag_id, ag_name = get_existing_ad_group(client, campaign_id)
    if not ag_id:
        err("No se pudo obtener Ad Group existente. Abortando.")
        sys.exit(1)
    summary["existing_ag_id"]   = ag_id
    summary["existing_ag_name"] = ag_name

    # 6. Agregar 6 títulos EN al Ad Group existente (nuevo RSA)
    #    Reusamos descriptions del RSA existente o usamos fallback
    existing_descs = get_rsa_descriptions(client, ag_id)
    en_descs = existing_descs if existing_descs else EN_FALLBACK_DESCRIPTIONS

    en_ok = create_rsa(
        client,
        ag_id,
        variants["titles_en"],   # 6 títulos EN (Title #6–11)
        en_descs,
        "EN-nuevos",
    )
    summary["en_rsa_created"] = en_ok
    if not en_ok:
        summary["errors"].append("RSA EN no creado")

    # 7. Crear Ad Group ES
    new_es_ag_id = create_es_ad_group(client, campaign_id)
    summary["new_es_ag_id"] = new_es_ag_id

    if new_es_ag_id:
        # 8. Crear RSA ES con 5 títulos + 4 descripciones
        es_ok = create_rsa(
            client,
            new_es_ag_id,
            variants["titles_es"],         # 5 títulos ES
            variants["descriptions_es"],   # 4 descripciones ES
            "ES",
        )
        summary["es_rsa_created"] = es_ok
        if not es_ok:
            summary["errors"].append("RSA ES no creado")
    else:
        summary["errors"].append("Ad Group ES no creado")

    # ── Resumen final ──────────────────────────────────────────────
    elapsed = time.time() - start
    print()
    print("═" * 65)
    print(f"  {BOLD}📊  RESUMEN FINAL{RESET}")
    print("═" * 65)
    print(f"  Cuenta (Customer ID):  {CUSTOMER_ID}")
    print(f"  Campaña:               {CAMPAIGN_NAME}")
    print(f"  Campaign ID:           {summary['campaign_id']}")
    sep()

    print(f"\n  Ad Group EN existente: '{summary['existing_ag_name']}' (ID: {summary['existing_ag_id']})")
    if summary["en_rsa_created"]:
        ok(f"RSA EN creado con {len(variants['titles_en'])} nuevos títulos (Title #6–#11)")
    else:
        err("RSA EN NO creado")

    print()
    if summary["new_es_ag_id"]:
        ok(f"Nuevo Ad Group ES: '{NEW_AD_GROUP_NAME}' (ID: {summary['new_es_ag_id']})")
    else:
        err(f"Ad Group ES NO creado")

    if summary["es_rsa_created"]:
        ok(f"RSA ES creado con {len(variants['titles_es'])} títulos + {len(variants['descriptions_es'])} descripciones")
    else:
        err("RSA ES NO creado")

    sep()
    if summary["errors"]:
        print()
        for e_msg in summary["errors"]:
            err(e_msg)
        print()
        warn("Proceso completado con errores. Revisa los mensajes anteriores.")
    else:
        print()
        ok("¡Todo cargado exitosamente en Google Ads! 🎉")

    print(f"\n  Tiempo total: {elapsed:.1f}s")
    print("═" * 65 + "\n")


if __name__ == "__main__":
    main()
