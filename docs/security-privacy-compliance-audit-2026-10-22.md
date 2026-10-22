# MathEpi Security, Privacy, and Compliance Audit

**Audit date:** 22 October 2026
**Scope:** MathEpi web portal, lecturer and Tutorial Fellow application forms, review portals, Google Apps Script backend, Google Sheets and Drive storage, authentication, authorization, and Pi knowledge features.
**Method:** Static source review, route and data-flow tracing, live HTTP-header inspection, secret-pattern scanning, and automated tests. No production data or behaviour was changed.

## Executive assessment

The application is a **single-programme, single-tenant system**. It does not implement tenant identifiers, tenant-scoped queries, or database-enforced row-level security. Google Sheets, Drive folders, Script Properties, and Apps Script execute as shared programme resources. That can be acceptable for one controlled programme, but it must not be represented as multi-tenant and must not be reused for another institution or independently governed programme without an isolation redesign.

The present risk level is **High**. The most urgent issues are reviewer record isolation, authorization based on a person's name, unverified lecturer submissions with unrestricted backend uploads, personal data embedded in public client code, long-lived bearer tokens exposed through URL-based JSONP, and a Tutorial Fellow form that can display success after backend failure.

The repository does not contain prescription, clinical-record, insurance, payroll, or payment integration. Controls specific to those integrations are therefore not applicable today. The system does process identity documents, employment and academic records, contact data, references, evaluations, and access records; these remain significant personal data and require formal governance.

## Architecture and data flow

1. The public GitHub Pages site hosts static HTML, CSS, and JavaScript.
2. Browser clients call a Google Apps Script web app through POST and, in several flows, JSONP GET requests.
3. Apps Script executes as the deploying user and reads or writes one shared Google Spreadsheet and one shared Drive folder tree.
4. Portal access sessions are stored in Script Properties or an `AccessSessions` sheet. Review OTP sessions are held in Apps Script cache.
5. Application drafts and some completed application records are persisted in browser storage.
6. Reviewer decisions, analyses, comments, stages, and audit entries are stored in shared spreadsheet tabs.

## Risk register

### SEC-01 - Reviewer row-level authorization is incomplete

**Severity:** High
**Status:** Confirmed

`listReviewApplicants` filters only the application array. It returns all scores, analyses, notes, stages, and assignments to every active reviewer. The score, analysis, note, and submit endpoints accept an arbitrary `applicationId` and do not verify that the authenticated reviewer is assigned to it. A reviewer can therefore read related records outside the intended assignment set and may write a review for an unassigned application.

**Evidence:**

- `apps-script/paste-small-files/10_TutorialFellowReviews.gs:28-47`
- `apps-script/paste-small-files/10_TutorialFellowReviews.gs:50-121`
- `apps-script/paste-small-files/10_TutorialFellowReviews.gs:131-253`
- `apps-script/paste-small-files/10_TutorialFellowReviews.gs:256-298`
- `apps-script/paste-small-files/10_TutorialFellowReviews.gs:452-465`

**Required action:** Create one server-side `requireReviewerApplicationAccess_` guard and call it from every read and write operation. Filter every returned review collection by the same authorized application IDs. Managers may have an explicit, auditable bypass based on immutable roles.

### SEC-02 - Manager privilege can be granted by a name match

**Severity:** High
**Status:** Confirmed

`reviewerCanManage` grants manager rights when the concatenated reviewer name or email contains `cecil`. Authorization must never depend on a mutable display name or substring.

**Evidence:** `apps-script/paste-small-files/10_TutorialFellowReviews.gs:440-449`

**Required action:** Remove the identity substring condition. Use an explicit role or a centrally configured immutable account identifier. Audit every existing reviewer record before deployment.

### SEC-03 - Lecturer submission identity is not verified

**Severity:** High
**Status:** Confirmed

Lecturer submission and recovery call the save function directly. Unlike Tutorial Fellow submission, the backend does not require an email-verification token. An attacker can impersonate an applicant, create records, and consume Drive and Sheets capacity.

**Evidence:**

- `apps-script/paste-small-files/04_LecturerApplications.gs:1-6`
- `apps-script/paste-small-files/04_LecturerApplications.gs:106-172`
- Comparison: `apps-script/paste-small-files/07_TutorialFellowApplications.gs:1-8`

