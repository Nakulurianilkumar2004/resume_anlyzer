from groq import Groq
import os

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_resume(resume_text: str, jd_text: str):

    prompt = f"""
You are an ATS Resume Analyzer AI.

STRICT RULES:
- Keep total response under 250 words.
- Be concise and structured.
- Do NOT write long paragraphs.
- Use bullet points only.
- Give direct, professional feedback.

Return output in this EXACT format:

Match Percentage: XX%

Missing Skills:
- Skill 1
- Skill 2
- Skill 3

Improvement Suggestions:
- Suggestion 1
- Suggestion 2
- Suggestion 3

Resume:
{resume_text}

Job Description:
{jd_text}
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500,      # 👈 controls length
        temperature=0.3      # 👈 reduces unnecessary creativity
    )

    return response.choices[0].message.content