package com.vti.controller;

import com.vti.dto.DepartmentDTO;
import com.vti.dto.TypeDTO;
import com.vti.form.DepartmentFilterForm;
import com.vti.form.department.CreatingDepartmentForm;
import com.vti.form.department.UpdatingDepartmentForm;
import com.vti.service.IDepartmentService;
import com.vti.validation.department.DepartmentIDExists;
import com.vti.entity.Department;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/departments")
@Validated
public class DepartmentController {
    @Autowired
    private IDepartmentService departmentService;
    @Autowired
    private ModelMapper modelMapper;

    @PostMapping
    public void CreateDepartment(@RequestBody @Valid CreatingDepartmentForm form) {
        departmentService.createDepartment(form);
    }
    @PutMapping(value = "/{id}")
    public void updateDepartment(@DepartmentIDExists @PathVariable(name = "id") int id,
                                 @RequestBody UpdatingDepartmentForm form) {
        form.setId(id);
         departmentService.updateDepartment(form);
    }
    @DeleteMapping("/id/{id}")
    public void deleteDepartment(@PathVariable(value = "id") int id) {
        departmentService.deleteDepartment(id);
    }
    @GetMapping
    public Page<DepartmentDTO> getDepartmentByName(Pageable pageable,
                                                   @RequestParam(value = "name", required = false) String name,
                                                   DepartmentFilterForm departmentFilterForm,
                                                   @RequestParam (value = "type", required = false) String type) {
        return departmentService.getDepartments(pageable,name,departmentFilterForm,type);
    }
    @GetMapping("/{id}")
    public DepartmentDTO getDepartmentById(@PathVariable int id) {
        return departmentService.departmentFindById(id);
    }
    @GetMapping("/list")
    public List<DepartmentDTO> getDepartmentList() {
        return departmentService.getListDepartments();
    }

}

