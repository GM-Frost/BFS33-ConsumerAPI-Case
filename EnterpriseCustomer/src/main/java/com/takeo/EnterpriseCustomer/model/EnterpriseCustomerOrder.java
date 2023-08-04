package com.takeo.EnterpriseCustomer.model;



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
public class EnterpriseCustomerOrder {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long orderID;
	private String OrderName;
	private double orderPrice;
	private String orderStatus;
	
	
	@ManyToOne
	@JoinColumn(name="customerID")
	@JsonBackReference
	private EnterpriseCustomer enterpriseCustomer;
	

	public EnterpriseCustomerOrder() {
		
	}

	public Long getOrderID() {
		return orderID;
	}

	public void setOrderID(Long orderID) {
		this.orderID = orderID;
	}

	public String getOrderName() {
		return OrderName;
	}

	public void setOrderName(String orderName) {
		OrderName = orderName;
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

	public EnterpriseCustomer getEnterpriseCustomer() {
		return enterpriseCustomer;
	}

	public void setEnterpriseCustomer(EnterpriseCustomer enterpriseCustomer) {
		this.enterpriseCustomer = enterpriseCustomer;
	}

	@JsonGetter("customerID")
    public Long getCustomerID() {
        if (enterpriseCustomer != null) {
            return enterpriseCustomer.getCustomerID();
        }
        return null;
    }
	
	
}
