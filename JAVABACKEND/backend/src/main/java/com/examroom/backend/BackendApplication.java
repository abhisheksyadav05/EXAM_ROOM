package com.examroom.backend;

import com.examroom.backend.model.Role;
import com.examroom.backend.model.User;
import com.examroom.backend.model.UserRole;
import com.examroom.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {
	@Autowired
	private UserService userService;
    @Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {

		System.out.println("Application is Starting ");
		SpringApplication.run(BackendApplication.class, args);
		System.out.println("Application ended");
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Starting Code");

//		User user =new User();
//
//		user.setFirstName("Suraj");
//		user.setLastname("Mishra");
//		user.setUsername("Suraj1");
//		user.setPassword("abcde");
//		user.setEmail("abc@gmail.com");
//		user.setProfile("default.png");
//
//		Role role1=new Role();
//		role1.setRollId(19L);
//		role1.setRoleName("Admin");
//
//		Set<UserRole> userRoleSet=new HashSet<>();
//		UserRole userRole=new UserRole();
//		userRole.setRole(role1);
//		userRole.setUser(user);
//		userRoleSet.add(userRole);
//
//		User user1=this.userService.createUser(user,userRoleSet);
//

	}
}
