const tableBody = document.querySelector("#itineraryTable tbody");
const addButton = document.getElementById("addDay");
const startDateInput = document.getElementById("startDate");

// Load from local storage on page load
window.onload = () => {
  const saved = localStorage.getItem("tasmaniaItinerary");
  if (saved) {
    const rows = JSON.parse(saved);
    rows.forEach(addRow);
  }
};

addButton.onclick = () => addRow();

document.getElementById("save").onclick = () => {
  const data = [];
  const rows = tableBody.querySelectorAll("tr");
  rows.forEach(row => {
    const inputs = row.querySelectorAll("input, textarea");
    data.push(Array.from(inputs).map(i => i.value));
  });
  localStorage.setItem("tasmaniaItinerary", JSON.stringify(data));
  alert("Saved!");
};

document.getElementById("clear").onclick = () => {
  if (confirm("Clear the whole itinerary?")) {
    localStorage.removeItem("tasmaniaItinerary");
    tableBody.innerHTML = "";
  }
};

startDateInput.onchange = updateDates;

function addRow(data = ["", "", "", "", ""]) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td class="dayNum"></td>
    <td><input type="text" class="date" disabled></td>
    <td><input value="${data[2] || ""}" /></td>
    <td><input value="${data[3] || ""}" /></td>
    <td><textarea>${data[4] || ""}</textarea></td>
    <td><button onclick="this.parentElement.parentElement.remove(); updateDates();">❌</button></td>
  `;
  tableBody.appendChild(row);
  updateDates();
}

function updateDates() {
  const start = new Date(startDateInput.value);
  const rows = tableBody.querySelectorAll("tr");
  rows.forEach((row, i) => {
    row.querySelector(".dayNum").textContent = "Day " + (i + 1);
    const dateCell = row.querySelector(".date");
    if (!isNaN(start)) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dateCell.value = date.toISOString().split("T")[0];
    } else {
      dateCell.value = "";
    }
  });
}
