/*
 * Pi language engine.
 *
 * Runs entirely in the browser with no network calls and no paid API. It turns
 * a free-form question into something the app can answer from its own data:
 * dates ("next Tuesday"), courses ("the stats course"), people ("Grace"),
 * safety-sensitive topics, actions ("remind me to ...") and ranked knowledge
 * articles. An optional on-device embedding model (pi-semantic-worker.js) can
 * add semantic scores to the ranking; everything here works without it.
 *
 * Loaded as a classic script in the browser (window.PiEngine) and with
 * require() in the Node tests.
 */
(function (root, factory) {
  const engine = factory();
  if (typeof module === "object" && module.exports) module.exports = engine;
  else root.PiEngine = engine;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  const STOPWORDS = new Set(
    (
      "a an the and or but if then so of to in on at by for with from into onto about as is are was were be been being " +
      "do does did doing have has had i me my mine we our us you your it its this that these those there here what which " +
      "who whom whose when where why how can could would should will shall may might must please tell show give find " +
      "know let lets get got any some all each more most other such no not only own same than too very just also " +
      "pi hi hello hey thanks thank ok okay explain describe info information detail details mean means happen happens " +
      "need want like wonder wondering question ask asking regarding concerning"
    ).split(" "),
  );

  // Words people use for the same thing. Every token is mapped to a canonical
  // stem before indexing and searching, so "hand in" finds "submission".
  const SYNONYMS = {
    teacher: "lectur", professor: "lectur", prof: "lectur", instructor: "lectur", lecturer: "lectur",
    ta: "tutor", tf: "tutor", fellow: "tutor",
    class: "session", lesson: "session", lecture: "session", tutorial: "session",
    timetable: "schedul", calendar: "schedul", agenda: "schedul",
    stats: "statist", stat: "statist", maths: "mathemat", math: "mathemat",
    prob: "probabl", probability: "probabl", epi: "epidemiolog", epid: "epidemiolog", epidemiology: "epidemiolog",
    modelling: "model", modeling: "model", models: "model",
    exam: "assess", exams: "assess", test: "assess", quiz: "assess", quizzes: "assess", grade: "assess",
    grades: "assess", marks: "assess", mark: "assess", score: "assess", assessment: "assess",
    homework: "assign", coursework: "assign", assignment: "assign", submit: "submiss", submission: "submiss",
    deadline: "due", due: "due",
    cheat: "plagiar", cheating: "plagiar", copying: "plagiar", copy: "plagiar", plagiarism: "plagiar",
    chatgpt: "ai", gpt: "ai", llm: "ai",
    absent: "attend", absence: "attend", miss: "attend", missed: "attend", attendance: "attend",
    complain: "grievanc", complaint: "grievanc", grievance: "grievanc", concern: "grievanc",
    wifi: "internet", "wi-fi": "internet", network: "internet", connection: "internet",
    pc: "comput", laptop: "comput", computer: "comput",
    room: "venu", venue: "venu", hall: "venu", classroom: "venu",
    hostel: "accommod", housing: "accommod", accommodation: "accommod",
    food: "meal", lunch: "meal", breakfast: "meal", dinner: "meal",
    begin: "start", starts: "start", starting: "start", opening: "start",
    finish: "end", ends: "end", finishing: "end",
    orientation: "onboard", induction: "onboard", onboarding: "onboard",
    rule: "polic", rules: "polic", policy: "polic", regulation: "polic",
    help: "support", support: "support",
    long: "duration", length: "duration", duration: "duration",
    // For finding the rule, "is X allowed" and "X is prohibited" are the same question.
    allow: "permit", allowed: "permit", permitted: "permit", permit: "permit", prohibited: "permit",
    forbidden: "permit", banned: "permit",
  };

  const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const WEEKDAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[’‘`]/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  function stem(word) {
    let w = word;
    if (w.length <= 3) return w;
    const rules = [
      ["ications", ""], ["ication", ""], ["ically", ""], ["ical", ""], ["ations", ""], ["ation", ""],
      ["ments", ""], ["ment", ""], ["ings", ""], ["ing", ""], ["ics", ""], ["ies", "y"], ["ers", ""],
      ["er", ""], ["es", ""], ["ed", ""], ["ly", ""], ["s", ""],
    ];
    for (const [suffix, replacement] of rules) {
      if (w.endsWith(suffix) && w.length - suffix.length >= 4) {
        w = w.slice(0, w.length - suffix.length) + replacement;
        break;
      }
    }
    // "modell" (from modelling) and "model" are the same word.
    if (/([bdfglmnprt])\1$/.test(w) && w.length > 4) w = w.slice(0, -1);
    return w;
  }

  function words(text) {
    return normalize(text).match(/[a-z0-9]+(?:[-'][a-z0-9]+)*/g) || [];
  }

  // Content tokens: stopwords dropped, synonyms folded, stemmed.
  function tokens(text) {
    const out = [];
    for (const raw of words(text)) {
      const word = raw.replace(/'s$/, "").replace(/'/g, "");
      if (!word || STOPWORDS.has(word)) continue;
      const canonical = SYNONYMS[word] || SYNONYMS[stem(word)] || stem(word);
      if (canonical) out.push(canonical);
    }
    return out;
  }

  // ---------------------------------------------------------------- dates

  function isoDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function addDays(date, days) {
    const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    copy.setDate(copy.getDate() + days);
    return copy;
  }

  function startOfWeek(date) {
    // Weeks run Monday to Sunday, matching the programme timetable.
    const offset = (date.getDay() + 6) % 7;
    return addDays(date, -offset);
  }

  function range(start, end, label) {
    return { start: isoDate(start), end: isoDate(end), label };
  }

  function parseDate(text, now) {
    const today = now ? new Date(now) : new Date();
    const base = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const q = normalize(text);

    if (/\btoday\b|\btonight\b|\bthis (morning|afternoon|evening)\b|\bnow\b/.test(q)) return range(base, base, "today");
    if (/\btomorrow\b/.test(q)) return range(addDays(base, 1), addDays(base, 1), "tomorrow");
    if (/\byesterday\b/.test(q)) return range(addDays(base, -1), addDays(base, -1), "yesterday");
    if (/\bnext week\b/.test(q)) {
      const start = addDays(startOfWeek(base), 7);
      return range(start, addDays(start, 6), "next week");
    }
    if (/\b(this|current) week\b|\bthe week\b|\bweek ahead\b/.test(q)) {
      const start = startOfWeek(base);
      return range(start, addDays(start, 6), "this week");
    }
    if (/\b(this )?weekend\b/.test(q)) {
      const saturday = addDays(startOfWeek(base), 5);
      return range(saturday, addDays(saturday, 1), "this weekend");
    }
    if (/\bnext month\b/.test(q)) {
      const start = new Date(base.getFullYear(), base.getMonth() + 1, 1);
      return range(start, new Date(start.getFullYear(), start.getMonth() + 1, 0), "next month");
    }
    if (/\bthis month\b/.test(q)) {
      const start = new Date(base.getFullYear(), base.getMonth(), 1);
      return range(start, new Date(start.getFullYear(), start.getMonth() + 1, 0), "this month");
    }

    const weekday = q.match(/\b(next |this |on )?(sun|mon|tue|tues|wed|thu|thur|thurs|fri|sat)(?:day|nesday|rsday|urday|sday)?\b/);
    if (weekday) {
      const index = WEEKDAYS.findIndex((day) => day.startsWith(weekday[2].slice(0, 3)));
      let delta = (index - base.getDay() + 7) % 7;
      if (weekday[1] === "next " && delta === 0) delta = 7;
      if (weekday[1] === "next " && delta < 7 && /\bnext week\b/.test(q)) delta += 7;
      const day = addDays(base, delta);
      return range(day, day, WEEKDAYS[index][0].toUpperCase() + WEEKDAYS[index].slice(1));
    }

    const isoMatch = q.match(/\b(20\d{2})-(\d{1,2})-(\d{1,2})\b/);
    if (isoMatch) {
      const day = new Date(Number(isoMatch[1]), Number(isoMatch[2]) - 1, Number(isoMatch[3]));
      return range(day, day, isoDate(day));
    }

    const monthName = "(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*";
    const dayFirst = q.match(new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?(?: of)? ${monthName}\\b(?: (20\\d{2}))?`));
    const monthFirst = q.match(new RegExp(`\\b${monthName} (\\d{1,2})(?:st|nd|rd|th)?\\b(?:,? (20\\d{2}))?`));
    if (dayFirst || monthFirst) {
      const dayNum = Number(dayFirst ? dayFirst[1] : monthFirst[2]);
      const month = MONTHS.indexOf((dayFirst ? dayFirst[2] : monthFirst[1]).slice(0, 3));
      const explicitYear = dayFirst ? dayFirst[3] : monthFirst[3];
      let year = explicitYear ? Number(explicitYear) : base.getFullYear();
      let day = new Date(year, month, dayNum);
      // "12 Jan" asked in October means next January.
      if (!explicitYear && day < addDays(base, -60)) day = new Date(year + 1, month, dayNum);
      if (day.getMonth() === month) return range(day, day, isoDate(day));
    }

    const slash = q.match(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/);
    if (slash) {
      // Day-first, as written in Kenya and across the programme's region.
      const yearRaw = slash[3] ? Number(slash[3]) : base.getFullYear();
      const year = yearRaw < 100 ? 2000 + yearRaw : yearRaw;
      const day = new Date(year, Number(slash[2]) - 1, Number(slash[1]));
      if (day.getDate() === Number(slash[1])) return range(day, day, isoDate(day));
    }

    return null;
  }

  function parseTime(text) {
    const q = normalize(text);
    if (/\bnoon\b|\bmidday\b/.test(q)) return "12:00";
    const match = q.match(/\b(?:at |by |from )?(\d{1,2})(?::|\.)?(\d{2})?\s*(am|pm|h|hrs)?\b/g);
    if (!match) {
      if (/\bmorning\b/.test(q)) return "09:00";
      if (/\bafternoon\b/.test(q)) return "14:00";
      if (/\bevening\b/.test(q)) return "17:00";
      return "";
    }
    for (const candidate of match) {
      const parts = candidate.trim().match(/(?:at |by |from )?(\d{1,2})(?::|\.)?(\d{2})?\s*(am|pm|h|hrs)?/);
      if (!parts) continue;
      const hasMarker = parts[2] || parts[3] || /^(at|by|from) /.test(candidate.trim());
      if (!hasMarker) continue;
      let hour = Number(parts[1]);
      const minute = parts[2] ? Number(parts[2]) : 0;
      if (hour > 23 || minute > 59) continue;
      if (parts[3] === "pm" && hour < 12) hour += 12;
      if (parts[3] === "am" && hour === 12) hour = 0;
      // "at 3" during a working day means 3 pm.
      if (!parts[3] && hour >= 1 && hour <= 6) hour += 12;
      return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    }
    return "";
  }

  // ---------------------------------------------------------------- fuzzy matching

  function editDistance(a, b) {
    if (a === b) return 0;
    if (Math.abs(a.length - b.length) > 2) return 3;
    const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i += 1) {
      let diagonal = prev[0];
      prev[0] = i;
      for (let j = 1; j <= b.length; j += 1) {
        const above = prev[j];
        prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diagonal + (a[i - 1] === b[j - 1] ? 0 : 1));
        diagonal = above;
      }
    }
    return prev[b.length];
  }

  function closeEnough(a, b) {
    if (a === b) return true;
    if (a.length < 5 || b.length < 5) return false;
    return editDistance(a, b) <= (Math.min(a.length, b.length) >= 8 ? 2 : 1);
  }

  function courseCodeVariants(code) {
    const match = String(code || "").toLowerCase().match(/^([a-z]+)0*(\d+)$/);
    if (!match) return [String(code || "").toLowerCase()];
    return [`${match[1]}${match[2].padStart(2, "0")}`, `${match[1]}${match[2]}`, `${match[1]} ${match[2].padStart(2, "0")}`, `${match[1]} ${match[2]}`];
  }

  const LEVEL_WORDS = { i: 1, ii: 2, iii: 3, 1: 1, 2: 2, 3: 3, one: 1, two: 2, three: 3 };

  // "Epidemiology II" -> 2. Only the trailing roman numeral counts, so a
  // pronoun "I" inside a title is ignored.
  function titleLevel(title) {
    const match = String(title || "").match(/\b(I{1,3})\)?\s*$/);
    return match ? match[1].length : 0;
  }

  function queryLevel(q) {
    const match = q.match(/\b(?:level |part |course )?(iii|ii|[1-3]|one|two|three)\b(?!\s*(?:am|pm|:|\.|h\b|hrs|weeks?|days?|hours?|min))/) || q.match(/\b(i)\s*$/);
    return match ? LEVEL_WORDS[match[1]] : 0;
  }

  function matchCourses(text, courses) {
    const q = normalize(text);
    const queryTokens = [...new Set(tokens(text))];
    const list = (courses || []).filter((item) => item && item.code);
    const titleTokenSets = list.map((item) => [...new Set(tokens(String(item.title || "").replace(/\([^)]*\)/g, " ")))]);
    // Words shared by many titles ("analysis", "introduction") identify
    // little, so each word is weighted by how rare it is across titles.
    const df = new Map();
    for (const set of titleTokenSets) for (const token of set) df.set(token, (df.get(token) || 0) + 1);
    const weight = (token) => Math.log(1 + list.length / (df.get(token) || 1));
    const askedLevel = queryLevel(q);
    const results = [];
    list.forEach((item, index) => {
      const codeHit = courseCodeVariants(item.code).some((variant) => new RegExp(`\\b${variant.replace(" ", "\\s?")}\\b`).test(q));
      if (codeHit) {
        results.push({ course: item, score: 1, by: "code" });
        return;
      }
      const titleTokens = titleTokenSets[index];
      if (!titleTokens.length) return;
      let hitWeight = 0;
      let totalWeight = 0;
      for (const token of titleTokens) {
        totalWeight += weight(token);
        if (queryTokens.some((queryToken) => queryToken === token || closeEnough(queryToken, token))) hitWeight += weight(token);
      }
      if (!hitWeight) return;
      let score = 0.3 + 0.6 * (hitWeight / totalWeight);
      const level = titleLevel(item.title);
      if (askedLevel && level) score += askedLevel === level ? 0.15 : -0.35;
      // True when every content word of the question belongs to this title
      // ("survival", "epidemiology 2"), as opposed to a title word appearing
      // inside an unrelated question ("can I take a computer home").
      const explained = queryTokens
        .filter((token) => !LEVEL_WORDS[token])
        .every((token) => titleTokens.some((titleToken) => titleToken === token || closeEnough(token, titleToken)));
      if (score >= 0.5) results.push({ course: item, score: Math.min(score, 0.97), by: "title", explained });
    });
    return results.sort((a, b) => b.score - a.score);
  }

  const NAME_TITLES = new Set(["prof", "professor", "dr", "doctor", "mr", "mrs", "ms", "miss", "sir", "madam"]);

  function matchPeople(text, people) {
    const queryWords = words(text).filter((word) => word.length >= 3 && !STOPWORDS.has(word) && !NAME_TITLES.has(word));
    const results = [];
    for (const item of people || []) {
      const nameWords = words(item && item.name).filter((word) => !NAME_TITLES.has(word));
      if (!nameWords.length) continue;
      let hits = 0;
      for (const nameWord of nameWords) {
        if (nameWord.length < 3) continue;
        if (queryWords.some((word) => word === nameWord || closeEnough(word, nameWord))) hits += 1;
      }
      if (!hits) continue;
      results.push({ person: item, score: Math.min(1, 0.55 + 0.45 * (hits / nameWords.length)) });
    }
    return results.sort((a, b) => b.score - a.score);
  }

  // ---------------------------------------------------------------- safety and intent

  // Checked before anything else. These never get a generated or ranked
  // answer; the app shows the approved route for the category.
  const SENSITIVE = [
    {
      kind: "emergency",
      pattern: /\b(emergenc\w*|suicid\w*|kill (my ?self|me)|end (it all|my life)|self[- ]?harm\w*|hurt(ing)? my ?self|want to die|i'?m in danger|in danger|being attacked|was attacked|unconscious|ambulance|bleeding|overdose|fire alarm|house on fire)\b/,
    },
    {
      kind: "harassment",
      pattern: /\b(harass\w*|sexual(ly)? (harass\w*|assault\w*|advances?|abuse)|assault\w*|abus(e|ed|ive)|bull(y|ied|ying)|discriminat\w*|touched me|inappropriate(ly)?|threat(en|ened|ening|s)?|stalk\w*)\b/,
    },
    {
      kind: "wellbeing",
      pattern: /\b(stress(ed|ful)?|overwhelm\w*|anxi(ous|ety)|depress\w*|lonely|loneliness|homesick\w*|can'?t cope|cannot cope|not coping|panic\w*|burn(ed|t)? ?out|mental health|counsel\w*|griev(e|ing)|bereave\w*|feel(ing)? (sad|low|down|hopeless|alone)|struggling emotionally)\b/,
    },
  ];

  function detectSensitive(text) {
    const q = normalize(text);
    for (const rule of SENSITIVE) if (rule.pattern.test(q)) return { kind: rule.kind };
    return null;
  }

  const FACILITY_WORDS = /\b(projector|aircon|air ?conditioner|fan|light|lights|socket|power|toilet|tap|water|leak\w*|door|chair|desk|whiteboard|room|classroom|lab)\b/;
  const IT_WORDS = /\b(wifi|wi-fi|internet|network|password|log ?in|login|sign ?in|email|printer|laptop|computer|pc|drive|software|install\w*|vpn|portal|account|zoom|teams)\b/;
  const PROBLEM_WORDS = /\b(broken|broke|not working|doesn'?t work|isn'?t working|won'?t (work|start|connect|load|open)|can'?t (log ?in|login|sign ?in|connect|access|open|print)|cannot (log ?in|login|connect|access|open|print)|down|fault\w*|fail\w*|error|crash\w*|stuck|locked out|forgot (my )?password|reset (my )?password|slow|no (internet|wifi|power|water))\b/;

  function stripLead(text, pattern) {
    return String(text || "").replace(pattern, "").replace(/^[\s,:-]+/, "").trim();
  }

  function sentenceCase(text) {
    const clean = String(text || "").replace(/[\s.?!]+$/, "").trim();
    return clean ? clean[0].toUpperCase() + clean.slice(1) : "";
  }

  function detectAction(text) {
    const raw = String(text || "").trim();
    const q = normalize(raw);
    const asksHow = /^(how|where|can i|what is the way|what's the process)\b/.test(q) && !/\b(for me|please)\b/.test(q);
    // "Who do I speak to if ..." asks for a route, not for a meeting to be booked.
    const asksWho = /^(who|which|what|where|when)\b/.test(q) && !/\b(for me|please)\b/.test(q);

    if (!asksWho && /\b(book|schedule|arrange|set ?up|request|make|organi[sz]e)\b.{0,40}\b(appointment|meeting|slot|consultation|office hours?|one[- ]on[- ]one|1:1|call)\b|\bbook (some |a )?time\b|\b(meet|see|talk to|speak (to|with)|meeting with)\b.{0,30}\b(my |the )?(tutor|lecturer|coordinator|manager|head tutor|counsell?or|prof\w*|dr)\b/.test(q)) {
      return { type: "appointment", asksHow };
    }

    if (PROBLEM_WORDS.test(q) && (IT_WORDS.test(q) || FACILITY_WORDS.test(q)) || /\b(report|log|raise|open)\b.{0,20}\b(ticket|fault|issue|problem)\b/.test(q)) {
      const facility = FACILITY_WORDS.test(q) && !IT_WORDS.test(q);
      return {
        type: "support",
        category: facility ? "Facilities/classroom support" : "IT/technical support",
        title: sentenceCase(stripLead(raw, /^(please |can you |could you )?(report|log|raise|open)( an?| a new)?( it)?( ticket| fault| issue| problem)?( that| about| for)?\s*/i)),
        urgency: /\b(urgent|asap|immediately|right now|exam|presentation)\b/.test(q) ? "Urgent" : "Normal",
        asksHow,
      };
    }

    if (/\b(accommodation|hostel|room key|travel|flight|visa|airport|transport)\b/.test(q) && /\b(problem|issue|help|need|request|broken|change|late|delayed)\b/.test(q)) {
      return { type: "support", category: "Accommodation/travel support", title: sentenceCase(raw), urgency: "Normal", asksHow };
    }

    const remind = raw.match(/^(?:please |pi,? )?(?:remind me (?:to |about )?|add (?:a |an )?(?:to-?do|task|reminder)(?: to| for| that)?:? ?|to-?do:? ?|don'?t let me forget (?:to )?|note to self:? ?)(.+)$/i);
    if (remind) return { type: "todo", title: sentenceCase(remind[1].replace(/\b(today|tomorrow|tonight|next week|this week|on \w+day|by \w+day|at \d{1,2}(:\d{2})?\s*(am|pm)?|on \d{1,2}(st|nd|rd|th)? \w+)\b/gi, "").replace(/\s{2,}/g, " ")) };

    const plan = raw.match(/^(?:please |pi,? )?(?:plan|block (?:out )?(?:time|an hour|two hours)? ?(?:for|to)?|schedule (?:time |a session |study time )?(?:for|to)?|add (?:a )?(?:study|revision) (?:block|session) (?:for|to)?|i want to (?:study|revise))\s*(.+)$/i);
    if (plan && !/\b(appointment|meeting)\b/.test(q)) {
      return { type: "planner", title: sentenceCase(plan[1].replace(/\b(today|tomorrow|tonight|next week|this week|on \w+day|at \d{1,2}(:\d{2})?\s*(am|pm)?)\b/gi, "").replace(/\s{2,}/g, " ")) || "Study session" };
    }

    return null;
  }

  // ---------------------------------------------------------------- knowledge ranking (BM25)

  function buildIndex(docs) {
    const entries = (docs || []).map((doc) => {
      const fieldTokens = [
        ...tokens(doc.title),
        ...tokens(doc.title),
        ...tokens((doc.keywords || []).join(" ")),
        ...tokens((doc.keywords || []).join(" ")),
        ...tokens(doc.text),
        ...tokens((doc.bullets || []).join(" ")),
        ...tokens((doc.examples || []).join(" ")),
      ];
      const counts = new Map();
      for (const token of fieldTokens) counts.set(token, (counts.get(token) || 0) + 1);
      return { doc, counts, length: fieldTokens.length || 1 };
    });
    const documentFrequency = new Map();
    for (const entry of entries) for (const token of entry.counts.keys()) documentFrequency.set(token, (documentFrequency.get(token) || 0) + 1);
    const averageLength = entries.reduce((sum, entry) => sum + entry.length, 0) / Math.max(1, entries.length);
    return { entries, documentFrequency, averageLength, size: entries.length };
  }

  function bm25(index, queryTokens) {
    const k1 = 1.2;
    const b = 0.75;
    const scores = new Map();
    const unique = [...new Set(queryTokens)];
    for (const entry of index.entries) {
      let score = 0;
      for (const token of unique) {
        const frequency = entry.counts.get(token) || 0;
        if (!frequency) continue;
        const df = index.documentFrequency.get(token) || 0;
        const idf = Math.log(1 + (index.size - df + 0.5) / (df + 0.5));
        score += idf * ((frequency * (k1 + 1)) / (frequency + k1 * (1 - b + (b * entry.length) / index.averageLength)));
      }
      if (score > 0) scores.set(entry.doc.id, score);
    }
    return scores;
  }

  // Weight given to a question word that appears in no document. It is lower
  // than a rare matching word so filler does not sink a good match, but high
  // enough that "graduation ceremony" is not answered by "attendance" alone.
  const UNSEEN_WEIGHT = 2.5;

  /*
   * Ranks knowledge documents. `semantic`, when present, maps doc id to the
   * cosine similarity from the on-device model; lexical and semantic scores are
   * blended so either one alone still produces a sensible order.
   *
   * `confidence` (0-1) says how much of the question the document covers,
   * weighting rare words more, so one shared word cannot produce a confident
   * answer.
   */
  function search(index, query, options = {}) {
    const queryTokens = tokens(query);
    const lexical = bm25(index, queryTokens);
    const maxLexical = Math.max(0, ...lexical.values());
    const semantic = options.semantic || null;
    const unique = [...new Set(queryTokens)];
    const weights = unique.map((token) => {
      const df = index.documentFrequency.get(token) || 0;
      return df ? Math.log(1 + (index.size - df + 0.5) / (df + 0.5)) : UNSEEN_WEIGHT;
    });
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const results = [];
    for (const entry of index.entries) {
      const id = entry.doc.id;
      const lex = maxLexical ? (lexical.get(id) || 0) / maxLexical : 0;
      const covered = unique.reduce((sum, token, i) => sum + (entry.counts.has(token) ? weights[i] : 0), 0);
      const coverage = totalWeight ? covered / totalWeight : 0;
      let score;
      let confidence;
      if (semantic && semantic.has(id)) {
        // all-MiniLM cosine: ~0.25 is unrelated, ~0.7 is the same question reworded.
        const sem = Math.min(1, Math.max(0, (semantic.get(id) - 0.25) / 0.45));
        score = 0.45 * lex + 0.55 * sem;
        confidence = Math.max(0.9 * coverage, 0.4 * coverage + 0.6 * sem);
      } else {
        score = lex;
        // One shared word is a lead, not an answer.
        confidence = unique.length === 1 ? Math.min(coverage, 0.55) : coverage;
      }
      if (score > 0) results.push({ doc: entry.doc, score, confidence });
    }
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, options.limit || 5);
  }

  function cosine(a, b) {
    let dot = 0;
    let na = 0;
    let nb = 0;
    for (let i = 0; i < a.length; i += 1) {
      dot += a[i] * b[i];
      na += a[i] * a[i];
      nb += b[i] * b[i];
    }
    return na && nb ? dot / Math.sqrt(na * nb) : 0;
  }

  // Cheap stable hash so cached embeddings are reused only for unchanged text.
  function hashText(text) {
    let hash = 2166136261;
    const value = String(text || "");
    for (let i = 0; i < value.length; i += 1) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  return {
    normalize,
    tokens,
    stem,
    isoDate,
    parseDate,
    parseTime,
    matchCourses,
    matchPeople,
    detectSensitive,
    detectAction,
    buildIndex,
    search,
    cosine,
    hashText,
  };
});
