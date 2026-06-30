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
  DriveDocuments: ["document_id", "type", "related_id", "file_name", "drive_file_id", "url", "created_at"],
};

DATASET_TABS.forEach((tab) => {
  TAB_HEADERS[tab] = ["record_id", "json", "updated_at"];
});
