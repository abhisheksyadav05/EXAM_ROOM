package com.examroom.backend.controller;

import com.examroom.backend.config.JwtUtils;
import com.examroom.backend.helper.UserNotFoundException;
import com.examroom.backend.model.JwtRequest;
import com.examroom.backend.model.JwtResponse;
import com.examroom.backend.model.User;
import com.examroom.backend.service.impl.UserDetailsServiceImpl;
import com.examroom.backend.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;



import java.security.Principal;

@RestController
@CrossOrigin("*")
public class AuthenticateController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private JwtUtils jwtUtils;


    //generate token

    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        //valididate code

        try {
            System.out.println("AUTHENTICATION HAS BEEN STARTED" + jwtRequest.getUsername() + jwtRequest.getPassword());

            authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());


            System.out.println("AUTHENTICATION HAS BEEN DONE");


        } catch (UserNotFoundException e) {
            e.printStackTrace();
            throw new Exception("User not found ");
        }

        /////////////authenticate

        UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getUsername());
        String token = this.jwtUtils.generateToken(userDetails);
        System.out.println("TOKEN IS GENERATED : " + token);
        return ResponseEntity.ok(new JwtResponse(token));


    }

    public void justchecking() {
    }


    private void authenticate(String username, String password) throws Exception {

        try {
            System.out.println("authenticate method");
            System.out.println("authcheck1"+ userServiceImpl.getUser(username));
            System.out.println("authcheck2"+ userServiceImpl.getUser(username).toString());

            //authenticationManageruthenticate(new UsernamePasswordAuthenticationToken(username, password));
            // authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));


            System.out.println("authenticate method ends");

        } catch (DisabledException e) {
            throw new Exception("USER DISABLED " + e.getMessage());
        } catch (BadCredentialsException e) {
            throw new Exception("Invalid Credentials " + e.getMessage());
        }
    }

    //return the details of current user
    @GetMapping("/current-user")
    public User getCurrentUser(Principal principal) {
        return ((User) this.userDetailsService.loadUserByUsername(principal.getName()));

    }


}





