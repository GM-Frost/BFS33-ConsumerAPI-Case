package com.takeo.EnterpriseCustomer.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.takeo.EnterpriseCustomer.model.EnterpriseCustomerOrder;

@Repository
public interface EnterpriseCustomerOrderRepo extends JpaRepository<EnterpriseCustomerOrder, Long>{

	List<EnterpriseCustomerOrder> findByEnterpriseCustomerCustomerID(Long customerID);


}
