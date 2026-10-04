// Student list storage and state.
const students = [];
const form = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");
const studentCount = document.getElementById("studentCount");
const nameList = document.getElementById("nameList");
const statusMessage = document.getElementById("statusMessage");
const toggleNamesBtn = document.getElementById("toggleNamesBtn");
const removeLastBtn = document.getElementById("removeLastBtn");
const emptyState = document.getElementById("emptyState");
const namePanel = document.getElementById("namePanel");
const sampleBtn = document.getElementById("sampleBtn");

const nameInput = document.getElementById("name");
const matricInput = document.getElementById("matric");
const levelInput = document.getElementById("level");
const departmentInput = document.getElementById("department");

const nameError = document.getElementById("nameError");
const matricError = document.getElementById("matricError");
const levelError = document.getElementById("levelError");
const departmentError = document.getElementById("departmentError");

const matricPattern = /^\d{2}\/\d{9}$/;

// Small helper to clear all errors before validation.
function clearErrors() {
  nameError.textContent = "";
  matricError.textContent = "";
  levelError.textContent = "";
  departmentError.textContent = "";
}

// Validate each field and return a boolean.
function validate(student) {
  clearErrors();

  let valid = true;

  if (student.name.trim().length < 2) {
    nameError.textContent = "Name must have at least 2 characters.";
    valid = false;
  }

  if (!student.matric.trim()) {
    matricError.textContent = "Matric number is required.";
    valid = false;
  } else if (!matricPattern.test(student.matric.trim())) {
    matricError.textContent = "Use the format 23/024145123.";
    valid = false;
  } else if (matricExists(student.matric.trim())) {
    matricError.textContent = "This matric number already exists.";
    valid = false;
  }

  if (!student.level) {
    levelError.textContent = "Please choose a level.";
    valid = false;
  }

  if (student.department.trim().length < 2) {
    departmentError.textContent = "Department must have at least 2 characters.";
    valid = false;
  }

  return valid;
}

// Check if matric number already exists.
function matricExists(matricNumber) {
  for (let i = 0; i < students.length; i += 1) {
    if (students[i].matric === matricNumber) {
      return true;
    }
  }
  return false;
}

// Add a student to the list if validation passes.
function addStudent(student) {
  const cleanStudent = {
    name: student.name.trim(),
    matric: student.matric.trim(),
    level: student.level,
    department: student.department.trim()
  };

  if (!validate(cleanStudent)) {
    return false;
  }

  students.push(cleanStudent);
  statusMessage.textContent = "Student added: " + cleanStudent.name;
  form.reset();
  render();
  return true;
}

// Remove the most recent student using array.pop().
function removeLast() {
  if (students.length === 0) {
    statusMessage.textContent = "There is no student to remove.";
    return;
  }

  const removedStudent = students.pop();
  statusMessage.textContent = "Removed last student: " + removedStudent.name;
  render();
}

// Render the table and other UI states.
function render() {
  studentCount.textContent = String(students.length);

  removeLastBtn.disabled = students.length === 0;

  if (students.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  // Clear previous rows.
  studentTableBody.innerHTML = "";

  for (let i = 0; i < students.length; i += 1) {
    const row = document.createElement("tr");

    if (i === students.length - 1) {
      row.classList.add("last-added");
    }

    const numberCell = document.createElement("td");
    numberCell.textContent = String(i + 1);

    const nameCell = document.createElement("td");
    nameCell.textContent = students[i].name;

    const matricCell = document.createElement("td");
    matricCell.textContent = students[i].matric;
    matricCell.classList.add("matric-cell");

    const levelCell = document.createElement("td");
    levelCell.textContent = students[i].level + " Level";

    const departmentCell = document.createElement("td");
    departmentCell.textContent = students[i].department;

    if (i === students.length - 1) {
      const tag = document.createElement("span");
      tag.textContent = "Last added";
      tag.classList.add("last-tag");
      nameCell.appendChild(tag);
    }

    row.appendChild(numberCell);
    row.appendChild(nameCell);
    row.appendChild(matricCell);
    row.appendChild(levelCell);
    row.appendChild(departmentCell);

    studentTableBody.appendChild(row);
  }

  // Update names panel.
  nameList.innerHTML = "";
  if (students.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "No students added yet.";
    nameList.appendChild(emptyItem);
  } else {
    for (let i = 0; i < students.length; i += 1) {
      const item = document.createElement("li");
      item.textContent = students[i].name;
      nameList.appendChild(item);
    }
  }
}

// Add sample students exactly as requested.
function addSampleStudents() {
  const sample = [
    { name: "Effa Divine", matric: "23/024145123", level: "300", department: "Computer Science" },
    { name: "Bassey Joy", matric: "23/024145124", level: "300", department: "Accounting" },
    { name: "Ikechukwu Emeka", matric: "23/024145125", level: "300", department: "Mass Communication" }
  ];

  for (let i = 0; i < sample.length; i += 1) {
    if (!matricExists(sample[i].matric)) {
      students.push(sample[i]);
    }
  }

  statusMessage.textContent = "Sample students added.";
  render();
}

// Pressing Add student collects the form values.
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const student = {
    name: nameInput.value,
    matric: matricInput.value,
    level: levelInput.value,
    department: departmentInput.value
  };

  addStudent(student);
});

// Toggle list of names.
toggleNamesBtn.addEventListener("click", function () {
  namePanel.classList.toggle("hidden");
  const isHidden = namePanel.classList.contains("hidden");
  toggleNamesBtn.textContent = isHidden ? "Done, show names" : "Hide names";
  if (!isHidden) {
    render();
  }
});

// Remove last student.
removeLastBtn.addEventListener("click", function () {
  removeLast();
});

// Add sample students from empty state.
sampleBtn.addEventListener("click", function () {
  addSampleStudents();
});

// Initial render at page load.
render();
