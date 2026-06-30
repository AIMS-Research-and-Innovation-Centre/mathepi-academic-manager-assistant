# MathEpi Academic & Research Manager Assistant

A GitHub-hostable web app prototype for managing the KEMRI MathEpi programme with AIMS RIC branding.

## Open Locally

Open `index.html` in a browser. No build step is required.

## What Is Included

- Responsive dashboard for desktop, tablet, and phone
- Seeded MathEpi academic calendar and timetable
- Course, lecturer, tutor, and contact tracking modules
- Role-aware navigation and actions
- Installable PWA shell for Android and iPhone home-screen use
- Firebase email/password account bridge with role-claim mapping
- Centre Coordinator and Head Tutor coordination roles
- Student role for calendar, courses, and course-specific lecturer/tutor visibility
- Student Planner with day/week/month planning, course-linked tasks, balance signals, and optional Google Calendar-ready sync controls
- Student To-Do list with course links, priorities, categories, due dates, and conversion into planner blocks
- Student Study Groups with classmate directory, opt-in invitations, approval workflow, agendas, and activity planning
- Appointment and booking module across students, tutors, lecturers, Head Tutor, Centre Coordinators, and Academic & Research Manager
- Whole-programme Support & Wellness hub for students, tutors, lecturers, coordinators, support/counsellor, and IT support workflows
- Compact icon-only dark/light mode toggle for mobile and tablet space efficiency
- Tutor timesheets, assigned-work view, and workload balance signals
- Pre-arrival Tasks & Activities board for travel, accommodation, facilities, meals, tutor hiring, and lecturer appointments
- Google Apps Script backend package for Google Sheets data, Drive folders, CFA status, lecturer applications, and Tutorial Fellows applications
- Local browser storage for prototype add/edit actions

## Private GitHub Hosting

This static prototype can be committed to a private GitHub repository and deployed through GitHub Pages, Vercel, Netlify, or another GitHub-connected host. Keep API keys and OAuth client details out of the repository. Use deployment environment variables for production secrets.

## Installable App

The portal includes `manifest.webmanifest`, `sw.js`, and mobile icons. Once hosted over HTTPS, Android users can install it from Chrome and iPhone users can add it from Safari to the home screen.

## Email/Password Accounts

The `auth/` folder contains a Firebase Auth bridge. To activate it, enable Email/Password sign-in in Firebase, paste the Firebase web app config into `auth/firebase-config.js`, then assign users a custom claim named `role`.

When Firebase is configured, users must sign in before the portal opens. The sidebar role simulation is disabled, and the visible navigation is based on the signed-in user's `role` claim.

Supported role IDs are:

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

Use `viewer` as the default until a manager or super admin assigns the correct role. Passwords are handled by Firebase Auth, not by the portal, Google Sheets, or Apps Script.

## Google Apps Script Backend

The `apps-script/` folder contains the Google backend. Deploy it as an Apps Script Web App, paste the deployment URL into the portal's `Sheets & Drive` tab, then initialize the Google workspace.

The backend creates:

- Google Sheets tabs for calendar blocks, courses, people, sessions, timesheets, tasks, planner data, appointments, support requests, CFA statuses, lecturer applications, and Drive document records
- Google Drive folders for CFA uploads, Tutorial Fellow applications, course outlines, teaching materials, assessments, meeting notes, and internship/thesis files
- A main `MathEpi Academic Operations` Google Sheet stored inside the `MathEpi Academic Operations` Drive folder
- A lecturer application endpoint that writes a row to Sheets and saves the passport biodata file in Drive
- A Tutorial Fellows endpoint that writes a row to Sheets and saves the passport biodata page and PhD certificate in Drive

The local app still keeps browser storage as a development fallback.

## Suggested Production Next Steps

- Deploy the Apps Script backend and run `setupWorkspace`
- Decide whether the portal should stay statically hosted or be served through Apps Script
- Add role-based Google account checks in Apps Script
- Activate Firebase Auth and role custom claims
- Enforce role-based access server-side, not only in the UI