**Required action:** Require a short-lived, purpose-bound verification token whose email exactly matches the submitted application. Add backend throttling and an idempotency key.

### SEC-04 - File uploads are trusted by the backend

**Severity:** High
**Status:** Confirmed

The backend decodes caller-supplied Base64 and trusts the supplied filename and MIME type. It does not enforce size, permitted type, magic bytes, or malware scanning. Lecturer submissions are also currently unverified.

**Evidence:**

- `apps-script/paste-small-files/04_LecturerApplications.gs:128-139`
- `apps-script/paste-small-files/07_TutorialFellowApplications.gs:73-89`
- Client-only validation: `cfa/lecturer-application.html:2912-2937`

**Required action:** Enforce strict server-side limits before decoding; allow only required document types; verify file signatures; generate server filenames; isolate uploads in a non-public quarantine folder; scan before release; reject active content; and record uploader, hash, size, type, and scan result.

### SEC-05 - Personal data is embedded in publicly served JavaScript

**Severity:** High
**Status:** Confirmed

The default people dataset includes real names, email addresses, affiliations, roles, and related operational details in `app.js`. Hiding these values in the UI does not protect them because any visitor can download the JavaScript source.

**Evidence:** `app.js:443-520` and the wider `DEFAULT_PEOPLE` dataset.

**Required action:** Remove real people from the public bundle. Load the minimum role-scoped directory only after authenticated authorization. Replace repository fixtures with synthetic data and review Git history for prior exposure.

### SEC-06 - Bearer tokens and sensitive payloads are placed in URLs

**Severity:** High
**Status:** Confirmed

The generic GET route accepts a JSON payload and JSONP clients place session tokens, reviewer emails, and other payload data in query strings. URLs can be captured in browser history, diagnostics, proxy logs, analytics, screenshots, and referrer data. State-changing operations are also available through GET semantics.

**Evidence:**

- `apps-script/paste-small-files/01_Routes.gs:1-7`
- `tf-reviews/index.html:1973-2015`
- `lecturer-reviews/index.html:1182-1222`
- `app.js:2411-2419`

**Required action:** Remove JSONP for authenticated and state-changing operations. Use POST bodies only, reject state changes over GET, and move to secure cookie sessions or short-lived access tokens with rotation and revocation.

### SEC-07 - Portal sessions remain valid for 30 days and cannot be revoked individually

**Severity:** High
**Status:** Confirmed

The client stores a bearer token in `localStorage`; the backend gives it a 30-day lifetime. Sign-out clears the browser copy but does not revoke the server session. A stolen token can remain useful until expiry.

**Evidence:**

- `app.js:2304-2309`, `app.js:5700-5709`, `app.js:5729-5735`
- `apps-script/paste-small-files/12_PortalAccess.gs:19-21`
- `apps-script/paste-small-files/12_PortalAccess.gs:187-208`

**Required action:** Shorten sessions, add server-side logout and administrator revocation, rotate tokens, store last-used/device metadata, clean expired sessions, and avoid `localStorage` for bearer credentials.

### SEC-08 - Tutorial Fellow submission can falsely report success

**Severity:** High
**Status:** Confirmed

The form catches backend failures, saves locally, removes the draft, and still renders `Application submitted`. This creates an integrity and fairness risk because an applicant may reasonably believe AIMS received a record that remains only on one device.

**Evidence:** `cfa/tutorial-fellow-application.html:880-923`

**Required action:** Treat only a confirmed backend receipt as submitted. Preserve failed records with a visible `Pending synchronisation` status and retain an idempotent recovery route.

### SEC-09 - Spreadsheet formula injection is not neutralized

**Severity:** Medium
**Status:** Confirmed design weakness

Untrusted form and reviewer strings are written through `setValues` and `appendRow` without neutralizing leading formula characters. A malicious value beginning with `=`, `+`, `-`, or `@` may be interpreted by Sheets and could execute formulas when staff open the workbook.

**Evidence:** `apps-script/paste-small-files/06_Records.gs:40-64`

