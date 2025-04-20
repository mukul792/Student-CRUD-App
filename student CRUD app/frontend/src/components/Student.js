import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Paper, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Student() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track edit mode
  const classes = useStyles();

  const fetchStudents = () => {
    fetch("http://localhost:8080/students/getAll")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const student = { name, address };

    // If editing
    if (editingId !== null) {
      fetch(`http://localhost:8080/students/update/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      })
        .then(() => {
          console.log("Student updated");
          setEditingId(null);
          setName("");
          setAddress("");
          fetchStudents();
        })
        .catch((err) => console.error("Update error:", err));
    } else {
      // Else, create new
      fetch("http://localhost:8080/students/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      })
        .then(() => {
          console.log("New Student added");
          setName("");
          setAddress("");
          fetchStudents();
        })
        .catch((err) => console.error("Post error:", err));
    }
  };

  const handleEdit = (student) => {
    setName(student.name);
    setAddress(student.address);
    setEditingId(student.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      fetch(`http://localhost:8080/students/delete/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          console.log("Student deleted");
          fetchStudents();
        })
        .catch((err) => console.error("Delete error:", err));
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}>
          <u>{editingId ? "Edit Student" : "Add Student"}</u>
        </h1>

        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Student Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button
            variant="contained"
            color={editingId ? "primary" : "secondary"}
            onClick={handleSubmit}
          >
            {editingId ? "Update" : "Submit"}
          </Button>
        </form>
      </Paper>

      <h1>Students</h1>

      <Paper elevation={3} style={paperStyle}>
        {students.map((student) => (
          <Paper
            elevation={6}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
            key={student.id}
          >
            <strong>Id:</strong> {student.id} <br />
            <strong>Name:</strong> {student.name} <br />
            <strong>Address:</strong> {student.address} <br />
            <div style={{ marginTop: "10px" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(student)}
                style={{ marginRight: "10px" }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(student.id)}
              >
                Delete
              </Button>
            </div>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
