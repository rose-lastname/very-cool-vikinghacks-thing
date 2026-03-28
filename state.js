// ═══════════════════════════════════════════════════════
//  state.js — shared application state & utilities
// ═══════════════════════════════════════════════════════
//const courses = JSON.parse(localStorage.getItem('courses') || '[]');
//const origCourses = JSON.parse(localStorage.getItem('origCourses') || '[]');

function loadAssignmentsFromStorage() {
  const data = localStorage.getItem('assignments');
  return data ? JSON.parse(data) : [];
}

export function uid() {
  return 'id' + Math.random().toString(36).slice(2, 9);
}

export function today() {
  return new Date();
}

export function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

export function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}

//changed area i believe
// ── Assignments ──────────────────────────────────────────
export let assignments = [
  { id: uid(), title: localStorage.getItem('assignmentTitle'),  course: localStorage.getItem('assignmentCourse'), dueOffset:  parseInt(localStorage.getItem('assignmentDueOffset')), pts: parseInt(localStorage.getItem('assignmentPoints')),  type: localStorage.getItem('assignmentType'), done: (stringToBoolean(localStorage.getItem('assignmentDone'))) },
  { id: uid(), title: localStorage.getItem('assignmentTitle') , course: localStorage.getItem('assignmentCourse'),  dueOffset:  parseInt(localStorage.getItem('assignmentDueOffset')), pts: parseInt(localStorage.getItem('assignmentPoints')), type: localStorage.getItem('assignmentType'), done: (stringToBoolean(localStorage.getItem('assignmentDone'))) },
  { id: uid(), title: localStorage.getItem('assignmentTitle') , course: localStorage.getItem('assignmentCourse'),  dueOffset:  parseInt(localStorage.getItem('assignmentDueOffset')), pts: parseInt(localStorage.getItem('assignmentPoints')), type: localStorage.getItem('assignmentType'), done: (stringToBoolean(localStorage.getItem('assignmentDone'))) },
  { id: uid(), title: localStorage.getItem('assignmentTitle') , course: localStorage.getItem('assignmentCourse'),  dueOffset:  parseInt(localStorage.getItem('assignmentDueOffset')), pts: parseInt(localStorage.getItem('assignmentPoints')), type: localStorage.getItem('assignmentType'), done: (stringToBoolean(localStorage.getItem('assignmentDone'))) },
  { id: uid(), title: localStorage.getItem('assignmentTitle') , course: localStorage.getItem('assignmentCourse'),  dueOffset:  parseInt(localStorage.getItem('assignmentDueOffset')), pts: parseInt(localStorage.getItem('assignmentPoints')), type: localStorage.getItem('assignmentType'), done: (stringToBoolean(localStorage.getItem('assignmentDone'))) }
];

export function addAssignment(a) { assignments.push(a); }
export function toggleAssignment(id) {
  const a = assignments.find(a => a.id === id);
  if (a) a.done = !a.done;
}

export function assignDueDate(a) {
  const d = new Date();
  d.setDate(d.getDate() + a.dueOffset);
  return d;
}

export function dueDayStr(a) {
  const diff = a.dueOffset;
  const d = assignDueDate(a);
  if (diff < 0)  return { label: 'Overdue',                                                         cls: 'overdue' };
  if (diff === 0) return { label: 'Due Today',                                                       cls: 'today'   };
  if (diff <= 2)  return { label: `Due in ${diff}d`,                                                 cls: 'soon'    };
  return           { label: `Due ${d.toLocaleDateString('en-US',{month:'short',day:'numeric'})}`,   cls: 'later'   };
}

// ── To-Dos ───────────────────────────────────────────────
export let todos = [
  { id: uid(), text: 'Review calculus derivatives',    done: false, priority: 'high'   },
  { id: uid(), text: 'Email Mr. Chen about retake',    done: false, priority: 'normal' },
  { id: uid(), text: 'Print AP exam schedule',         done: true,  priority: 'low'    },
];

export function addTodo(text, priority = 'normal') {
  todos.push({ id: uid(), text, done: false, priority });
}
export function toggleTodo(id) {
  const t = todos.find(t => t.id === id);
  if (t) t.done = !t.done;
}
export function deleteTodo(id) {
  const i = todos.findIndex(t => t.id === id);
  if (i !== -1) todos.splice(i, 1);
}

// ── Calendar Events ──────────────────────────────────────
export let calEvents = [];

export function addCalEvent(e) { calEvents.push(e); }

