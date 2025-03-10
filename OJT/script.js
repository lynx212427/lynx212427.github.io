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
      day.addEventListener('click', () => selectDate(day, i));
      calendar.appendChild(day);
    }
  }

  // Select date
  function selectDate(day, date) {
    // Remove selected class from all days
    document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
    // Add selected class to the clicked day
    day.classList.add('selected');
    // Set the selected date in the input field
    const year = 2025; // Hardcoded for March 2025
    const month = 3; // March
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    noteDateInput.value = formattedDate;
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




function doGet(e) {
  const selectedDate = e.parameter.date;
  const sheet = SpreadsheetApp.openById('AKfycbwornPVRDPWUwpwBOaRdwD_EklmWliOJvJkMjII_89a4SG4E91-fNbKIdoTT63nrs8t2w')
    .getSheetByName('Sheet1');
  const data = sheet.getDataRange().getValues();

  
  const matchingRows = [];
  for (let i = 1; i < data.length; i++) {
    const rowDate = data[i][0]; 
    if (rowDate === selectedDate) {
      matchingRows.push({
        date: rowDate,
        otherColumn: data[i][1] 
      });
    }
  }

  return ContentService.createTextOutput(JSON.stringify(matchingRows))
    .setMimeType(ContentService.MimeType.JSON);
}