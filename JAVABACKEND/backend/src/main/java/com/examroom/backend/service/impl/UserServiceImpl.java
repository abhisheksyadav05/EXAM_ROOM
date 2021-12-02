package com.examroom.backend.service.impl;

import com.examroom.backend.model.User;
import com.examroom.backend.model.UserRole;
import com.examroom.backend.repo.RoleRepository;
import com.examroom.backend.repo.UserRepository;
import com.examroom.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;


    //creating user
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {
        User local=this.userRepository.findByUsername(user.getUsername());
        if(local!=null){
            System.out.println("User is Already Present");
            throw new Exception("User already present");
        }
        else
        {
            //user create
            for(UserRole ur:userRoles)
            {
                roleRepository.save(ur.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            local=this.userRepository.save(user);
        }
        return local;
    }
   //getting user by username
    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }


}
