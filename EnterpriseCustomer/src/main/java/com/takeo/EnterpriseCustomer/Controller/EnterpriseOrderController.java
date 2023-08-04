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


import com.takeo.EnterpriseCustomer.Service.EnterpriseOrderService;
import com.takeo.EnterpriseCustomer.model.EnterpriseCustomer;
import com.takeo.EnterpriseCustomer.model.EnterpriseCustomerOrder;

@RestController
@RequestMapping("/api/enterprise")
public class EnterpriseOrderController {

	private final EnterpriseOrderService orderService;

	@Autowired
	public EnterpriseOrderController(EnterpriseOrderService orderService) {
		this.orderService = orderService;

	}

	// CREATE ORDER
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	@PostMapping("/customers/{customerID}/orders")
	public void createOrder(@RequestBody EnterpriseCustomerOrder createOrder, @PathVariable Long customerID) {
		try {
			EnterpriseCustomer customer = new EnterpriseCustomer();
			customer.setCustomerID(customerID);
			createOrder.setEnterpriseCustomer(customer);
			
			
			//SAVE THE ORDER USING THE CONSUMER ORDER SERVICE
			orderService.createOrder(createOrder);
			System.out.println("Order Created");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	//GET ALL ORDER
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	 @GetMapping("/customers/orders")
	    public List<EnterpriseCustomerOrder> showAllOrders() {
	        return orderService.getAllOrders();
	    }
	
	//GET ORDER BY CUSTOMER ID
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	@GetMapping("/customers/{customerID}/orders")
	public List<EnterpriseCustomerOrder>getOrdersByCustomer(@PathVariable Long customerID){
		return orderService.getOrdersByCustomerId(customerID);
	}
	
	//GET ORDER BY ORDER ID
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	@GetMapping("/orders/{orderID}")
	public EnterpriseCustomerOrder getOrderById(@PathVariable Long orderID) {
		return orderService.findByOrderId(orderID);
	}
	
	//UPDATE ORDER BY CUSTOMER ID
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	@PutMapping("/customers/{customerID}/orders/{orderID}")
	public EnterpriseCustomerOrder updateOrder(@PathVariable Long customerID, @PathVariable Long orderID, @RequestBody EnterpriseCustomerOrder updateOrder) {
		return orderService.updateOrder(customerID,orderID,updateOrder);
	}

}
