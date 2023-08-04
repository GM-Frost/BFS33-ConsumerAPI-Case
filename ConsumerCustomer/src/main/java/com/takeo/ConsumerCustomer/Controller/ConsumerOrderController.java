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


import com.takeo.ConsumerCustomer.Service.ConsumerOrderService;
import com.takeo.ConsumerCustomer.model.ConsumerCustomer;
import com.takeo.ConsumerCustomer.model.ConsumerOrder;

@RestController
@RequestMapping("/api/consumer")
public class ConsumerOrderController {
	
	private ConsumerOrderService orderService;

	
	@Autowired
	public ConsumerOrderController(ConsumerOrderService orderService) {
		this.orderService = orderService;

	}
	
	//CREATE ORDER
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	@PostMapping("/customers/{customerID}/orders")
	public void createOrder(@RequestBody ConsumerOrder createOrder, @PathVariable Long customerID) {
		try {
			 ConsumerCustomer customer = new ConsumerCustomer();
	            customer.setCustomerID(customerID);
	            createOrder.setConsumerCustomer(customer);

	            // Save the order using the ConsumerOrderService
	            orderService.createOrder(createOrder);
	            System.out.println("Order Created");
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	//GET ALL ORDER
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	 @GetMapping("/customers/orders")
	    public List<ConsumerOrder> showAllOrders() {
	        return orderService.getAllOrders();
	    }
	 
	 //GET SPECIFIC ORDER BY CUSTOMER
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	 @GetMapping("/customers/{customerID}/orders")
	 public List<ConsumerOrder> getOrdersByCustomer(@PathVariable Long customerID) {
	        return orderService.getOrdersByCustomerId(customerID);
	    }
	 
	 //GET SPECIFIC ORDER BY ID
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	 @GetMapping("/orders/{orderID}")
	 public ConsumerOrder getOrderById(@PathVariable Long orderID) {
		 return orderService.getOrderByID(orderID);
	 }
	 
	 //GET STATUS OF ORDER BY CONSUMER ID
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	 @GetMapping("/orders/status/{orderID}")
	 public String getOrderStatus(@PathVariable Long orderID) {
		 return orderService.getOrderStatus(orderID);
	 }
	 
	 //UPDATE ORDER BASED ON CUSTOMER ID
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
	 @PutMapping("/customers/{customerID}/orders/{orderID}")
	 public ConsumerOrder updateOrder(@PathVariable("customerID") Long customerID, @PathVariable("orderID") Long orderID, @RequestBody ConsumerOrder updateOrder) {
		 
		 return orderService.updateOrder(customerID,orderID,updateOrder);
	 }
	
}
