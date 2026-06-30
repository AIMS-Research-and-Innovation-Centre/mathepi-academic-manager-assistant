# MathEpi Google Apps Script Backend

This folder contains the Google backend for the MathEpi Academic Manager portal.

## What It Creates

- A Google Drive root folder named `MathEpi Academic Operations`
- A Google Sheet named `MathEpi Academic Operations`, moved into the Drive root folder
- Sheets tabs for courses, people, calendar blocks, sessions, tasks, appointments, support requests, CFA status, lecturer applications, and Drive documents
- Sheets tabs for lecturer and Tutorial Fellow applications
- Drive subfolders for CFA applications, Tutorial Fellow applications, lecturer CVs, course outlines, teaching materials, assessments, meeting notes, and internship/thesis files

## Deploy

1. Go to [script.google.com](https://script.google.com).
2. Create a new Apps Script project.
3. Copy `Code.gs` into the Apps Script editor.
4. Copy `appsscript.json` into the project manifest.
5. Run `setupWorkspace` once from the Apps Script editor and approve permissions.
6. Deploy as a Web App:
   - Execute as: `Me`
   - Who has access: your Google Workspace domain, or the audience you want to allow
7. Copy the Web App URL ending in `/exec`.
8. In the portal, open `Sheets & Drive`, paste the URL into `Apps Script Web App URL`, and click `Save endpoint`.
9. Click `Initialize Google`, then `Push app data`.

If the Apps Script editor or browser only lets you paste a small number of lines, use the split files in `paste-small-files/` instead of the single `Code.gs`. Paste `00_Config.gs` into the default `Code.gs`, then create one script file for each remaining chunk.

## Runtime Behavior

- Main app edits can be pushed manually or synced automatically when `Autosync app edits to Google Sheets` is enabled.
- CFA open/closed status writes to the `CfaStatuses` tab.
- Lecturer application submissions write to `LecturerApplications`.
- Tutorial Fellow application submissions write to `TutorialFellowApplications`.
- Tutorial Fellow public submissions require email OTP verification. Apps Script sends the code with `MailApp`, so the manifest includes the `script.send_mail` scope.
- Passport biodata page uploads are saved in Drive under:
  `MathEpi Academic Operations / CFA / Lecturer Applications / {application_id}`.
- Tutorial Fellow passport biodata pages and PhD certificates are saved in Drive under:
  `MathEpi Academic Operations / CFA / Tutorial Fellow Applications / {application_id}`.

## Notes

- Google Sheets stores structured records.
- Google Drive stores files and generated documents.
- Apps Script is the backend authority.
- The local browser prototype still keeps a local copy as a fallback during development.