// ── Resources ────────────────────────────────────────────
export let resources = [
  { id: uid(), name: 'AP Calc Formula Sheet',  icon: '📄', folder: 'AP Classes', modified: '2 days ago',  url: '' },
  { id: uid(), name: 'APUSH Timeline 1800s',   icon: '📊', folder: 'AP Classes', modified: '5 days ago',  url: '' },
  { id: uid(), name: 'Chemistry Lab Notes',    icon: '📝', folder: 'Notes',      modified: '1 day ago',   url: '' },
  { id: uid(), name: 'Spanish Vocab Deck',     icon: '📋', folder: 'AP Classes', modified: '3 days ago',  url: '' },
  { id: uid(), name: 'Campbell Biology 11e',   icon: '📚', folder: 'Textbooks',  modified: '1 week ago',  url: '' },
  { id: uid(), name: '2022 AP Calc FRQ',       icon: '📄', folder: 'Practice',   modified: '4 days ago',  url: '' },
  { id: uid(), name: 'APUSH Practice Exam',    icon: '📄', folder: 'Practice',   modified: '2 weeks ago', url: '' },
  { id: uid(), name: "Barron's AP Chemistry",  icon: '📚', folder: 'Textbooks',  modified: '1 week ago',  url: '' },
];

export function addResource(r) { resources.push(r); }

// ── Courses (GradeIf) ────────────────────────────────────
export let courses = [];
export let origCourses = [];

