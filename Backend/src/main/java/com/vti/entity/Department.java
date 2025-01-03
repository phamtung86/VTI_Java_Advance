package com.vti.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "Department")
@Setter
@Getter
@ToString
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    @NonNull
    private String name;

    @Column(name = "total_member")
    @NonNull
    private int totalMember;

    @Column(name = "`type`", nullable = false)
    @Convert(converter = DepartmentTypeConvert.class)
    @NonNull
    private Type type;

    @Column(name = "created_date")
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp createdDate;

    @OneToMany(mappedBy = "department")
    private List<Account> accounts;

    public enum Type {
        DEV("Dev"), TEST("Test"), ScrumMaster("ScrumMaster"), PM("PM");

        private String value;

        private Type(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        public static Type toEnum(String sqlValue) {
            for (Type type : Type.values()) {
                if (type.getValue().equals(sqlValue)) {
                    return type;
                }
            }
            return null;
        }

    }
}
