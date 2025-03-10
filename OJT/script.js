document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const noteDateInput = document.getElementById('note-date');
    const noteTextInput = document.getElementById('note-text');
    const saveNoteButton = document.getElementById('save-note');
    const notes = {};
  
    // Render calendar
    function renderCalendar() {
      const daysInMonth = new Date(2025, 3, 0).getDate(); // March 2025
      calendar.innerHTML = '';
      for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'day';
        day.textContent = i;
        day.addEventListener('click', () => toggleDone(day));
        calendar.appendChild(day);
      }
    }
  
    // Toggle "done" status
    function toggleDone(day) {
      day.classList.toggle('done');
    }
  
    // Save note
    saveNoteButton.addEventListener('click', () => {
      const date = noteDateInput.value;
      const text = noteTextInput.value;
      if (date && text) {
        notes[date] = text;
        alert('Note saved!');
        noteTextInput.value = '';
      } else {
        alert('Please select a date and enter a note.');
      }
    });
  
    renderCalendar();
  });

  fetch("https://script.google.com/macros/s/AKfycbwornPVRDPWUwpwBOaRdwD_EklmWliOJvJkMjII_89a4SG4E91-fNbKIdoTT63nrs8t2w/exec")
  .then(response => response.json())
  .then(data => console.log(data));

  fetch("https://script.google.com/macros/s/AKfycbwornPVRDPWUwpwBOaRdwD_EklmWliOJvJkMjII_89a4SG4E91-fNbKIdoTT63nrs8t2w/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "My Note", content: "This is a note from my website." })
})
.then(response => response.text())
.then(data => console.log(data));