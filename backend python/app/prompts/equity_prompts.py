# app/prompts/equity_prompts.py
def get_prompt(mode: str, context: str):
    base_prompt = f"""
You are an equity research analyst.

ONLY use the information provided below.
If information is missing, say "Information not available in the provided source".

Context:
{context}
"""

    if mode == "summary":
        return base_prompt + "\nProvide a concise company summary."

    if mode == "risks":
        return base_prompt + "\nList key business and financial risks."

    return base_prompt + "\nProvide detailed equity research including business model, growth, and outlook."