package com.esd.esd_project.repository;

import com.esd.esd_project.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DepartmentRepository extends JpaRepository<Department,Long> {
    @Query("select count(*) as ct from Employee e where e.department.dept_id =:n ")
    public Long getAvailCap(@Param("n") Long id);
}
