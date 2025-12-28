import pdfplumber
import google.generativeai as genai
import os
from django.conf import settings

# Use Django settings for consistency
genai.configure(api_key=getattr(settings, "GEMINI_API_KEY", None))

JOB_KEYWORDS = {
    "ml_engineer": ["python", "machine learning", "pandas", "numpy", "scikit", "tensorflow", "deep learning"],
    "frontend": ["react", "javascript", "html", "css", "api"],
    "backend": ["django", "flask", "rest api", "postgresql", "sql"],
}

def analyze_resume_ats(pdf_file, job_role):
    text = ""
    try:
        with pdfplumber.open(pdf_file) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text() or ""
                text += page_text.lower()
    except Exception as e:
        return {
            "ats_score": 0,
            "matched_keywords": [],
            "missing_keywords": JOB_KEYWORDS.get(job_role, []),
            "issues": [f"Failed to read PDF: {e}"],
            "ai_feedback": "",
        }

    score = 0
    issues = []

    required_sections = ["education", "skills", "experience", "project"]
    for section in required_sections:
        if section in text:
            score += 10
        else:
            issues.append(f"Missing section: {section}")

    if len(text.split()) > 300:
        score += 10
    else:
        issues.append("Resume too short")

    keywords = JOB_KEYWORDS.get(job_role, [])
    matched = [kw for kw in keywords if kw in text]
    missing = list(sorted(set(keywords) - set(matched)))

    score += min(len(matched) * 3, 30)
    score = min(score, 100)

    ai_feedback = ""
    try:
        if getattr(settings, "GEMINI_API_KEY", None):
            prompt = f"""
            Analyze this resume for ATS optimization.

            Job Role: {job_role}

            Resume Text:
            {text[:3000]}

            Give:
            - Key problems
            - Formatting mistakes
            - How to improve ATS score
            """
            model = genai.GenerativeModel("gemini-2.5-flash")
            ai_feedback = (model.generate_content(prompt).text or "").strip()
    except Exception as e:
        issues.append(f"AI feedback unavailable: {e}")

    return {
        "ats_score": score,
        "matched_keywords": matched,
        "missing_keywords": missing,
        "issues": issues,
        "ai_feedback": ai_feedback,
    }
