package com.esd.esd_project.controller;

import com.esd.esd_project.model.Login;
import com.esd.esd_project.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class LoginController {
    @Autowired
    private LoginRepository loginRepository;

    @PostMapping("/logins")
    Login newLogin(@RequestBody Login newLogin){return loginRepository.save(newLogin);}

    @GetMapping("/login")
    List<Login> getAllLogin(){return loginRepository.findAll();}
}
