package com.takeo.User.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.takeo.User.Service.UserService;
import com.takeo.User.Validation.UserRegisterValidation;
import com.takeo.User.model.User;

@RestController
public class UserController {

	private UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	// REGISTER NEW USER
	@CrossOrigin(origins = "http://localhost:5173/", allowedHeaders = { "Content-Type" })
	@PostMapping("/createuser")
	public void createUser(@RequestBody User userCreate) {
		try {
			this.userService.createUser(userCreate);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// SHOW ALL USER
	@CrossOrigin(origins = "http://localhost:5173/", allowedHeaders = { "Content-Type" })
	@GetMapping("/showuser")
	public List<User> showAllUser() {
		System.out.print(userService.getAllUser());
		return userService.getAllUser();
	}

	// VALIDATE REGISTER USER
	@CrossOrigin(origins = "http://localhost:5173/", allowedHeaders = { "Content-Type" })
	@GetMapping("/validateuser/{userName}")
	public ResponseEntity<UserRegisterValidation> validateUser(@PathVariable String userName) {
		boolean userExists = userService.userExists(userName);

		UserRegisterValidation response = new UserRegisterValidation(userExists);
		return ResponseEntity.ok(response);
	}

	// VALIDATE LOGIN USER
	@CrossOrigin(origins = "http://localhost:5173/", allowedHeaders = { "Content-Type" })
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody User user) {
		String username = user.getUserName();
		String password = user.getPassword();

		if (userService.validateLoginUser(username, password)) {
			return ResponseEntity.ok("Login successful!");
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
		}
	}

}
