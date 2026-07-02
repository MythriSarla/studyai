import os
import PyPDF2
import docx


def extract_text_from_file(file_path, file_type):
    """
    Extract plain text from PDF, DOCX, or TXT files.
    Returns extracted text as a string.
    """
    try:
        if file_type == "pdf":
            return extract_from_pdf(file_path)
        elif file_type == "docx":
            return extract_from_docx(file_path)
        elif file_type == "txt":
            return extract_from_txt(file_path)
        else:
            raise ValueError(f"Unsupported file type: {file_type}")
    except Exception as e:
        raise Exception(f"Failed to extract text: {str(e)}")


def extract_from_pdf(file_path):
    text = ""
    with open(file_path, "rb") as f:
        reader = PyPDF2.PdfReader(f)
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    if not text.strip():
        raise ValueError("No readable text found in PDF. It may be a scanned image.")
    return text.strip()


def extract_from_docx(file_path):
    doc = docx.Document(file_path)
    text = "\n".join([para.text for para in doc.paragraphs if para.text.strip()])
    if not text.strip():
        raise ValueError("No readable text found in DOCX file.")
    return text.strip()


def extract_from_txt(file_path):
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        text = f.read()
    if not text.strip():
        raise ValueError("Text file is empty.")
    return text.strip()
