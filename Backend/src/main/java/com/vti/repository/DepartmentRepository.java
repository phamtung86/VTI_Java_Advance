package com.vti.repository;

import com.vti.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Integer> , JpaSpecificationExecutor<Department> {

    boolean existsByName(String name);
    @Query("SELECT COUNT(*) FROM Department WHERE id IN(:ids)")
    int getCountIdForDelete(@Param ("ids") Set<Integer> ids);
}
