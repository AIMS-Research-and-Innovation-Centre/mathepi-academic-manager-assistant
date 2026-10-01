# MathEpi Production Audit

## Completed

- Aligned the programme calendar, planner, appointments, course blocks, and staffing migration with the approved 2026/27 schedule.
- Added approved-session enforcement to operational Apps Script routes and manager-role enforcement to administrative and applicant-review actions.
- Kept public application submission, Google identity establishment, access-status checks, and public CFA status available without an operational session.
- Added automatic access-decision notifications with duplicate suppression.
- Replaced obsolete password-management controls with a concise current-session panel.
- Added explicit offline feedback, network-first application shell updates, and device-specific PWA installation guidance.
- Preserved user-created records during date and staffing migrations.

## Remaining Deployment Step

Redeploy the Apps Script project after replacing `01_Routes.gs` and `12_PortalAccess.gs`. Until redeployed, the live backend continues using its previous route authorization behavior.

## Residual Risks

- Google Sheets remains the operational datastore and can be delayed by Apps Script or Drive service limits.
- Approved non-manager roles receive the shared operational bootstrap in the current architecture. A future backend version should return role-filtered datasets rather than relying on client-side visibility rules.
- Email delivery depends on the `aimsric.org` SPF/DKIM/DMARC configuration; access decisions therefore use reliable in-app notification as the primary channel.
