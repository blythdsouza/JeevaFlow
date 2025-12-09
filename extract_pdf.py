# extract_pdf.py
# Small script to extract text from idtpdf.pdf using PyPDF2
import sys
from pathlib import Path

try:
    from PyPDF2 import PdfReader
except Exception as e:
    print('PyPDF2 not installed:', e)
    sys.exit(2)

pdf_path = Path('idtpdf.pdf')
if not pdf_path.exists():
    print('PDF not found:', pdf_path)
    sys.exit(1)

reader = PdfReader(str(pdf_path))
text_out = []
for page in reader.pages:
    try:
        text = page.extract_text() or ''
    except Exception as ex:
        text = ''
    text_out.append(text)

out_path = Path('idtpdf.txt')
out_path.write_text('\n\n'.join(text_out), encoding='utf-8')
print(f'Extracted {len(text_out)} pages to {out_path}')
# print a short preview
preview = '\n'.join(text_out)[:4000]
print('\n--- PREVIEW ---\n')
print(preview)
