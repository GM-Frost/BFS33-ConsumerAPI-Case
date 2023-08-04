package com.takeo.User.Validation;

public class UserRegisterValidation {
	
	private boolean exists;
	
	public UserRegisterValidation(boolean exists) {
		this.exists = exists;
	}

	public boolean isExists() {
		return exists;
	}

	public void setExists(boolean exists) {
		this.exists = exists;
	}
	

}
