from fpdf import FPDF  # type: ignore
import os

def export_pdf(resume_text, filename="resume.pdf"):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)

    # Title
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 10, "Resume", ln=True, align="C")
    pdf.ln(10)  # Add space after title

    # Body text
    pdf.set_font("Arial", size=12)
    for line in resume_text.split('\n'):
        if line.strip():  # Avoid empty lines looking weird
            pdf.multi_cell(0, 10, line)
        else:
            pdf.ln(5)  # Add small gap for blank lines

    # Save PDF
    pdf.output(filename)
    return os.path.abspath(filename)
