package com.esd.esd_project.controller;

import com.esd.esd_project.model.Department;
import com.esd.esd_project.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.tags.Param;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class DepartmentController {
    @Autowired
    private DepartmentRepository departmentRepository;

    @PostMapping("/dept")
    Department newDept(@RequestBody Department newDept){
        return departmentRepository.save(newDept);
    }

    @GetMapping("/depts")
    List<Department> getAllDept(){
        return departmentRepository.findAll();
    }

    @GetMapping("/deptcap/{id}")
    Long getAvail(@PathVariable Long id){
        return departmentRepository.getAvailCap(id);
    }
}
