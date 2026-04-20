#!/usr/bin/env python3
"""
PowerTech Academy — Google Ads Campaign Importer
Importa automáticamente variantes EN/ES a Google Ads
"""

import csv
import json
from pathlib import Path

CUSTOMER_ID = "9525479015"
CAMPAIGN_NAME = "Fire Alarm Training Florida"
CSV_FILE = "powertech_ads_variants_ES.csv"

def read_variants_from_csv():
    """Lee variantes del CSV"""
    variants = {
        "titles_en": [],
        "titles_es": [],
        "descriptions_es": []
    }
    
    with open(CSV_FILE, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            tipo = row["Tipo"]
            idioma = row["Idioma"]
            texto = row["Texto"]
            
            if tipo == "Título" and idioma == "EN":
                variants["titles_en"].append(texto)
            elif tipo == "Título" and idioma == "ES":
                variants["titles_es"].append(texto)
            elif tipo == "Descripción" and idioma == "ES":
                variants["descriptions_es"].append(texto)
    
    return variants

def print_import_instructions(variants):
    """Imprime instrucciones de importación manual"""
    print("\n" + "="*70)
    print("📋 INSTRUCCIONES DE IMPORTACIÓN A GOOGLE ADS")
    print("="*70)
    
    print("\n🔵 PASO 1: Agregar 6 títulos EN a campaña actual")
    print("-" * 70)
    print("1. Ve a: Google Ads → Campañas → Fire Alarm Training Florida")
    print("2. Click en 'Grupos de recursos'")
    print("3. Click en 'Grupo de recursos 1'")
    print("4. Scroll a 'Títulos' y click en '+'")
    print("5. Copia y pega estos títulos:\n")
    
    for i, title in enumerate(variants["titles_en"], 6):
        print(f"   {i}. {title}")
    
    print("\n\n🟢 PASO 2: Crear nuevo Ad Group para Spanish")
    print("-" * 70)
    print("1. Ve a: Grupos de recursos (en la campaña)")
    print("2. Click en '+ Grupo de recursos'")
    print("3. Nombre: 'Búsqueda ES — Fire Alarm'")
    print("4. Agregar 5 títulos ES:")
    print()
    
    for i, title in enumerate(variants["titles_es"], 1):
        print(f"   {i}. {title}")
    
    print("\n5. Agregar 4 descripciones ES:")
    print()
    
    for i, desc in enumerate(variants["descriptions_es"], 1):
        print(f"   {i}. {desc}")
    
    print("\n\n" + "="*70)
    print("📊 RESUMEN FINAL")
    print("="*70)
    print(f"\n✅ Títulos EN para agregar: {len(variants['titles_en'])}")
    print(f"✅ Títulos ES para nuevo Ad Group: {len(variants['titles_es'])}")
    print(f"✅ Descripciones ES: {len(variants['descriptions_es'])}")
    print(f"\n📌 Customer ID: {CUSTOMER_ID}")
    print(f"📌 Campaña: {CAMPAIGN_NAME}")
    print("\n💡 Próximo paso: Abre Google Ads y sigue las instrucciones arriba")
    print("="*70 + "\n")

def export_import_guide():
    """Exporta guía de importación a archivo"""
    variants = read_variants_from_csv()
    
    guide_content = f"""# PowerTech Academy — Guía de Importación a Google Ads

## Información de la Campaña
- **Customer ID:** {CUSTOMER_ID}
- **Campaña:** {CAMPAIGN_NAME}
- **Generado:** 2026-04-17

## PASO 1: Agregar 6 Títulos EN (Title #6-11)

Ve a Google Ads → Tu Campaña → Grupos de Recursos → Grupo 1 → Títulos

Agrega estos títulos:

"""
    
    for i, title in enumerate(variants["titles_en"], 6):
        guide_content += f"{i}. {title}\n"
    
    guide_content += f"""

## PASO 2: Crear Nuevo Ad Group "Búsqueda ES"

1. Ve a Grupos de Recursos
2. Click en "+ Grupo de recursos"
3. Nombre: "Búsqueda ES — Fire Alarm"
4. Agrega estos 5 títulos ES:

"""
    
    for i, title in enumerate(variants["titles_es"], 1):
        guide_content += f"{i}. {title}\n"
    
    guide_content += f"""

5. Agrega estas 4 descripciones ES:

"""
    
    for i, desc in enumerate(variants["descriptions_es"], 1):
        guide_content += f"{i}. {desc}\n"
    
    guide_content += f"""

## Checklist Final

- [ ] Agregados 6 títulos EN a campaña actual
- [ ] Creado nuevo Ad Group "Búsqueda ES"
- [ ] Agregados 5 títulos ES
- [ ] Agregadas 4 descripciones ES
- [ ] Guardados cambios

## Métricas Esperadas

Con estas variantes deberías lograr:
- Eficacia de títulos: Excelente (ahora tienes 11 títulos en inglés)
- Mejor CTR en audiencia hispanohablante
- Segmentación clara: EN para búsqueda general, ES para audiencia hispana

---

**Generado por: PowerTech Academy Ads Automation**
**Fecha: 2026-04-17**
"""
    
    with open("GUIA_IMPORTACION_GOOGLE_ADS.md", "w", encoding="utf-8") as f:
        f.write(guide_content)
    
    print("✅ Guía de importación guardada: GUIA_IMPORTACION_GOOGLE_ADS.md\n")

if __name__ == "__main__":
    try:
        print("\n" + "="*70)
        print("📥 PowerTech Academy — Google Ads Importer")
        print("="*70)
        
        variants = read_variants_from_csv()
        print_import_instructions(variants)
        export_import_guide()
        print("🎉 ¡Listo! Abre Google Ads y sigue las instrucciones arriba.\n")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
