package com.takeo.EnterpriseCustomer.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "customerID")
public class EnterpriseCustomer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long customerID;
	private String customerFname;
	private String customerLname;
	private String customerEmail;
	private String customerPhone;
	private String customerAddress;

	@OneToMany(mappedBy = "enterpriseCustomer", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<EnterpriseCustomerOrder> consumerOrders;

	public EnterpriseCustomer() {

	}

	public Long getCustomerID() {
		return customerID;
	}

	public void setCustomerID(Long customerID) {
		this.customerID = customerID;
	}

	public String getCustomerFname() {
		return customerFname;
	}

	public void setCustomerFname(String customerFname) {
		this.customerFname = customerFname;
	}

	public String getCustomerLname() {
		return customerLname;
	}

	public void setCustomerLname(String customerLname) {
		this.customerLname = customerLname;
	}

	public String getCustomerEmail() {
		return customerEmail;
	}

	public void setCustomerEmail(String customerEmail) {
		this.customerEmail = customerEmail;
	}

	public String getCustomerPhone() {
		return customerPhone;
	}

	public void setCustomerPhone(String customerPhone) {
		this.customerPhone = customerPhone;
	}

	public String getCustomerAddress() {
		return customerAddress;
	}

	public void setCustomerAddress(String customerAddress) {
		this.customerAddress = customerAddress;
	}

	public List<EnterpriseCustomerOrder> getConsumerOrders() {
		return consumerOrders;
	}

	public void setConsumerOrders(List<EnterpriseCustomerOrder> consumerOrders) {
		this.consumerOrders = consumerOrders;
	}



}
