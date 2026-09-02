# Copy-Paste Apps Script Deploy

Use this when the Google Apps Script web app is live but missing a new backend action such as `listLecturerReviewData`.

## Fastest Option

1. Open the Apps Script project for the MathEpi backend.
2. Open the main script file in Apps Script.
3. Replace its full contents with the contents of:
   `apps-script/Code.gs`
4. Open Project Settings / Manifest file and confirm the manifest matches:
   `apps-script/appsscript.json`
5. Save.
6. Deploy > Manage deployments > Edit the current Web app deployment.
7. Choose New version.
8. Deploy.
9. Refresh:
   `http://127.0.0.1:8776/lecturer-reviews/`

## If Apps Script Cannot Handle One Large Paste

Use the split files in `apps-script/paste-small-files/`.

Paste `00_Config.gs` into the default `Code.gs`, then create or replace the remaining Apps Script files using:

- `01_Routes.gs`
- `02_Workspace.gs`
- `03_Cfa.gs`
- `04_LecturerApplications.gs`
- `05_Storage.gs`
- `06_Records.gs`
- `07_TutorialFellowApplications.gs`
- `08_EmailOtp.gs`
- `09_EmailOtpHelpers.gs`
- `10_TutorialFellowReviews.gs`

The lecturer review endpoint and decision storage need the current versions of:

- `00_Config.gs`
- `01_Routes.gs`
- `04_LecturerApplications.gs`

After saving, deploy a new Web app version.
