package com.takeo.EnterpriseCustomer.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.takeo.EnterpriseCustomer.Repository.EnterpriseCustomerRepo;
import com.takeo.EnterpriseCustomer.model.EnterpriseCustomer;

@Service
public class EnterpriseCustomerService {

	private final EnterpriseCustomerRepo customerRepo;
	
	@Autowired
	public EnterpriseCustomerService(EnterpriseCustomerRepo customerRepo) {
		this.customerRepo = customerRepo;
	}

	//GET ALL CUSTOMER
	public List<EnterpriseCustomer> getAllCustomer() {
		return customerRepo.findAll();
	}

	//CREATE CUSTOMER
	public EnterpriseCustomer createCustomer(EnterpriseCustomer createCustomer) {
		return customerRepo.save(createCustomer);
		
	}

	//GET SPECIFIC CUSTOMER
	public EnterpriseCustomer getCustomerByID(Long customerID) {
		
		return customerRepo.findById(customerID).orElse(null);
	}

	
	//UPDATE CUSTOMER
	public EnterpriseCustomer updateCustomer(Long customerID, EnterpriseCustomer updateCustomer) {
		
		EnterpriseCustomer existingCustomer = customerRepo.findById(customerID).orElse(null);
		if(existingCustomer!=null) {
			existingCustomer.setCustomerFname(updateCustomer.getCustomerFname());
			existingCustomer.setCustomerLname(updateCustomer.getCustomerLname());
			existingCustomer.setCustomerEmail(updateCustomer.getCustomerEmail());
			existingCustomer.setCustomerAddress(updateCustomer.getCustomerAddress());
			existingCustomer.setCustomerPhone(updateCustomer.getCustomerPhone());
			existingCustomer.setConsumerOrders(updateCustomer.getConsumerOrders());
			return customerRepo.save(existingCustomer);
		}
		return null;
	}
	
	
	
}
