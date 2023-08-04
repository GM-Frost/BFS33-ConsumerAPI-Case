package com.takeo.ConsumerCustomer.Controller;

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

import com.takeo.ConsumerCustomer.Service.ConsumerCustomerService;
import com.takeo.ConsumerCustomer.model.ConsumerCustomer;

@RestController
@RequestMapping("/api/consumer")
public class ConsumerCustomerController {

	private ConsumerCustomerService customerService;
	
	@Autowired
	public ConsumerCustomerController(ConsumerCustomerService customerService) {
		this.customerService = customerService;
	}
	
	

	//CREATE CUSTOMER
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	@PostMapping("/customers")
	public void createCustomer(@RequestBody ConsumerCustomer createCustomer) {
		try {
			this.customerService.createCustomer(createCustomer);
			System.out.print("Customer Created");
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	//GET ALL CUSTOMERS
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	@GetMapping("/customers")
	public List<ConsumerCustomer>showAllCustomer(){
		return customerService.getAllCustomer();
		
	}
	
	//GET SPECIFIC CUSTOMER
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	@GetMapping("/customers/{customerID}")
	public ConsumerCustomer getCustomerById(@PathVariable Long customerID) {
		return customerService.getCustomerById(customerID);
	}
	
	//UPDATE CUSTOMER
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	@PutMapping("/customers/{customerID}")
	public ConsumerCustomer updateConsumer(@PathVariable Long customerID, @RequestBody ConsumerCustomer updateConsumer) {
		 return customerService.updateCustomer(customerID, updateConsumer);
	}
	
	
}