**Required action:** Centralize spreadsheet serialization and force untrusted strings to plain text. Add regression tests covering all formula prefixes and Unicode whitespace variants.

### SEC-10 - Submission writes are not transactional

**Severity:** Medium
**Status:** Confirmed

Duplicate checking, Drive file creation, and Sheet appending occur without a single lock or rollback. Concurrent requests can create duplicates; a Sheet failure after file creation can leave orphaned identity documents.

**Evidence:** `apps-script/paste-small-files/04_LecturerApplications.gs:106-172` and corresponding Tutorial Fellow save flow.

**Required action:** Use a script lock around idempotency checks and writes, persist an explicit transaction state, compensate for partial failures, and reconcile orphaned files through a scheduled job.

### SEC-11 - Broad deployer authority increases breach impact

**Severity:** Medium
**Status:** Confirmed

The Apps Script requests full Drive, Sheets, Calendar, mail, external-request, and script-management scopes and executes as the deploying user. Compromise of the web app or deployer account can therefore affect resources accessible to that identity.

**Evidence:** `apps-script/appsscript.json:6-16`

**Required action:** Use a dedicated least-privilege operational identity and Shared Drive, remove unused scopes, inventory deployment owners, require MFA, and review OAuth grants quarterly.

### SEC-12 - Sensitive drafts and completed records persist in browser storage

**Severity:** Medium
**Status:** Confirmed

Applications containing identity, contact, academic, employment, and reference information are persisted in browser storage without encryption, expiry, shared-device warnings, or automatic cleanup. Portal bearer tokens are also stored there.

**Evidence:**

- `cfa/lecturer-application.html:2326-2373`
- `cfa/tutorial-fellow-application.html:278-293`
- `cfa/tutorial-fellow-application.html:914-918`

**Required action:** Store only the minimum recovery data, add a clear expiry and deletion control, avoid storing completed records indefinitely, disclose device-storage behaviour, and never store bearer credentials beside application data.

### SEC-13 - OTP controls are insufficient for an Internet-facing service

**Severity:** Medium
**Status:** Confirmed

OTP generation uses `Math.random`. Rate limiting applies only to one email and purpose for 30 seconds, so distributed email enumeration or quota exhaustion remains possible. The unauthenticated diagnostic route exposes remaining mail quota.

**Evidence:**

- `apps-script/paste-small-files/08_EmailOtp.gs:5-18`
- `apps-script/paste-small-files/08_EmailOtp.gs:36-89`
- `apps-script/paste-small-files/08_EmailOtp.gs:92-125`
- `apps-script/paste-small-files/01_Routes.gs:56-58`

**Required action:** Use a cryptographically secure code source, add account/IP/device/global quotas, generic responses, abuse monitoring, and remove the public diagnostic route.

### SEC-14 - Security headers and browser hardening are absent

**Severity:** Medium
**Status:** Confirmed on the live root page

The live GitHub Pages response did not include an explicit Content-Security-Policy, Strict-Transport-Security, frame-control, Referrer-Policy, Permissions-Policy, or cross-origin isolation headers. The application also uses dynamic HTML insertion and JSONP, which increases XSS impact and makes a strong CSP harder to deploy.

**Evidence:** Read-only `HEAD https://mathepi.aimsric.org/` on 22 October 2026 and `app.js:10096-10098`.

**Required action:** Put the site behind hosting that permits security headers or a configured edge proxy; remove JSONP and inline execution dependencies; deploy CSP in report-only mode first; then enforce CSP, frame restrictions, strict referrer policy, HSTS, and a minimal permissions policy.

### PRIV-01 - Privacy governance evidence is missing from the repository

**Severity:** Medium
**Status:** Repository gap; organisational documents may exist elsewhere

No complete privacy notice, retention schedule, data-subject request procedure, processing register, processor register, data-breach runbook, DPIA, or DPO/privacy contact was found. Identity documents and third-party reference details are collected without repository evidence of necessity, retention, or notices to those third parties.

**Required action:** Confirm external organisational policies, then publish a layered privacy notice and maintain the governance records listed below. Do not collect passport copies unless a documented purpose and necessity assessment supports collection at that stage.

### PRIV-02 - Data is duplicated across flat columns, JSON, browser storage, audit records, and Drive

