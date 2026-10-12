// Booking flow: course, then date, then details.
// PLACEHOLDER DATA: courses and dates will come from the booking backend.

const COURSES = [
  {
    id: 'try-freediving',
    name: 'Try Freediving',
    info: 'Dive tower, Berlin. €89 per person.',
    sessions: [
      { date: '2026-11-14', time: '10:00 to 13:00', spots: 4 },
      { date: '2026-11-28', time: '10:00 to 13:00', spots: 0 },
      { date: '2026-12-12', time: '10:00 to 13:00', spots: 6 },
      { date: '2027-01-16', time: '10:00 to 13:00', spots: 6 },
    ],
  },
  {
    id: 'summer-training',
    name: 'Summer advanced training',
    info: 'Open water. €45 per session.',
    sessions: [
      { date: '2027-06-05', time: '09:00 to 13:00', spots: 5 },
      { date: '2027-06-19', time: '09:00 to 13:00', spots: 8 },
      { date: '2027-07-03', time: '09:00 to 13:00', spots: 8 },
    ],
  },
  {
    id: 'deepspot',
    name: 'Deepspot winter seminars',
    info: 'Deepspot, Poland. €320 per person.',
    sessions: [
      { date: '2026-12-05', time: 'Full weekend', spots: 2 },
      { date: '2027-01-23', time: 'Full weekend', spots: 6 },
      { date: '2027-02-20', time: 'Full weekend', spots: 6 },
    ],
  },
];

const booking = document.getElementById('booking');
const bkForm = document.getElementById('bk-form');
const bkTitle = document.getElementById('bk-title');
const bkStep = document.getElementById('bk-step');
const steps = ['course', 'date', 'details'];

let course = null;
let session = null;

const longDate = (iso) => new Date(iso + 'T00:00').toLocaleDateString('en-GB', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
});

function show(step) {
  booking.querySelectorAll('[data-step]').forEach((pane) => { pane.hidden = pane.dataset.step !== step; });
  bkStep.textContent = step === 'done' ? '' : `Step ${steps.indexOf(step) + 1} of 3`;
  bkTitle.textContent = {
    course: 'Book a course',
    date: course && course.name,
    details: 'Your details',
    done: 'Booking confirmed',
  }[step];
  bkTitle.focus();
}

function showDates() {
  document.getElementById('bk-course-summary').textContent = course.info;
  document.getElementById('bk-dates').innerHTML = course.sessions.map((s, i) => `
    <button class="option" type="button" data-session="${i}" ${s.spots ? '' : 'disabled'}>
      <span><strong>${longDate(s.date)}</strong><br>${s.time}</span>
      <small>${s.spots ? `${s.spots} places left` : 'Fully booked'}</small>
    </button>`).join('');
  show('date');
}

document.getElementById('bk-courses').innerHTML = COURSES.map((c) => `
  <button class="option" type="button" data-course="${c.id}">
    <span><strong>${c.name}</strong><br>${c.info}</span>
  </button>`).join('');

// Open from any "Book" button; a course button skips straight to its dates.
document.querySelectorAll('[data-book]').forEach((button) => {
  button.addEventListener('click', () => {
    bkForm.reset();
    course = COURSES.find((c) => c.id === button.dataset.book) || null;
    booking.showModal();
    if (course) showDates(); else show('course');
  });
});

booking.addEventListener('click', (event) => {
  const target = event.target.closest('[data-course], [data-session], [data-back]');
  if (!target) return;

  if (target.dataset.course) {
    course = COURSES.find((c) => c.id === target.dataset.course);
    showDates();
  } else if (target.dataset.session) {
    session = course.sessions[target.dataset.session];
    document.getElementById('bk-session-summary').textContent =
      `${course.name}, ${longDate(session.date)}, ${session.time}.`;
    show('details');
  } else if (target.dataset.back === 'date') {
    showDates();
  } else {
    show('course');
  }
});

bkForm.addEventListener('submit', (event) => {
  event.preventDefault();
  document.getElementById('bk-done-summary').textContent =
    `${course.name}, ${longDate(session.date)}, ${session.time}.`;
  document.getElementById('bk-done-email').textContent = bkForm.elements.email.value;
  show('done');
});