///changed area
export function seedCourses() {
  courses = [
    {
      id: uid(), name: localStorage.getItem('courseName'), teacher: localStorage.getItem('courseTeacher'), color: '#60b4f0',
      categories: [
        { name: localStorage.getItem('categoryName'),    weight: parseInt(localStorage.getItem('categoryWeight')), assignments: [
          { id: uid(), title: localStorage.getItem('assignmentTitle'), score: parseInt(localStorage.getItem('assignmentScore')), maxScore: parseInt(localStorage.getItem('assignmentMaxScore')), isWhatIf: (stringToBoolean(localStorage.getItem('assignmentIsWhatIf'))) },
          { id: uid(), title: localStorage.getItem('assignmentTitle'), score: parseInt(localStorage.getItem('assignmentScore')), maxScore: parseInt(localStorage.getItem('assignmentMaxScore')), isWhatIf: (stringToBoolean(localStorage.getItem('assignmentIsWhatIf'))) },
        ]},
        { name: localStorage.getItem('categoryName'), weight: parseInt(localStorage.getItem('categoryWeight')), assignments: [
          { id: uid(), title: localStorage.getItem('assignmentTitle'), score: parseInt(localStorage.getItem('assignmentScore')), maxScore: parseInt(localStorage.getItem('assignmentMaxScore')), isWhatIf: (stringToBoolean(localStorage.getItem('assignmentIsWhatIf'))) },
          { id: uid(), title: localStorage.getItem('assignmentTitle'), score: parseInt(localStorage.getItem('assignmentScore')), maxScore: parseInt(localStorage.getItem('assignmentMaxScore')), isWhatIf: (stringToBoolean(localStorage.getItem('assignmentIsWhatIf'))) },
        ]},
        { name: localStorage.getItem('categoryName'), weight: parseInt(localStorage.getItem('categoryWeight')), assignments: [
          {  id: uid(), title: localStorage.getItem('assignmentTitle'), score: parseInt(localStorage.getItem('assignmentScore')), maxScore: parseInt(localStorage.getItem('assignmentMaxScore')), isWhatIf: (stringToBoolean(localStorage.getItem('assignmentIsWhatIf'))) }
        ]},
      ],
    },
    {
      id: uid(), name: localStorage.getItem('courseName'), teacher: localStorage.getItem('courseTeacher'), color: '#f0c060',
      categories: [
        { name: localStorage.getItem('categoryName'),  weight: parseInt(localStorage.getItem('categoryWeight')), assignments: [
          { id: uid(), title: localStorage.getItem('assignmentTitle'), score: parseInt(localStorage.getItem('assignmentScore')), maxScore: parseInt(localStorage.getItem('assignmentMaxScore')), isWhatIf: (stringToBoolean(localStorage.getItem('assignmentIsWhatIf'))) },
        ]},
        { name: localStorage.getItem('categoryName'),   weight: parseInt(localStorage.getItem('categoryWeight')), assignments: [
          { id: uid(), title: localStorage.getItem('assignmentTitle'), score: parseInt(localStorage.getItem('assignmentScore')), maxScore: parseInt(localStorage.getItem('assignmentMaxScore')), isWhatIf: (stringToBoolean(localStorage.getItem('assignmentIsWhatIf'))) },
          { id: uid(), title: localStorage.getItem('assignmentTitle'), score: parseInt(localStorage.getItem('assignmentScore')), maxScore: parseInt(localStorage.getItem('assignmentMaxScore')), isWhatIf: (stringToBoolean(localStorage.getItem('assignmentIsWhatIf'))) },
        ]},
        { name: localStorage.getItem('categoryName'), weight: parseInt(localStorage.getItem('categoryWeight')), assignments: [
          { id: uid(), title: localStorage.getItem('assignmentTitle'), score: parseInt(localStorage.getItem('assignmentScore')), maxScore: parseInt(localStorage.getItem('assignmentMaxScore')), isWhatIf: (stringToBoolean(localStorage.getItem('assignmentIsWhatIf'))) },
        ]},
      ],
    },
    {
      id: uid(), name: localStorage.getItem('courseName'), teacher: localStorage.getItem('courseTeacher'), color: '#60f0a0',
      categories: [
        { name: localStorage.getItem('categoryName'),     weight: parseInt(localStorage.getItem('categoryWeight')), assignments: [
          { id: uid(), title: localStorage.getItem('assignmentTitle'), score: parseInt(localStorage.getItem('assignmentScore')), maxScore: parseInt(localStorage.getItem('assignmentMaxScore')), isWhatIf: (stringToBoolean(localStorage.getItem('assignmentIsWhatIf'))) },
          { id: uid(), title: localStorage.getItem('assignmentTitle'), score: parseInt(localStorage.getItem('assignmentScore')), maxScore: parseInt(localStorage.getItem('assignmentMaxScore')), isWhatIf: (stringToBoolean(localStorage.getItem('assignmentIsWhatIf'))) },
        ]},
        { name: localStorage.getItem('categoryName'),    weight: parseInt(localStorage.getItem('categoryWeight')), assignments: [
          { id: uid(), title: localStorage.getItem('assignmentTitle'), score: parseInt(localStorage.getItem('assignmentScore')), maxScore: parseInt(localStorage.getItem('assignmentMaxScore')), isWhatIf: (stringToBoolean(localStorage.getItem('assignmentIsWhatIf'))) },
        ]},
        { name: localStorage.getItem('categoryName'), weight: parseInt(localStorage.getItem('categoryWeight')), assignments: [
          { id: uid(), title: localStorage.getItem('assignmentTitle'), score: parseInt(localStorage.getItem('assignmentScore')), maxScore: parseInt(localStorage.getItem('assignmentMaxScore')), isWhatIf: (stringToBoolean(localStorage.getItem('assignmentIsWhatIf'))) },
        ]},
      ],
    },
    {
      id: uid(), name: localStorage.getItem('courseName'), teacher: localStorage.getItem('courseTeacher'), color: '#b088f0',
      categories: [
        { name: localStorage.getItem('categoryName'),      weight: parseInt(localStorage.getItem('categoryWeight')), assignments: [
          { id: uid(), title: localStorage.getItem('assignmentTitle'), score: parseInt(localStorage.getItem('assignmentScore')), maxScore: parseInt(localStorage.getItem('assignmentMaxScore')), isWhatIf: (stringToBoolean(localStorage.getItem('assignmentIsWhatIf'))) }
        ]},
        { name: localStorage.getItem('categoryName'),       weight: parseInt(localStorage.getItem('categoryWeight')), assignments: [
          { id: uid(), title: localStorage.getItem('assignmentTitle'), score: parseInt(localStorage.getItem('assignmentScore')), maxScore: parseInt(localStorage.getItem('assignmentMaxScore')), isWhatIf: (stringToBoolean(localStorage.getItem('assignmentIsWhatIf'))) },
        ]},
        { name: localStorage.getItem('categoryName'), weight: parseInt(localStorage.getItem('categoryWeight')), assignments: [
          { id: uid(), title: localStorage.getItem('assignmentTitle'), score: parseInt(localStorage.getItem('assignmentScore')), maxScore: parseInt(localStorage.getItem('assignmentMaxScore')), isWhatIf: (stringToBoolean(localStorage.getItem('assignmentIsWhatIf'))) },
          { id: uid(), title: localStorage.getItem('assignmentTitle'), score: parseInt(localStorage.getItem('assignmentScore')), maxScore: parseInt(localStorage.getItem('assignmentMaxScore')), isWhatIf: (stringToBoolean(localStorage.getItem('assignmentIsWhatIf'))) },
        ]},
      ],
    },
  ];
  origCourses = JSON.parse(JSON.stringify(courses));
}

// changes end here

export function pushCourse(course) {
  courses.push(course);
  origCourses.push(JSON.parse(JSON.stringify(course)));
}

export function resetAllCourses() {
  // wipe what-if mutations
  courses.forEach((c, i) => {
    const orig = origCourses[i];
    if (orig && orig.id === c.id) {
      c.categories = JSON.parse(JSON.stringify(orig.categories));
    }
  });
  localStorage.setItem('courses', JSON.stringify(courses));
  localStorage.setItem('origCourses', JSON.stringify(origCourses));
}
