# MathEpi Accounts

The portal uses Firebase Google Sign-In. MathEpi never receives or stores user passwords, and authentication does not depend on email OTP delivery.

## Activate Google Sign-In

1. Create a Firebase project.
2. Open Authentication, then enable the Google sign-in provider.
3. Register a web app in Firebase project settings.
4. Copy the Firebase web config into `auth/firebase-config.js`.
5. Add the production domain in Firebase Authentication authorized domains.
6. Refresh the portal and open Access Control.
7. Sign in with an approved Google account and request a role.

The portal always shows a sign-in screen before the main workspace. Only `@aimsric.org` accounts and explicitly allowed exceptions are accepted. First-time users remain pending until the Academic Manager approves their requested role.

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
