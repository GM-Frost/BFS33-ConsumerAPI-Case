package com.takeo.User.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.takeo.User.model.User;
import com.takeo.User.repository.UserRepository;

@Service
public class UserService {

	private final UserRepository userRepo;
	
	@Autowired
	public UserService(UserRepository userRepo) {
		this.userRepo = userRepo;
	}
	
	//GET ALL USERS
	public List<User>getAllUser(){
		return userRepo.findAll();
	}
	
	//CREATE NEW USER
	public User createUser(User request) {
		return userRepo.save(request);
	}
	
	// CHECK IF USER ALREADY EXISTS FOR REGISTRATION
	public boolean userExists(String userName) {
		return userRepo.existsByUserName(userName);
	}
	
	// CHECK USER FOR LOGIN
	public boolean validateLoginUser(String username, String password) {
		User user = userRepo.findByUserName(username);
		
		if(user==null) {
			return false;
		}
		return user.getPassword().equals(password);
		
	}
	
}
