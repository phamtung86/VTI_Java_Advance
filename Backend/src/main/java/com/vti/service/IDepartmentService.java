package com.vti.service;

import com.vti.dto.DepartmentDTO;
import com.vti.form.DepartmentFilterForm;
import com.vti.form.department.CreatingDepartmentForm;
import com.vti.form.department.UpdatingDepartmentForm;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Set;

public interface IDepartmentService {
    void createDepartment(CreatingDepartmentForm form);

    void updateDepartment(UpdatingDepartmentForm form);

    void deleteDepartment(int id);

    DepartmentDTO departmentFindById(int id);
    // specication
    Page<DepartmentDTO> getDepartments(Pageable pageable, String name, DepartmentFilterForm departmentFilterForm, String type);

    List<DepartmentDTO> getListDepartments();

    boolean isDepartmentExistsByID(Integer id);

    int getCountIdForDelete(Set<Integer> ids);

    boolean isDepartmentExistsByName(String name);
}
