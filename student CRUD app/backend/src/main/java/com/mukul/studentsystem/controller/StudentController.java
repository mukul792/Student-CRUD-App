package com.mukul.studentsystem.controller;

import com.mukul.studentsystem.model.Student;
import com.mukul.studentsystem.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:3000")

public class StudentController {

    @Autowired
    private StudentService studentService;

    // Create
    @PostMapping("/add")
    public String add(@RequestBody Student student) {
        studentService.saveStudent(student);
        return "New student is added";
    }
    // Read all
    @GetMapping("/getAll")
    public List<Student> list() {
        return studentService.getAllStudents();
    }

    // Read by ID
    @GetMapping("/{id}")
    public Student getStudent(@PathVariable int id) {
        return studentService.getStudentById(id);
    }

    // Update
    @PutMapping("/update/{id}")
    public String update(@PathVariable int id, @RequestBody Student student) {
        studentService.updateStudent(id, student);
        return "Student updated successfully";
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable int id) {
        studentService.deleteStudent(id);
        return "Student deleted successfully";
    }
}
