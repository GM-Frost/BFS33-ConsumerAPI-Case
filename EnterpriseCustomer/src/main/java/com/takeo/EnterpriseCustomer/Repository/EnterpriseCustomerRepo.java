package com.takeo.EnterpriseCustomer.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.takeo.EnterpriseCustomer.model.EnterpriseCustomer;

@Repository
public interface EnterpriseCustomerRepo extends JpaRepository<EnterpriseCustomer, Long>{

}
