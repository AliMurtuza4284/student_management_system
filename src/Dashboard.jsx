import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [students, setStudents] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("students") || "[]");
    } catch {
      return [];
    }
  });

  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [search, setSearch] = useState("");
  const [editRollNo, setEditRollNo] = useState(null);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  function clearForm() {
    setRollNo("");
    setName("");
    setPhone("");
    setEmail("");
    setCourse("");
    setEditRollNo(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const student = {
      rollNo: rollNo.trim(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      course,
    };

    if (editRollNo === null) {
      const exists = students.some(
        (s) => s.rollNo.toLowerCase() === student.rollNo.toLowerCase()
      );

      if (exists) {
        alert("This roll number already exists.");
        return;
      }

      setStudents((previous) => [...previous, student]);
      alert("Student added successfully!");
    } else {
      setStudents((previous) =>
        previous.map((s) =>
          s.rollNo === editRollNo ? student : s
        )
      );
      alert("Student updated successfully!");
    }

    clearForm();
  }

  function handleEdit(student) {
    setRollNo(student.rollNo);
    setName(student.name);
    setPhone(student.phone);
    setEmail(student.email);
    setCourse(student.course);
    setEditRollNo(student.rollNo);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents((previous) =>
        previous.filter((s) => s.rollNo !== id)
      );

      if (editRollNo === id) {
        clearForm();
      }
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("studentLoggedIn");
    navigate("/");
  }

  const filteredStudents = students.filter((student) =>
    `${student.rollNo || ""} ${student.name || ""} ${student.phone || ""} ${student.email || ""} ${student.course || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-page">
      <header className="dashboard-nav">
        <div className="brand">
          <div className="brand-icon">🎓</div>
          <div>
            <h2>Student Portal</h2>
            <p>Student Management System</p>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout ↗
        </button>
      </header>

      <main className="dashboard-content">
        <section className="welcome-section">
          <div>
            <p className="welcome-label">YOUR DASHBOARD</p>
            <h1>Manage Your Students</h1>
            <p className="welcome-text">
              Everything you need to manage student records in one place.
            </p>
          </div>
          <div className="welcome-icon">📚</div>
        </section>

        <section className="summary-card">
          <div className="summary-icon">👥</div>
          <div>
            <p>Total Students</p>
            <h2>{students.length}</h2>
          </div>
        </section>

        <section className="dashboard-card">
          <div className="section-heading">
            <div>
              <h2>{editRollNo === null ? "Add New Student" : "Edit Student"}</h2>
              <p>Fill in the details below.</p>
            </div>
            <span className="heading-icon">✏️</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Roll Number</label>
                <input
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  placeholder="Enter roll number"
                  disabled={editRollNo !== null}
                  required
                />
              </div>

              <div className="form-group">
                <label>Student Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter student name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit phone number"
                  pattern="[0-9]{10}"
                  title="Enter a 10-digit phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter student email"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Choose Course</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                >
                  <option value="">Select a course</option>
                  <option value="Python Full Stack">Python Full Stack</option>
                  <option value="Java Full Stack">Java Full Stack</option>
                  <option value="Web Development">Web Development</option>
                  <option value="React JS">React JS</option>
                  <option value="SQL">SQL</option>
                  <option value="Data Science">Data Science</option>
                </select>
              </div>
            </div>

            <div className="form-buttons">
              <button className="save-btn" type="submit">
                {editRollNo === null ? "+ Add Student" : "✓ Update Student"}
              </button>

              {editRollNo !== null && (
                <button className="cancel-btn" type="button" onClick={clearForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="dashboard-card">
          <div className="section-heading">
            <div>
              <h2>Student Details</h2>
              <p>Search and manage registered students.</p>
            </div>
            <span className="student-count">{students.length} Students</span>
          </div>

          <input
            className="search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by roll number, name, phone, email or course..."
          />

          <div className="table-container">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Roll No.</th>
                  <th>Student Name</th>
                  <th>Phone Number</th>
                  <th>Email Address</th>
                  <th>Course</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.rollNo}>
                    <td>{student.rollNo}</td>
                    <td>{student.name}</td>
                    <td>{student.phone || "-"}</td>
                    <td>{student.email}</td>
                    <td>
                      <span className="course-badge">
                        {student.course || "-"}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <button
                        className="edit-btn"
                        type="button"
                        onClick={() => handleEdit(student)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        type="button"
                        onClick={() => handleDelete(student.rollNo)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty-message">
                      No students found. Add your first student!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="dashboard-footer">
          Student Management System · Built with React
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;