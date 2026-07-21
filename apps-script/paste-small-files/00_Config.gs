const MATHEPI = {
  spreadsheetName: "MathEpi Academic Operations",
  rootFolderName: "MathEpi Academic Operations",
  properties: {
    spreadsheetId: "MATHEPI_SPREADSHEET_ID",
    driveRootFolderId: "MATHEPI_DRIVE_ROOT_FOLDER_ID",
  },
  defaultCfaStatuses: {
    lecturers: "Open",
    tutors: "Open",
    "head-tutor": "Closed",
  },
};

const DATASET_TABS = [
  "CalendarBlocks",
  "Courses",
  "People",
  "Sessions",
  "Timesheets",
  "Tasks",
  "StudentPlanner",
  "StudentTodos",
  "PlannerTasks",
  "Students",
  "StudyGroups",
  "StudyGroupMembers",
  "StudyGroupInvitations",
  "StudyGroupActivities",
  "StudyGroupMeetings",
  "StudyGroupTaskAssignments",
  "Appointments",
  "Availability",
  "SupportRequests",
];

const TAB_HEADERS = {
  AppState: ["key", "json", "updated_at"],
  CfaStatuses: ["id", "status", "updated_at"],
  LecturerApplications: [
    "application_id",
    "submitted_at",
    "email",
    "applicant",
    "affiliation",
    "designation",
    "first_host",
    "second_host",
    "course",
    "block",
    "availability",
    "passport_file_name",
    "passport_drive_url",
    "alumni",
    "full_application_json",
  ],
  TutorialFellowApplications: [
    "application_id", "submitted_at", "title", "email", "applicant", "gender", "phone",
    "has_whatsapp", "contact_whatsapp", "nationality", "country_of_residence", "address",
    "affiliation", "designation", "phd_field", "phd_completion", "thesis_title_explainer",
    "research_area", "teaching_experience", "tutoring_experience", "mentoring_experience",
    "research_experience", "research_plan", "availability", "residence_ready", "teaching_gap_ready",
    "english_communication", "aims_alumni", "aims_centre", "aims_programme_year",
    "passport_file_name", "passport_drive_url", "phd_certificate_file_name", "phd_certificate_drive_url",
    "reference_1_json", "reference_2_json", "reference_3_json", "full_application_json",
  ],
  Reviewers: [
    "reviewer_email", "name", "role", "status", "assigned_call", "created_at", "updated_at",
  ],
  ReviewAssignments: [
    "assignment_id", "application_id", "reviewer_email", "call_id", "status", "created_at", "updated_at",
  ],
  ReviewScores: [
    "score_id", "application_id", "reviewer_email", "reviewer_name", "teaching_score",
    "research_score", "weighted_score", "eligibility_decision", "recommendation",
    "course_verdicts_json", "machine_score_json", "reason", "updated_at",
  ],
  ReviewAnalyses: [
    "analysis_id", "application_id", "applicant_code", "reviewer_email", "reviewer_name", "stage",
    "teaching_score", "research_score", "weighted_score", "score_details_json",
    "component_verdicts_json", "eligibility_text", "best_fit_text", "delivery_text",
    "teaching_text", "research_text", "kemri_aims_text", "gaps_text",
    "interview_questions_text", "general_comment", "analysis_json", "updated_at",
  ],
  ReviewNotes: [
    "note_id", "application_id", "author_email", "author_name", "stage", "note",
    "status", "created_at", "edited_at", "edited_by", "withdrawn_at",
  ],
  ReviewStages: ["application_id", "stage", "decision", "updated_by", "updated_at"],
  ReviewConfig: ["key", "json", "updated_at"],
  ReviewAudit: [
    "audit_id", "timestamp", "reviewer_email", "reviewer_name", "action",
    "application_id", "old_value_json", "new_value_json", "reason",
  ],
  DriveDocuments: ["document_id", "type", "related_id", "file_name", "drive_file_id", "url", "created_at"],
};

DATASET_TABS.forEach((tab) => {
  TAB_HEADERS[tab] = ["record_id", "json", "updated_at"];
});