**Severity:** Medium
**Status:** Confirmed

Applications are stored as both flattened fields and full JSON, with documents in Drive and before/after values in audit records. This complicates correction, deletion, retention, legal hold, and access requests.

**Required action:** Create a data inventory and canonical record model, define deletion propagation, minimize audit payloads, and use immutable event metadata rather than complete PII snapshots where possible.

### AI-01 - Automated assessment support needs governance

**Severity:** Medium
**Status:** Confirmed decision-support use

Review records include machine-generated scores and analyses. The UI indicates that the panel decides, which is helpful, but the repository does not evidence model/rule versioning, bias testing, validation against selection criteria, override monitoring, or applicant-facing transparency.

**Required action:** Keep a human decision-maker, version every scoring rule, document intended use and limitations, test disparate impact, record overrides and reasons, and prevent generated prose from being treated as applicant-provided evidence.

## Compliance position

This is a technical readiness assessment, not legal advice. AIMS RIC should obtain local counsel or DPO validation before relying on it as a legal determination.

### Kenya

The portal processes personal data of applicants, staff, students, references, and reviewers and is likely within the scope of Kenya's Data Protection Act, 2019. Confirm controller/processor registration, lawful bases, notices, rights handling, processor contracts, retention, security safeguards, DPIAs where high-risk processing applies, and cross-border transfer safeguards. The Act requires breach notification to the Data Commissioner within 72 hours where the statutory threshold is met; processors must notify controllers without delay and, where reasonably practicable, within 48 hours.

### Rwanda

Because AIMS RIC operates from Rwanda and the portal processes data there, confirm registration obligations under Law No. 058/2021, DPO designation, lawful processing, security measures, and rules for storage or transfer outside Rwanda. Google services and GitHub hosting require a documented data-location and transfer assessment rather than an assumption that all data remains in Rwanda.

### GDPR and international applicants

If EU/EEA applicants are targeted or monitored, or EU establishments participate in processing, assess GDPR territorial scope. At minimum, adopt Article 5 principles, records of processing, processor agreements, security under Article 32, rights procedures, and an Article 33 breach workflow where applicable.

### Data roles requiring confirmation

- Identify the legal controller for applications and programme operations.
- Document whether KEMRI, AIMS RIC, partner institutions, Google, GitHub, and mail providers act as joint controllers, independent controllers, or processors for each flow.
- Record hosting regions, subprocessors, access locations, transfer mechanisms, and deletion commitments.
- Confirm whether references were informed that their contact details would be processed.

## Required governance package

1. Public privacy notice for applicants and portal users.
2. Internal processing inventory and data-flow map.
3. Retention and defensible deletion schedule by record type.
4. Data-subject access, correction, objection, restriction, and deletion procedure.
5. Security incident and breach-notification runbook with Kenya and Rwanda escalation clocks.
6. DPIA covering identity documents, applicant ranking, reviewer collaboration, and cross-border cloud processing.
7. Processor and data-sharing agreements, including Google Workspace and hosting providers.
8. Role-access matrix, joiner/mover/leaver process, and quarterly access review.
9. Backup, restore, reconciliation, and disaster-recovery tests.
10. AI-assisted selection policy with validation, fairness review, human oversight, and contestability.

## Remediation plan

### First 72 hours

1. Remove the `cecil` name-based manager condition.
2. Enforce assignment authorization on every reviewer read and write; temporarily limit reviewer access if this cannot be deployed immediately.
3. Disable or protect unverified lecturer submission until backend email verification and file limits are enforced.
4. Remove real people and contact data from the public JavaScript bundle.
5. Stop authenticated and state-changing JSONP requests; ensure tokens are not sent in URLs.
6. Correct the Tutorial Fellow success screen so a failed backend response cannot be presented as submitted.
7. Review Drive folder sharing and revoke broad link/domain access not demonstrably required.
8. Preserve logs and assess whether reviewer records, tokens, uploaded documents, or public client data have already been accessed improperly.

### Within 30 days

