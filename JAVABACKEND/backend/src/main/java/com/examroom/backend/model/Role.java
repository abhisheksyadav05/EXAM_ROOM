package com.examroom.backend.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="role")
public class Role {
    @Id
    private Long rollId;
    private String roleName;

    @OneToMany(cascade = CascadeType.ALL,fetch=FetchType.LAZY,mappedBy="role")
    private Set<UserRole> userRoles=new HashSet<>();



    public Role(Long rollId, String roleName) {
        this.rollId = rollId;
        this.roleName = roleName;
    }

    public Role() {
    }

    public Set<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<UserRole> userRoles) {
        this.userRoles = userRoles;
    }

    public Long getRollId() {
        return rollId;
    }

    public void setRollId(Long rollId) {
        this.rollId = rollId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
