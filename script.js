document.addEventListener("DOMContentLoaded", loadBugs);

function addBug() {
  let title = document.getElementById("bugTitle").value;
  let description = document.getElementById("bugDescription").value;
  let status = document.getElementById("bugStatus").value;

  if (title === "" || description === "") {
    alert("Please enter bug title and description!");
    return;
  }

  let bug = { title, description, status };
  let bugs = JSON.parse(localStorage.getItem("bugs")) || [];
  bugs.push(bug);
  localStorage.setItem("bugs", JSON.stringify(bugs));

  document.getElementById("bugTitle").value = "";
  document.getElementById("bugDescription").value = "";

  loadBugs();
}

function loadBugs() {
  let bugList = document.getElementById("bugList");
  bugList.innerHTML = "";

  let bugs = JSON.parse(localStorage.getItem("bugs")) || [];

  bugs.forEach((bug, index) => {
    let bugItem = document.createElement("div");
    bugItem.classList.add("bug");

    bugItem.innerHTML = `
            <h3>${bug.title}</h3>
            <p>${bug.description}</p>
            <p><strong>Status:</strong> ${bug.status}</p>
            <select onchange="updateStatus(${index}, this.value)">
                <option value="Pending" ${
                  bug.status === "Pending" ? "selected" : ""
                }>Pending</option>
                <option value="In Progress" ${
                  bug.status === "In Progress" ? "selected" : ""
                }>In Progress</option>
                <option value="Resolved" ${
                  bug.status === "Resolved" ? "selected" : ""
                }>Resolved</option>
            </select>
            <button class="delete-btn" onclick="deleteBug(${index})">Delete</button>
        `;

    bugList.appendChild(bugItem);
  });
}

function updateStatus(index, newStatus) {
  let bugs = JSON.parse(localStorage.getItem("bugs"));
  bugs[index].status = newStatus;
  localStorage.setItem("bugs", JSON.stringify(bugs));
  loadBugs();
}

function deleteBug(index) {
  let bugs = JSON.parse(localStorage.getItem("bugs"));
  bugs.splice(index, 1);
  localStorage.setItem("bugs", JSON.stringify(bugs));
  loadBugs();
}
