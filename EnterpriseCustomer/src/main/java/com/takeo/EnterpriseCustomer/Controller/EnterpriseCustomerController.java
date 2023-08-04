package com.takeo.EnterpriseCustomer.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.takeo.EnterpriseCustomer.Service.EnterpriseCustomerService;
import com.takeo.EnterpriseCustomer.model.EnterpriseCustomer;

@RestController
@RequestMapping("/api/enterprise")
public class EnterpriseCustomerController {

	private EnterpriseCustomerService customerService;
	
	@Autowired
	public EnterpriseCustomerController(EnterpriseCustomerService customerService) {
		this.customerService = customerService;
	}

	//CREATE CUSTOMER
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	@PostMapping("/customers")
	public void createCustomer(@RequestBody EnterpriseCustomer createCustomer) {
		try {
			this.customerService.createCustomer(createCustomer);
			System.out.println("Enterprise Customer Created");
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	//GET CUSTOMERS
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	@GetMapping("/customers")
	public List<EnterpriseCustomer>showAllCustomer(){
		return customerService.getAllCustomer();
	}
	

	
	//GET SPECIFIC CUSTOMER
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	@GetMapping("/customers/{customerID}")
	public EnterpriseCustomer getCustomerById(@PathVariable Long customerID) {
		return customerService.getCustomerByID(customerID);
	}
	
	//UPDATE SPECIFIC CUSTOMER
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	@PutMapping("/customers/{customerID}")
	public EnterpriseCustomer updateConsumer(@PathVariable Long customerID, @RequestBody EnterpriseCustomer updateCustomer) {
		return customerService.updateCustomer(customerID,updateCustomer);
	}

}
