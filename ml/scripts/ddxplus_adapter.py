"""
OPTIONAL UPGRADE PATH

DDXPlus is a research dataset released by Mila/IQIA under CC-BY.
See: https://github.com/mila-iqia/ddxplus

The exact DDXPlus schema is richer than this demo project's simple
symptom-list format. Use this file as a starting point for an adapter:
1. Download the DDXPlus train/validation/test files from the official repo.
2. Parse its evidence representation.
3. Map evidence codes to human-readable names using release_evidences.json.
4. Map condition IDs using release_conditions.json.
5. Export a clean table:
   age, gender, duration_days, symptoms, condition

Do NOT mix DDXPlus and synthetic demo data without documenting it.
"""

def example_target_schema():
    return ["age", "gender", "duration_days", "symptoms", "condition"]

if __name__ == "__main__":
    print("Target schema:", example_target_schema())
    print("Read the file header for the official DDXPlus source.")
