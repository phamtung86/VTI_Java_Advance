package com.vti.repository;

import com.vti.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer>, JpaSpecificationExecutor<Account> {
    @Query("SELECT COUNT(a) FROM Account a")
    int totalAccount();

    Account findByUsername(String username);

    @Query("SELECT COUNT(*) FROM Account WHERE id IN(:ids)")
    int getCountIdForDelete(@Param("ids") Set<Integer> ids);

    boolean existsByUsername(String username);

    @Query("FROM Account WHERE id IN(:ids)")
    List<Account> getListAccountByListId(@Param ("ids") Set<Integer> ids);

    Account findByEmail(String email);

}
