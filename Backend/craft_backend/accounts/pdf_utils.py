from fpdf import FPDF
import os
from django.conf import settings

def clean_text(text):
    """Remove unsupported unicode characters for FPDF"""
    return (
        text
        .replace("–", "-")
        .replace("—", "-")
        .replace("•", "*")
        .replace("“", '"')
        .replace("”", '"')
        .replace("’", "'")
        .replace("‘", "'")
    )

def export_pdf(resume_text, filename="resume.pdf"):
    media_dir = settings.MEDIA_ROOT
    os.makedirs(media_dir, exist_ok=True)

    pdf_path = os.path.join(media_dir, filename)

    pdf = FPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)

    pdf.set_font("Helvetica", "B", 16)
    pdf.cell(0, 10, "Resume", ln=True, align="C")
    pdf.ln(10)

    pdf.set_font("Helvetica", size=12)

    resume_text = clean_text(resume_text)

    for line in resume_text.split("\n"):
        pdf.multi_cell(0, 8, line)

    pdf.output(pdf_path)

    return filename
