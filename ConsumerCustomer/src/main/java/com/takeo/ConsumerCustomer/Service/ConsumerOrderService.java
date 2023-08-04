package com.takeo.ConsumerCustomer.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.takeo.ConsumerCustomer.Repository.ConsumerOrderRepo;
import com.takeo.ConsumerCustomer.model.ConsumerCustomer;
import com.takeo.ConsumerCustomer.model.ConsumerOrder;

@Service
public class ConsumerOrderService {

	private final ConsumerOrderRepo orderRepo;
	private final ConsumerCustomerService customerService;
	
	@Autowired
	public ConsumerOrderService(ConsumerOrderRepo orderRepo, ConsumerCustomerService customerService) {
		this.orderRepo = orderRepo;
		this.customerService = customerService;
	}

	public ConsumerOrder createOrder(ConsumerOrder createOrder) {
		return orderRepo.save(createOrder);
		
	}

	  public List<ConsumerOrder> getAllOrders() {
	        return orderRepo.findAll();
	    }

	public List<ConsumerOrder> getOrdersByCustomerId(Long customerID) {
		
		return orderRepo.findByConsumerCustomerCustomerID(customerID);
	}

	public ConsumerOrder getOrderByID(Long orderID) {
	
		return orderRepo.findById(orderID).orElse(null);
	}


	public String getOrderStatus(Long orderID) {
        ConsumerOrder order = orderRepo.findById(orderID).orElse(null);
        if (order != null) {
            return order.getOrderStatus();
        }
        return "Order Doesnt Exists";
    }

	public ConsumerOrder updateOrder(Long customerID, Long orderID, ConsumerOrder updateOrder) {
		
		ConsumerCustomer customer = customerService.getCustomerById(customerID);
		
		if(customer!=null) {
			ConsumerOrder existingOrder = orderRepo.findById(orderID).orElse(null);
			
			if(existingOrder!=null && existingOrder.getConsumerCustomer().getCustomerID().equals(customerID)) {
				existingOrder.setOrderName(updateOrder.getOrderName());
                existingOrder.setOrderPrice(updateOrder.getOrderPrice());
                existingOrder.setOrderStatus(updateOrder.getOrderStatus());
                
                return orderRepo.save(existingOrder);
			}
		}
		
		return null;
	}
	  
	
	
}
