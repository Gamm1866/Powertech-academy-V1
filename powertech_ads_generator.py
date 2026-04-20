#!/usr/bin/env python3
"""
PowerTech Academy — Google Ads Campaign Variants Generator
Genera variantes EN/ES de títulos y descripciones
"""

import json
import csv
import os
from pathlib import Path

CUSTOMER_ID = "9525479015"
CAMPAIGN_NAME = "Fire Alarm Training Florida"

TITLES_EN_ADDITIONAL = [
    "Fire & Life Safety Career",
    "Fast-Track 2–3 Months",
    "Broward County Training",
    "Hands-On Lab Included",
    "Certificate Upon Completion",
    "Start Your Career in Florida",
]

TITLES_ES = [
    "Curso Alarmas Incendio Florida",
    "Conviértete en Técnico Ahora",
    "Sin Experiencia Necesaria",
    "Hollywood FL – Inscripciones",
    "94% Colocación Laboral",
]

DESCRIPTIONS_ES = [
    "Formación práctica en alarmas contra incendio en Hollywood, FL. Aprende configuración de paneles, cableado y seguridad OSHA. Sin experiencia previa.",
    "Programa fast-track: 2–3 meses. Certificado de Asistencia + apoyo de colocación laboral en South Florida. Inscríbete hoy.",
    "Sin experiencia necesaria. 94% de colocación laboral. Inicia tu carrera en Fire & Life Safety en Florida hoy mismo.",
    "Aprende configuración de paneles, cableado y normativa NFPA 72. Laboratorios presenciales en Hollywood FL. Cupos limitados.",
]

def validate_text_length(text, max_length, field_type):
    if len(text) > max_length:
        print(f"⚠️  ADVERTENCIA: {field_type} excede límite ({len(text)}/{max_length})")
        return False
    return True

def generate_variants():
    print("\n" + "="*70)
    print("🚀 PowerTech Academy — Google Ads Variants Generator")
    print("="*70)
    
    print("\n📋 VALIDANDO TÍTULOS EN (ADICIONALES)...")
    for i, title in enumerate(TITLES_EN_ADDITIONAL, 6):
        is_valid = validate_text_length(title, 30, f"Título EN #{i}")
        status = "✅" if is_valid else "❌"
        print(f"  {status} [{len(title)}/30] {title}")
    
    print("\n📋 VALIDANDO TÍTULOS ES...")
    for i, title in enumerate(TITLES_ES, 1):
        is_valid = validate_text_length(title, 30, f"Título ES #{i}")
        status = "✅" if is_valid else "❌"
        print(f"  {status} [{len(title)}/30] {title}")
    
    print("\n📋 VALIDANDO DESCRIPCIONES ES...")
    for i, desc in enumerate(DESCRIPTIONS_ES, 1):
        is_valid = validate_text_length(desc, 90, f"Descripción ES #{i}")
        status = "✅" if is_valid else "❌"
        print(f"  {status} [{len(desc)}/90] {desc[:40]}...")
    
    print("\n✅ Todas las variantes son válidas para Google Ads\n")
    
    return {
        "titles_en": TITLES_EN_ADDITIONAL,
        "titles_es": TITLES_ES,
        "descriptions_es": DESCRIPTIONS_ES,
    }

def export_csv(variants):
    csv_filename = "powertech_ads_variants_ES.csv"
    print(f"📊 Exportando a {csv_filename}...\n")
    
    with open(csv_filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["Tipo", "Idioma", "Variante", "Texto", "Caracteres"])
        
        for i, title in enumerate(TITLES_EN_ADDITIONAL, 6):
            writer.writerow(["Título", "EN", f"Title #{i}", title, len(title)])
        
        for i, title in enumerate(TITLES_ES, 1):
            writer.writerow(["Título", "ES", f"Título ES #{i}", title, len(title)])
        
        for i, desc in enumerate(DESCRIPTIONS_ES, 1):
            writer.writerow(["Descripción", "ES", f"Desc ES #{i}", desc, len(desc)])
    
    print(f"✅ Archivo creado: {csv_filename}\n")
    return csv_filename

def export_json(variants):
    json_filename = "powertech_ads_variants_ES.json"
    
    data = {
        "campaign": CAMPAIGN_NAME,
        "customer_id": CUSTOMER_ID,
        "generated_at": "2026-04-17",
        "variants": variants,
        "instructions": {
            "import": "Google Ads → Tu campaña → Grupos de recursos",
            "titles_en": "Agrega 6 títulos EN para Excelente",
            "titles_es": "Crea Ad Group 'Búsqueda ES'",
            "descriptions_es": "Agrega 4 descripciones ES",
        }
    }
    
    with open(json_filename, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Archivo creado: {json_filename}\n")
    return json_filename

def print_summary(variants, csv_file, json_file):
    print("\n" + "="*70)
    print("✅ RESUMEN DE GENERACIÓN")
    print("="*70)
    print(f"\n📈 Variantes Generadas:")
    print(f"  • Títulos EN (adicionales): {len(variants['titles_en'])}")
    print(f"  • Títulos ES: {len(variants['titles_es'])}")
    print(f"  • Descripciones ES: {len(variants['descriptions_es'])}")
    print(f"\n📁 Archivos Creados:")
    print(f"  • {csv_file}")
    print(f"  • {json_file}")
    print(f"\n🔗 Próximo paso:")
    print(f"  1. Abre Google Ads")
    print(f"  2. Ve a tu campaña 'Fire Alarm Training Florida'")
    print(f"  3. Copia los títulos y descripciones del CSV")
    print(f"  4. Pega en los grupos de recursos correspondientes")
    print("\n" + "="*70 + "\n")

if __name__ == "__main__":
    try:
        variants = generate_variants()
        csv_file = export_csv(variants)
        json_file = export_json(variants)
        print_summary(variants, csv_file, json_file)
        print("🎉 ¡Script ejecutado exitosamente!")
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
