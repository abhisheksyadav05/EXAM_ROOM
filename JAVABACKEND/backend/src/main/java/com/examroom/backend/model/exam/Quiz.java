package com.examroom.backend.model.exam;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.aspectj.weaver.GeneratedReferenceTypeDelegate;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long qid;


    private String title;

    private String description;

    private String maxMarks;

    private String numberofQuestions;

    private boolean active = false;

    @ManyToOne(fetch=FetchType.EAGER)
    private Category category;

    @OneToMany(mappedBy = "quiz",fetch=FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Question> questions=new HashSet<>();

    public Quiz() {
    }

    public Quiz(Long qid, String title, String description, String maxMarks, String numberofQuestions, boolean active) {
        this.qid = qid;
        this.title = title;
        this.description = description;
        this.maxMarks = maxMarks;
        this.numberofQuestions = numberofQuestions;
        this.active = active;
    }

    public Long getQid() {
        return qid;
    }

    public void setQid(Long qid) {
        this.qid = qid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMaxMarks() {
        return maxMarks;
    }

    public void setMaxMarks(String maxMarks) {
        this.maxMarks = maxMarks;
    }

    public String getNumberofQuestions() {
        return numberofQuestions;
    }

    public void setNumberofQuestions(String numberofQuestions) {
        this.numberofQuestions = numberofQuestions;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
    public Set<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }
}

