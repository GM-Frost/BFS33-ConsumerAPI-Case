package com.takeo.ConsumerCustomer.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.takeo.ConsumerCustomer.model.ConsumerCustomer;

@Repository
public interface ConsumerCustomerRepo extends JpaRepository<ConsumerCustomer, Long>{

}
