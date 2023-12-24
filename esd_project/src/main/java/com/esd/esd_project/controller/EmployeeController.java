package com.esd.esd_project.controller;

import com.esd.esd_project.exception.EmployeeNotFoundException;
import com.esd.esd_project.model.Employee;
import com.esd.esd_project.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/employee")
    Employee newEmployee(@RequestBody Employee newEmployee){
        return employeeRepository.save(newEmployee);
    }

    @GetMapping("/employees")
    List<Employee> getAllEmployee(){
        return employeeRepository.findAll();
    }

    @GetMapping("/employee/{id}")
    Employee getEmployeeById(@PathVariable Long id){
        return employeeRepository.findById(id).orElseThrow(()-> new EmployeeNotFoundException(id));
    }

    @PutMapping("/employee/{id}")
    Employee updateEmployee(@RequestBody Employee newEmployee,@PathVariable Long id){
        return employeeRepository.findById(id).map(employee -> {
            employee.setTitle(newEmployee.getTitle());
            employee.setFirst_name(newEmployee.getFirst_name());
            employee.setLast_name(newEmployee.getLast_name());
            employee.setEmail(newEmployee.getEmail());
            employee.setPhotograph_path(newEmployee.getPhotograph_path());
            employee.setDepartment(newEmployee.getDepartment());
            return employeeRepository.save(employee);
        }).orElseThrow(()->new EmployeeNotFoundException(id));
    }

    @DeleteMapping("/employee/{id}")
    String deleteEmployee(@PathVariable Long id){
        if(!employeeRepository.existsById(id)){
            throw new EmployeeNotFoundException(id);
        }
        employeeRepository.deleteById(id);
        return "Employee removed successfully";
    }
}
