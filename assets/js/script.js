let students = [];

const grIdInput = document.getElementById("grid");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const phoneInput = document.getElementById("contactno");
const courseSelect = document.getElementById("course");
const stuInfo = document.getElementById("stuinfo");

function addStudent() {
    const grid = grIdInput.value.trim();
    const name = nameInput.value.trim();
    const age = ageInput.value.trim();
    const phone = phoneInput.value.trim();
    const course = courseSelect.value;

    if (!grid || !name || !age || !phone || course === "-1") {
        alert("Please fill all the fields correctly.");
        return;
    }

    const student = {
        grid,
        name,
        age,
        phone,
        course
    };

    students.push(student);

    // Clear inputs
    grIdInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    phoneInput.value = "";
    courseSelect.value = "-1";

    renderStudents();
}

function deleteStudent(grid) {
    const student = students.find(s => s.grid === grid);
    if (confirm(`Are you sure you want to delete GR ID ${student.grid} (${student.name})?`)) {
        students = students.filter(student => student.grid !== grid);
        renderStudents();
    }
}

function getCourseClass(course) {
    switch (course) {
        case 'FSD': return 'course-fsd';
        case 'UI/UX': return 'course-uiux';
        case 'AI/ML': return 'course-aiml';
        default: return '';
    }
}

function renderStudents() {
    if (students.length === 0) {
        stuInfo.innerHTML = `
          <div class="empty-message">
            <i class="fas fa-users"></i>
            <h5>No students added yet</h5>
            <p class="mb-0">Add your first student using the form above.</p>
          </div>
        `;
        return;
    }

    let html = `
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th><i class="fas fa-id-card me-2"></i>GR ID</th>
              <th><i class="fas fa-user me-2"></i>Name</th>
              <th><i class="fas fa-calendar me-2"></i>Age</th>
              <th><i class="fas fa-phone me-2"></i>Phone</th>
              <th><i class="fas fa-book me-2"></i>Course</th>
              <th><i class="fas fa-cog me-2"></i>Action</th>
            </tr>
          </thead>
          <tbody>
      `;

    students.forEach(student => {
        html += `
          <tr>
            <td><span class="student-id">#${student.grid}</span></td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.phone}</td>
            <td>
              <span class="course-badge ${getCourseClass(student.course)}">
                ${student.course}
              </span>
            </td>
            <td>
              <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student.grid}')">
                <i class="fas fa-trash me-1"></i>Delete
              </button>
            </td>
          </tr>
        `;
    });

    html += `</tbody></table>`;
    stuInfo.innerHTML = html;
}

renderStudents();