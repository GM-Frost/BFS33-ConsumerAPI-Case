package com.takeo.User.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.takeo.User.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	User findByUserName(String userName);
	boolean existsByUserName(String userName);	
}
