package com.vti.specification;

import com.vti.form.account.AccountFilterForm;
import com.vti.entity.Account;
import com.vti.entity.Department;
import jakarta.persistence.criteria.*;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class AccountSpecification {
    public static Specification<Account> buildWhere(String type) {
        Specification<Account> where = null;
        AccountCustomSpecification accountCustomSpecification = new AccountCustomSpecification("depatment_id", "", type);
        return where = accountCustomSpecification;
    }

    public static Specification<Account> buildWhere(String search, AccountFilterForm filterForm, String type) {
        Specification<Account> where = null;
        AccountCustomSpecification init = new AccountCustomSpecification("init", "init",type);
        where = Specification.where(init);
        if (!StringUtils.isEmpty(search)) {
            search = search.trim();
            AccountCustomSpecification username = new AccountCustomSpecification("username", search,type);
            AccountCustomSpecification firstName = new AccountCustomSpecification("firstName", search,type);
            AccountCustomSpecification lastName = new AccountCustomSpecification("lastName", search,type);
            where = where.and((username).or(firstName).or(lastName));
        }

        // Filter
        if(filterForm == null) {
            return where;
        }
        // Filter theo role hoặc department
        // role
        if (filterForm.getRole() != null) {
            AccountCustomSpecification role = new AccountCustomSpecification("role", filterForm.getRole(),type);
            where = where.and(role);
        }

        // department
        if (filterForm.getDepartmentId() != null) {
            AccountCustomSpecification departmentId = new AccountCustomSpecification("department", filterForm.getDepartmentId(),type);
            where = where.and(departmentId);
        }

        return where;
    }
}

@AllArgsConstructor
class AccountCustomSpecification implements Specification<Account> {

    @NonNull
    private String field;
    @NonNull
    private Object value;
    @NonNull
    private String type;

    @Override
    public Predicate toPredicate(Root<Account> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        switch (type) {
            case "IS_NULL_ID":
                if (field.equalsIgnoreCase("depatment_id")) {

                    return criteriaBuilder.isNull(root.get("department").get("id"));
                }
            case "FILTER_ACCOUNT":
                if (field.equalsIgnoreCase("init")) {
                    return criteriaBuilder.equal(criteriaBuilder.literal(1), 1);
                }

                if (field.equalsIgnoreCase("username")) {
                    return criteriaBuilder.like(root.get("username"), "%" + value + "%");
                }

                if (field.equalsIgnoreCase("firstName")) {
                    return criteriaBuilder.like(root.get("firstName"), "%" + value + "%");
                }

                if (field.equalsIgnoreCase("lastName")) {
                    return criteriaBuilder.like(root.get("lastName"), "%" + value + "%");
                }

                if (field.equalsIgnoreCase(("role"))) {
                    return criteriaBuilder.equal(root.get(field), value);
                }
                if (field.equalsIgnoreCase(("department"))) {
                    Join<Account, Department> join = root.join("department");
                    return criteriaBuilder.equal(join.get("id"), value);
                }
        }
        return null;
    }
}