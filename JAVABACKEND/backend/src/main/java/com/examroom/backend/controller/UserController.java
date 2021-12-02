package com.examroom.backend.controller;

import com.examroom.backend.model.Role;
import com.examroom.backend.model.User;
import com.examroom.backend.model.UserRole;
import com.examroom.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
     @Autowired
     private UserService userService;
     @Autowired
     private BCryptPasswordEncoder bCryptPasswordEncoder;
      //creating user
    @PostMapping("/p")
    public User createUser(@RequestBody User user) throws Exception {
        user.setProfile("default.png");
        //encoding password with bcryptencoder
        user.setPassword(user.getPassword());

        Set<UserRole> roles=new HashSet<>();
        Role role=new Role();
        role.setRollId(45L);
        role.setRoleName("Normal");

        UserRole userRole=new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);



        roles.add(userRole);

        return this.userService.createUser(user,roles);


    }
    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username){
        return this.userService.getUser(username);

    }
    //delete user by Id
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        this.userService.deleteUser(userId);

    }



}
