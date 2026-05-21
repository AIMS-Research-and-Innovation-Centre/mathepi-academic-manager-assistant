# MathEpi Academic & Research Manager Assistant

A GitHub-hostable web app prototype for managing the KEMRI MathEpi programme with AIMS RIC branding.

## Open Locally

Open `index.html` in a browser. No build step is required.

## What Is Included

- Responsive dashboard for desktop, tablet, and phone
- Seeded MathEpi academic calendar and timetable
- Course, lecturer, tutor, and contact tracking modules
- Role-aware navigation and actions
- Centre Coordinator and Head Tutor coordination roles
- Student role for calendar, courses, and course-specific lecturer/tutor visibility
- Student Planner with day/week/month planning, course-linked tasks, balance signals, and optional Google Calendar-ready sync controls
- Appointment and booking module across students, tutors, lecturers, Head Tutor, Centre Coordinators, and Academic & Research Manager
- Tutor timesheets, assigned-work view, and workload balance signals
- Pre-arrival Tasks & Activities board for travel, accommodation, facilities, meals, tutor hiring, and lecturer appointments
- Google Sheets/Drive integration panel prepared for OAuth/API wiring
- Local browser storage for prototype add/edit actions

## Private GitHub Hosting

This static prototype can be committed to a private GitHub repository and deployed through GitHub Pages, Vercel, Netlify, or another GitHub-connected host. Keep API keys and OAuth client details out of the repository. Use deployment environment variables for production secrets.

## Suggested Production Next Steps

- Add real Google OAuth sign-in
- Connect data services to Google Sheets tabs
- Connect documents to Google Drive folders
- Replace mock users with a production auth provider
- Enforce role-based access server-side, not only in the UI
