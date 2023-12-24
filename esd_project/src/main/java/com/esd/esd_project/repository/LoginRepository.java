package com.esd.esd_project.repository;

import com.esd.esd_project.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Login,Long> {
}