1. Implement revocable short-lived sessions and server logout.
2. Add strict backend upload validation, quarantine, and scanning.
3. Add formula-injection protection and transactional/idempotent writes.
4. Publish privacy notices and approve retention, rights, breach, and cross-border procedures.
5. Establish a dedicated deployment identity, least-privilege scopes, MFA, and Shared Drive ownership.
6. Add comprehensive audit events for access grants, data exports, document access, stage changes, deletions, and administrative actions.
7. Add CSP and related browser security headers through an appropriate hosting layer.

### Within 90 days

1. Migrate authoritative operational records from Sheets/Script Properties to a database with server-enforced authorization, constraints, transactions, encryption management, and tested backups.
2. If multi-tenancy is required, add immutable tenant IDs to every identity, session, record, file, query, cache key, and audit event; enforce tenant isolation in the data layer and test cross-tenant denial.
3. Complete independent penetration testing and remediate findings.
4. Run a disaster-recovery exercise, breach tabletop, and data-subject request drill.
5. Validate AI-assisted assessment for accuracy, fairness, explainability, version control, and human override.

## Files requiring remediation

No production files were changed during this audit. The likely implementation set is:

- `apps-script/paste-small-files/01_Routes.gs`
- `apps-script/paste-small-files/04_LecturerApplications.gs`
- `apps-script/paste-small-files/05_Storage.gs`
- `apps-script/paste-small-files/06_Records.gs`
- `apps-script/paste-small-files/07_TutorialFellowApplications.gs`
- `apps-script/paste-small-files/08_EmailOtp.gs`
- `apps-script/paste-small-files/10_TutorialFellowReviews.gs`
- `apps-script/paste-small-files/12_PortalAccess.gs`
- `apps-script/paste-small-files/14_PiKnowledge.gs`
- `apps-script/appsscript.json`
- `apps-script/Code.gs` (generated combined deployment copy; update only through the established source-combination process)
- `app.js`
- `index.html`
- `auth/firebase-config.js`
- `cfa/lecturer-application.html`
- `cfa/tutorial-fellow-application.html`
- `tf-reviews/index.html`
- `lecturer-reviews/index.html`
- `tests/production-smoke.test.js`

New governance and engineering artifacts should include privacy notices, a retention schedule, an incident-response runbook, a DPIA, a role-access matrix, threat-model documentation, and security regression tests.

## Verification performed

- Automated test suite: 14 passed, 1 failed.
- The failure is a stale calendar test expecting Prof. Blaise Tchapnda for MES02; current source assigns Prof. Faraimunashe Chirove and keeps Prof. Blaise Tchapnda as alternate. This is not a security failure.
- Current-tree secret-pattern scan found the Firebase browser API key, which is not a password by itself but must be protected by Firebase API restrictions and authorized-domain configuration. No private key or AWS access key pattern was found.
- Live root response returned HTTP 200 from GitHub Pages but did not include the security headers listed in SEC-14.
- Production configuration and Google Drive sharing settings were not altered. Runtime permissions, historical access logs, Workspace admin settings, actual deployment access mode, backups, processor contracts, and organisational policies still require administrative verification.

## Authoritative references

- Kenya Office of the Data Protection Commissioner, [Data Protection Act, 2019](https://www.odpc.go.ke/wp-content/uploads/2024/02/TheDataProtectionAct__No24of2019.pdf)
- Kenya ODPC, [Data protection compliance](https://www.odpc.go.ke/data-protection-compliance/)
- Kenya ODPC, [Frequently asked questions](https://www.odpc.go.ke/faqs/)
- Rwanda Data Protection and Privacy Office, [Law No. 058/2021](https://dpo.gov.rw/fileadmin/DPO/Law_relating_to_the_protection_of_personal_data_and_privacy.pdf)
- Rwanda DPO, [Registration guide for data controllers and processors](https://dpo.gov.rw/fileadmin/DPO/ComplianceTools/registration-guide-for-data-controller-and-processor.pdf)
- Rwanda DPO, [Frequently asked questions](https://dpo.gov.rw/faqs)
- European Union, [General Data Protection Regulation](https://eur-lex.europa.eu/eli/reg/2016/679/)
- Google, [Apps Script web apps](https://developers.google.com/apps-script/guides/web)
- Google, [Web app manifest resource](https://developers.google.com/apps-script/manifest/web-app-api-executable)
