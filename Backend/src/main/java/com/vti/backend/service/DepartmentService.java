package com.vti.backend.service;

import com.vti.backend.dto.DepartmentDTO;
import com.vti.backend.form.DepartmentFilterForm;
import com.vti.backend.form.department.CreatingDepartmentForm;
import com.vti.backend.form.department.UpdatingDepartmentForm;
import com.vti.backend.repository.AccountRepository;
import com.vti.backend.repository.DepartmentRepository;
import com.vti.backend.specification.DepartmentSpecification;
import com.vti.entity.Account;
import com.vti.entity.Department;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class DepartmentService implements IDepartmentService {
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    @Transactional
    public void createDepartment(CreatingDepartmentForm form) {
        // convert form to entity
        Department departmentEntity = modelMapper.map(form, Department.class);

        // get total Member
        int totalMember = 0;
        if(departmentEntity.getAccounts() != null) {
            totalMember = departmentEntity.getAccounts().size();
        }
        departmentEntity.setTotalMember(totalMember);

        // create department
        Department department = departmentRepository.save(departmentEntity);


        // create accounts
        List<Account> accountEntities = new ArrayList<Account>();
        List<CreatingDepartmentForm.Account> accounts = form.getAccounts();
        for (CreatingDepartmentForm.Account account : accounts) {
            int id = account.getId();
            Account acc = accountRepository.findById(id).get();
            acc.setDepartment(department);
            accountEntities.add(acc);
        }
        accountRepository.saveAll(accountEntities);

    }

    @Override
    @Transactional
    public void updateDepartment(UpdatingDepartmentForm form) {
        Department department = departmentRepository.findById(form.getId())
                .orElseThrow(() -> new EntityNotFoundException("Department not found with id: " + form.getId()));
            department.setType(Department.Type.valueOf(form.getType()));
        departmentRepository.save(department);
    }



    @Override
    public void deleteDepartment(int id) {

        departmentRepository.deleteById(id);
    }

    @Override
    public DepartmentDTO departmentFindById(int id) {
        Optional<Department> dp = departmentRepository.findById(id);
        Department department = dp.get();
        DepartmentDTO departmentDTO = modelMapper.map(department, DepartmentDTO.class);
        for (Account account : department.getAccounts()) {
            if (account.getPassword() != null) {
                account.setPassword(null);
            }
        }

        return departmentDTO;
    }

    @Override
    public Page<DepartmentDTO> getDepartments(Pageable pageable, String name, DepartmentFilterForm departmentFilterForm, String type) {
        Specification<Department> where = DepartmentSpecification.buildWhere(name, departmentFilterForm, type);
        Page<Department> departments = departmentRepository.findAll(where, pageable);
        List<DepartmentDTO> dtos = modelMapper.map(departments.getContent(), new TypeToken<List<DepartmentDTO>>() {}.getType());
        Page<DepartmentDTO> dtoPage = new PageImpl<>(dtos,pageable,departments.getTotalElements());
        return dtoPage;
    }

    @Override
    public List<DepartmentDTO> getListDepartments() {
        List<Department> departments = departmentRepository.findAll();
        List<DepartmentDTO> dtos = modelMapper.map(departments, new TypeToken<List<DepartmentDTO>>() {}.getType());
        for (DepartmentDTO department : dtos) {
            if (department.getAccounts() != null) {
                department.setAccounts(null);
            }
        }
        return dtos;
    }

    @Override
    public boolean isDepartmentExistsByID(Integer id) {
        return departmentRepository.existsById(id);
    }

    @Override
    public int getCountIdForDelete(Set<Integer> ids) {
        return departmentRepository.getCountIdForDelete(ids);
    }

    @Override
    public boolean isDepartmentExistsByName(String name) {
        return departmentRepository.existsByName(name);
    }

}
