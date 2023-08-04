package com.takeo.ConsumerCustomer.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.takeo.ConsumerCustomer.model.ConsumerOrder;

@Repository
public interface ConsumerOrderRepo extends JpaRepository<ConsumerOrder, Long>{

	 List<ConsumerOrder> findByConsumerCustomerCustomerID(Long customerID);
	 @Query(value = "SELECT co.* FROM consumer_order co JOIN consumer_customer cc ON co.CustomerID=cc.CustomerID", nativeQuery = true)
	 	List<ConsumerOrder> findAllWithCustomer();

}
