# arXiv 1910.12478 ingestion

## Downloaded artifacts
- `1910.12478.pdf` (latest)
- `1910.12478v1.pdf`
- `1910.12478v2.pdf`
- `1910.12478v3.pdf`

## Text extraction (OCR-equivalent for digital PDF)
- `1910.12478.txt`
- `1910.12478v1.txt`
- `1910.12478v2.txt`
- `1910.12478v3.txt`

Extraction command used:
```bash
pdftotext -layout <pdf> <txt>
```

## Notes
- Native OCR tools (`ocrmypdf`, `tesseract`) are not installed on this host.
- This arXiv PDF is digitally generated (`pdfTeX`) and text layer extraction succeeded cleanly, so OCR was not required.
