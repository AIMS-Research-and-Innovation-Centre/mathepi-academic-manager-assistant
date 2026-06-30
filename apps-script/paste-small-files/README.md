# Paste-Friendly Apps Script Files

Use these files if Apps Script or your browser only lets you paste about 100 lines at a time.

## How to use

1. Create the Apps Script project.
2. Paste `00_Config.gs` into the default `Code.gs` file.
3. For each remaining file, click `+` next to Files, choose `Script`, and create a file with the same name without `.gs`.
4. Paste the matching file content into that script file.
5. Add the manifest from `../appsscript.json`.
6. Save the project.
7. Select `setupWorkspace` from the function dropdown and click `Run`.
8. Deploy the project as a Web App.

## File order

Paste these in order:

1. `00_Config.gs`
2. `01_Routes.gs`
3. `02_Workspace.gs`
4. `03_Cfa.gs`
5. `04_LecturerApplications.gs`
6. `05_Storage.gs`
7. `06_Records.gs`
8. `07_TutorialFellowApplications.gs`
9. `08_EmailOtp.gs`
10. `09_EmailOtpHelpers.gs`

Apps Script can run functions across multiple `.gs` files in the same project, so this is equivalent to the single `Code.gs` file.
