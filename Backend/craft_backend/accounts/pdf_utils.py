from fpdf import FPDF  # type: ignore
import os
from django.conf import settings

def export_pdf(resume_text, filename="resume.pdf"):
    # Use Django MEDIA_ROOT
    media_dir = settings.MEDIA_ROOT
    os.makedirs(media_dir, exist_ok=True)

    pdf_path = os.path.join(media_dir, filename)

    pdf = FPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)

    # Title
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 10, "Resume", ln=True, align="C")
    pdf.ln(10)

    # Body text
    pdf.set_font("Arial", size=12)
    for line in resume_text.split('\n'):
        if line.strip():
            pdf.multi_cell(0, 10, line)
        else:
            pdf.ln(5)

    pdf.output(pdf_path)

    # ✅ Return relative path from MEDIA_ROOT
    return filename  # just the filename
