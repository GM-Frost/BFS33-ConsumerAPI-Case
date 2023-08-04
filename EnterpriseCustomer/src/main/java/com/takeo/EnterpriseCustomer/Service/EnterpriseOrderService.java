package com.takeo.EnterpriseCustomer.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.takeo.EnterpriseCustomer.Repository.EnterpriseCustomerOrderRepo;
import com.takeo.EnterpriseCustomer.model.EnterpriseCustomer;
import com.takeo.EnterpriseCustomer.model.EnterpriseCustomerOrder;

@Service
public class EnterpriseOrderService {

	private final EnterpriseCustomerOrderRepo orderRepo;
	private final EnterpriseCustomerService customerService;
	
	@Autowired
	public EnterpriseOrderService(EnterpriseCustomerOrderRepo orderRepo, EnterpriseCustomerService customerService) {
	this.orderRepo = orderRepo;
	this.customerService = customerService;
	}
	
	//CREATE ORDER
	public EnterpriseCustomerOrder createOrder(EnterpriseCustomerOrder createOrder) {
		return orderRepo.save(createOrder);
	}

	//FIND ORDER BY CUSTOMER ID
	public List<EnterpriseCustomerOrder> getOrdersByCustomerId(Long customerID) {
		return orderRepo.findByEnterpriseCustomerCustomerID(customerID);
		
	}
	//FIND ORDER BY ORDER ID
	public EnterpriseCustomerOrder findByOrderId(Long orderID) {
		
		return orderRepo.findById(orderID).orElse(null);

		
	}

	
	//UPDATE ORDER BY CUSTOMER ID
	public EnterpriseCustomerOrder updateOrder(Long customerID, Long orderID, EnterpriseCustomerOrder updateOrder) {
		
		EnterpriseCustomer customer = customerService.getCustomerByID(customerID);
		
		if(customer!=null) {
			EnterpriseCustomerOrder existingOrder = orderRepo.findById(orderID).orElse(null);
			
			if(existingOrder!=null && existingOrder.getEnterpriseCustomer().getCustomerID().equals(customerID)) {
				existingOrder.setOrderName(updateOrder.getOrderName());
				existingOrder.setOrderPrice(updateOrder.getOrderPrice());
				existingOrder.setOrderStatus(updateOrder.getOrderStatus());
			
				return orderRepo.save(existingOrder);
			}
		}
		return null;
	}

	public List<EnterpriseCustomerOrder> getAllOrders() {
	
		return orderRepo.findAll();
	}

	
}
