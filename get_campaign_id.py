#!/usr/bin/env python3
import json

with open("powertech_ads_variants_ES.json") as f:
    data = json.load(f)

print(f"\n🔍 INFORMACIÓN DE LA CAMPAÑA:")
print(f"   Customer ID: {data['customer_id']}")
print(f"   Campaña: {data['campaign']}")
print(f"\n✅ Listo para importar variantes en Google Ads")
