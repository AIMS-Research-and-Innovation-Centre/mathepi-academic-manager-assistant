# MathEpi Accounts

The portal is prepared for Firebase email/password accounts. Passwords must stay in Firebase Auth; do not save them in Google Sheets, Drive, Apps Script, or browser storage.

## Activate Email/Password Login

1. Create a Firebase project.
2. Open Authentication, then enable the Email/Password sign-in provider.
3. Register a web app in Firebase project settings.
4. Copy the Firebase web config into `auth/firebase-config.js`.
5. Add the production domain in Firebase Authentication authorized domains.
6. Refresh the portal and open Access Control.
7. Create or sign in with a user email and password.

When Firebase config is active, the portal shows a sign-in screen before the main workspace. The old sidebar role switch is only available in unconfigured prototype mode.

## Role Claim

The portal reads a Firebase custom claim named `role`. Use one of these role IDs:

- `super-admin`
- `manager`
- `centre-coordinator`
- `head-tutor`
- `lecturer`
- `tutor`
- `student`
- `support-counsellor`
- `it-support`
- `viewer`

New accounts should default to `viewer` until an authorized admin assigns the correct role.

## Backend Rule

Before production launch, Apps Script should verify the signed-in user's Firebase ID token and role before accepting privileged requests such as CFA status changes, application exports, course edits, or Drive writes.
