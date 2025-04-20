package com.mukul.studentsystem.service;

import com.mukul.studentsystem.model.Student;

import java.util.List;

public interface StudentService {
    Student saveStudent(Student student);
    List<Student> getAllStudents();
    Student getStudentById(int id);
    Student updateStudent(int id, Student student);
    void deleteStudent(int id);
}
