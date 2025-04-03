package com.vti.specification;

import ch.qos.logback.core.util.StringUtil;
import com.vti.form.DepartmentFilterForm;
import com.vti.entity.Account;
import com.vti.entity.Department;
import jakarta.persistence.criteria.*;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.util.Date;

public class DepartmentSpecification {
    public static Specification<Department> buildWhere(String name, DepartmentFilterForm departmentFilterForm, String type){
        Specification<Department> where = null;
        if(!StringUtil.isNullOrEmpty(name)){
            CustomSpecification nameCondition = new CustomSpecification("name",name,departmentFilterForm);
            where = Specification.where(nameCondition);
        }
        if(departmentFilterForm != null && departmentFilterForm.getMinId() != null){
            CustomSpecification minID = new CustomSpecification("minId",departmentFilterForm.getMinId(),departmentFilterForm);
            if(where == null){
                where = Specification.where(minID);
            } else {
                where = where.and(minID);
            }
        }
        if(departmentFilterForm != null && departmentFilterForm.getMaxId() != null){
            CustomSpecification maxID = new CustomSpecification("maxId",departmentFilterForm.getMaxId(),departmentFilterForm);
            if(where == null){
                where = Specification.where(maxID);
            } else {
                where = where.and(maxID);
            }
        }
        if(departmentFilterForm != null && departmentFilterForm.getMinTotalMember() != null){
            CustomSpecification minTotal = new CustomSpecification("minTotalMember",departmentFilterForm.getMinTotalMember(),departmentFilterForm);
            if(where == null){
                where = Specification.where(minTotal);
            } else {
                where = where.and(minTotal);
            }
        }
        if(departmentFilterForm != null && departmentFilterForm.getMaxTotalMember() != null){
            CustomSpecification maxTotal = new CustomSpecification("maxTotalMember",departmentFilterForm.getMaxTotalMember(),departmentFilterForm);
            if(where == null){
                where = Specification.where(maxTotal);
            } else {
                where = where.and(maxTotal);
            }
        }
        if(departmentFilterForm != null && departmentFilterForm.getMinCreateDate() != null){
            CustomSpecification minCreateDate = new CustomSpecification("minCreateDate",departmentFilterForm.getMinCreateDate(),departmentFilterForm);
            if(where == null){
                where = Specification.where(minCreateDate);
            } else {
                where = where.and(minCreateDate);
            }
        }
        if(departmentFilterForm != null && departmentFilterForm.getMaxCreateDate() != null){
            CustomSpecification maxCreateDate = new CustomSpecification("maxCreateDate",departmentFilterForm.getMaxCreateDate(),departmentFilterForm);
            if(where == null){
                where = Specification.where(maxCreateDate);
            } else {
                where = where.and(maxCreateDate);
            }
        }
        if(departmentFilterForm != null && departmentFilterForm.getMinYear() != null){
            CustomSpecification minYear = new CustomSpecification("minYear",departmentFilterForm.getMinYear(),departmentFilterForm);
            if(where == null){
                where = Specification.where(minYear);
            } else {
                where = where.and(minYear);
            }
        }
        if(departmentFilterForm != null && departmentFilterForm.getMaxYear() != null){
            CustomSpecification maxYear = new CustomSpecification("maxYear",departmentFilterForm.getMaxYear(),departmentFilterForm);
            if(where == null){
                where = Specification.where(maxYear);
            } else {
                where = where.and(maxYear);
            }
        }
        if(departmentFilterForm != null && departmentFilterForm.getMinAccount() != null){
            CustomSpecification minAccount = new CustomSpecification("minAccount",departmentFilterForm.getMinAccount(),departmentFilterForm);
            if(where == null){
                where = Specification.where(minAccount);
            } else {
                where = where.and(minAccount);
            }
        }
        if(departmentFilterForm != null && departmentFilterForm.getMaxAccount() != null){
            CustomSpecification maxAccount = new CustomSpecification("maxAccount",departmentFilterForm.getMaxAccount(),departmentFilterForm);
            if(where == null){
                where = Specification.where(maxAccount);

            }
        }
        if (!StringUtil.isNullOrEmpty(type)){
            CustomSpecification typeCondition = new CustomSpecification("type",type,departmentFilterForm);
            if(where == null){
                where = Specification.where(typeCondition);
            } else {
                where = where.and(typeCondition);
            }
        }
        return where;
    }

}
@RequiredArgsConstructor
class CustomSpecification implements Specification<Department> {

    @NonNull
    private String field;

    @NonNull
    private Object value;

    @NonNull
    DepartmentFilterForm departmentFilterForm;
    @Override
    public Predicate toPredicate(Root<Department> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if(field.equalsIgnoreCase("name")){

            return criteriaBuilder.like(root.get(field), "%" + value + "%");
        }
        if(field.equalsIgnoreCase("minId")){
            return criteriaBuilder.greaterThanOrEqualTo(root.get("id"), value.toString());
        }
        if(field.equalsIgnoreCase("maxId")){
            return criteriaBuilder.lessThanOrEqualTo(root.get("id"), value.toString());
        }
        if(field.equalsIgnoreCase("minTotalMember")){
            return criteriaBuilder.greaterThanOrEqualTo(root.get("totalMember"), value.toString());
        }
        if(field.equalsIgnoreCase("maxTotalMember")){
            return criteriaBuilder.lessThanOrEqualTo(root.get("totalMember"), value.toString());
        }
        if(field.equalsIgnoreCase("minCreateDate")){
            return criteriaBuilder.greaterThanOrEqualTo(root.get("createdDate"), (Date) value);
        }
        if(field.equalsIgnoreCase("maxCreateDate")){
            return criteriaBuilder.lessThanOrEqualTo(root.get("createdDate"), (Date) value);
        }
        if (field.equalsIgnoreCase("minYear")) {
            Integer minYear = (Integer) value;
            Expression<Integer> yearExpression = criteriaBuilder.function("YEAR", Integer.class, root.get("createdDate"));
            return criteriaBuilder.greaterThanOrEqualTo(yearExpression, minYear);
        }

        if (field.equalsIgnoreCase("maxYear")) {
            Integer maxYear = (Integer) value;
            Expression<Integer> yearExpression = criteriaBuilder.function("YEAR", Integer.class, root.get("createdDate"));
            return criteriaBuilder.lessThanOrEqualTo(yearExpression, maxYear);
        }

        if (departmentFilterForm.getMinAccount() != null || departmentFilterForm.getMaxAccount() != null) {
            Join<Department, Account> accountJoin = root.join("accounts");
            query.groupBy(root.get("id"));

            Long minAccount = ((Integer) departmentFilterForm.getMinAccount()).longValue();
            Long maxAccount = ((Integer) departmentFilterForm.getMaxAccount()).longValue() ;
            System.out.println(minAccount + " " + maxAccount);
            Predicate minCondition = criteriaBuilder.greaterThanOrEqualTo(
                    criteriaBuilder.count(accountJoin.get("id")), minAccount
            );
            Predicate maxCondition = criteriaBuilder.lessThanOrEqualTo(
                    criteriaBuilder.count(accountJoin.get("id")), maxAccount
            );

            // Kết hợp các điều kiện minAccount và maxAccount
            query.having(criteriaBuilder.and(minCondition, maxCondition));
        }

        if(field.equalsIgnoreCase("type")){
            return criteriaBuilder.equal(root.get(field), value);
        }
        return null;
    }

}