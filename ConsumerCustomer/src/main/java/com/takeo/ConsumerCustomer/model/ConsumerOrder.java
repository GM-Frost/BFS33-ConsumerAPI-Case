package com.takeo.ConsumerCustomer.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "orderID")
public class ConsumerOrder {

	 	@Id
	    @GeneratedValue(strategy=GenerationType.IDENTITY)
	    private Long orderID;
	    private String orderName;
	    private double orderPrice;
	    private String orderStatus;

	    @ManyToOne
	    @JoinColumn(name = "customerID")
	    @JsonBackReference
	    private ConsumerCustomer consumerCustomer;

	    public ConsumerOrder() {
	        
	    }

		public Long getOrderID() {
			return orderID;
		}

		public void setOrderID(Long orderID) {
			this.orderID = orderID;
		}

		public String getOrderName() {
			return orderName;
		}

		public void setOrderName(String orderName) {
			this.orderName = orderName;
		}

		public double getOrderPrice() {
			return orderPrice;
		}

		public void setOrderPrice(double orderPrice) {
			this.orderPrice = orderPrice;
		}

		public String getOrderStatus() {
			return orderStatus;
		}

		public void setOrderStatus(String orderStatus) {
			this.orderStatus = orderStatus;
		}

		public ConsumerCustomer getConsumerCustomer() {
			return consumerCustomer;
		}

		public void setConsumerCustomer(ConsumerCustomer consumerCustomer) {
			this.consumerCustomer = consumerCustomer;
		}

		@JsonGetter("customerID")
	    public Long getCustomerID() {
	        if (consumerCustomer != null) {
	            return consumerCustomer.getCustomerID();
	        }
	        return null;
	    }
}
