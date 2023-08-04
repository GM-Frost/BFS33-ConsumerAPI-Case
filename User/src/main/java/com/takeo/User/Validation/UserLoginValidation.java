package com.takeo.User.Validation;

public class UserLoginValidation {

	private boolean exists;
	
	public UserLoginValidation(boolean exists) {
        this.exists = exists;
    }

    public boolean isExists() {
        return exists;
    }

    public void setExists(boolean exists) {
        this.exists = exists;
    }
    
}
