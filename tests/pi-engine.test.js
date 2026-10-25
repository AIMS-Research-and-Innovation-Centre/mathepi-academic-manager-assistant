const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const Pi = require("../pi/pi-engine.js");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const seed = (name) => eval(app.match(new RegExp(`const ${name} = (\\[[\\s\\S]*?\\n\\]);`))[1]);
const courses = seed("DEFAULT_COURSES");
const people = [
  { name: "Grace Mumbanu" },
  { name: "Gassan Ali Mohamed Osman Farah" },
  { name: "Prof. Aklilu Zeleke" },
];
// Monday 12 October 2026, 10:00 local time.
const NOW = new Date(2026, 9, 12, 10);

const topCourse = (question) => Pi.matchCourses(question, courses)[0]?.course.code;

test("courses are found by code, nickname, title words and level", () => {
  assert.equal(topCourse("what is mes 5 about"), "MES05");
  assert.equal(topCourse("Tell me about MEC02"), "MEC02");
  assert.equal(topCourse("epidemiology 2"), "MEC02");
  assert.equal(topCourse("Epidemiology II outcomes"), "MEC02");
  assert.equal(topCourse("when is mathematical modelling 3"), "MEC05");
  assert.equal(topCourse("bayesian stats"), "MEE03");
  assert.equal(topCourse("advanced data analysis"), "MEC08");
  assert.equal(topCourse("who teaches stochastic models"), "MEE04");
  assert.equal(topCourse("I need help with differential equations"), "MES02");
  assert.equal(topCourse("what's on tomorrow"), undefined);
});

test("people are found by any part of their name, ignoring titles", () => {
  assert.equal(Pi.matchPeople("who is grace", people)[0].person.name, "Grace Mumbanu");
  assert.equal(Pi.matchPeople("contact gassan", people)[0].person.name, "Gassan Ali Mohamed Osman Farah");
  assert.equal(Pi.matchPeople("Prof Zeleke office hours", people)[0].person.name, "Prof. Aklilu Zeleke");
  // The old search stripped "the" from inside "mathematics"; nothing should match here.
  assert.equal(Pi.matchPeople("what are the mathematics prerequisites", people).length, 0);
});

test("dates are understood relative to today", () => {
  assert.deepEqual(Pi.parseDate("what's on today", NOW), { start: "2026-10-12", end: "2026-10-12", label: "today" });
  assert.equal(Pi.parseDate("tomorrow", NOW).start, "2026-10-13");
  assert.deepEqual(Pi.parseDate("next week", NOW), { start: "2026-10-19", end: "2026-10-25", label: "next week" });
  assert.equal(Pi.parseDate("on friday", NOW).start, "2026-10-16");
  assert.equal(Pi.parseDate("next monday", NOW).start, "2026-10-19");
  assert.equal(Pi.parseDate("26 Oct", NOW).start, "2026-10-26");
  assert.equal(Pi.parseDate("Oct 26th", NOW).start, "2026-10-26");
  assert.equal(Pi.parseDate("12 jan", NOW).start, "2027-01-12");
  assert.equal(Pi.parseDate("5/11", NOW).start, "2026-11-05");
  assert.equal(Pi.parseDate("what is happening", NOW), null);
  assert.equal(Pi.parseTime("tomorrow at 3pm"), "15:00");
  assert.equal(Pi.parseTime("by 9:30am"), "09:30");
  assert.equal(Pi.parseTime("in 2 weeks"), "");
});

test("safety-sensitive messages are routed before anything else", () => {
  assert.equal(Pi.detectSensitive("I am in danger")?.kind, "emergency");
  assert.equal(Pi.detectSensitive("someone is harassing me")?.kind, "harassment");
  assert.equal(Pi.detectSensitive("my tutor is bullying me")?.kind, "harassment");
  assert.equal(Pi.detectSensitive("I feel overwhelmed")?.kind, "wellbeing");
  assert.equal(Pi.detectSensitive("I'm stressed about exams")?.kind, "wellbeing");
  // Epidemiology vocabulary must not trigger the emergency route.
  assert.equal(Pi.detectSensitive("what is the attack rate in an SIR model"), null);
});

test("actions are recognised and prefilled", () => {
  assert.equal(Pi.detectAction("book an appointment with my tutor tomorrow at 3pm").type, "appointment");
  assert.equal(Pi.detectAction("Book time with my tutor").type, "appointment");
  assert.equal(Pi.detectAction("how do I book an appointment?").asksHow, true);
  assert.deepEqual(Pi.detectAction("remind me to finish the MES05 setup tomorrow"), { type: "todo", title: "Finish the MES05 setup" });
  assert.equal(Pi.detectAction("plan revision for MES04 on friday at 4pm").type, "planner");
  const wifi = Pi.detectAction("The Wi-Fi is not working");
  assert.equal(wifi.type, "support");
  assert.equal(wifi.category, "IT/technical support");
  assert.equal(Pi.detectAction("the projector in the lecture room is broken").category, "Facilities/classroom support");
  assert.equal(Pi.detectAction("what is the attack rate"), null);
});

test("knowledge ranking finds the right article without exact keywords", () => {
  const docs = [
    { id: "integrity", title: "Academic integrity", text: "Cheating, falsification and plagiarism are prohibited.", keywords: ["plagiarism", "cheating"] },
    { id: "equipment", title: "Equipment and learning resources", text: "AIMS equipment is for authorised users.", keywords: ["computer", "equipment", "laptop", "library", "it"] },
    { id: "attendance", title: "Attendance", text: "Students are expected to maintain at least 70% lecture attendance.", keywords: ["attendance", "absent"] },
  ];
  const index = Pi.buildIndex(docs);
  assert.equal(Pi.search(index, "can I copy my friend's homework")[0].doc.id, "integrity");
  assert.equal(Pi.search(index, "what happens if I miss classes")[0].doc.id, "attendance");
  // The old Pi matched "it" inside "submit" and answered with the IT equipment rules.
  const submit = Pi.search(index, "when do I submit my assignment");
  assert.ok(!submit.length || submit[0].doc.id !== "equipment");
});

test("semantic scores re-rank results when the on-device model is available", () => {
  const docs = [
    { id: "a", title: "Booking an appointment", text: "Request a meeting with staff." },
    { id: "b", title: "Getting support", text: "Raise wellbeing or IT requests." },
  ];
  const index = Pi.buildIndex(docs);
  const semantic = new Map([["a", 0.2], ["b", 0.72]]);
  assert.equal(Pi.search(index, "who can I talk to", { semantic })[0].doc.id, "b");
});

test("questions that only mention a word are not mistaken for actions or courses", () => {
  // Asking who to talk to is a request for the route, not for a booking.
  assert.equal(Pi.detectAction("who do I speak to if a lecturer treats me unfairly"), null);
  // "computer" is in "Scientific Computing", but this is not about the course.
  const computer = Pi.matchCourses("can I take a computer home", courses).find((match) => match.course.code === "MES06");
  assert.ok(!computer || computer.explained === false);
  assert.equal(Pi.matchCourses("latex", courses)[0].explained, true);
});

test("a single shared word gives a lead, not a confident answer", () => {
  const index = Pi.buildIndex([{ id: "equipment", title: "Equipment and learning resources", text: "Library materials must be handled carefully." }]);
  assert.ok(Pi.search(index, "what will I learn")[0].confidence < 0.6);
  assert.ok(Pi.search(index, "Can family members attend the graduation ceremony?").every((result) => result.confidence < 0.3));
});
