<<<<<<< HEAD
# -ReportWebsite
=======
# Report Website (PDF)

This site displays the latest **PDF** report and an archive.

## How it works
- `index.html` embeds `reports/latest.pdf` (or uses `reports/manifest.json` if present).
- `reports/index.html` lists all PDFs from the manifest.
- `scripts/report.js` updates the viewer and download link from the manifest.

## Add a new report (manually)
1. Put `your-report.pdf` into `reports/` (ideally timestamped).
2. Update `reports/latest.pdf` (copy of the newest file).
3. Update `reports/manifest.json` with the new entry and set `latest` to its id.

Your scheduler script (next step) will automate these three actions.
>>>>>>> 2148de8 (Initial deploy)
