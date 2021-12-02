package com.examroom.backend.repo;

import com.examroom.backend.model.exam.Category;
import com.examroom.backend.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz,Long> {

    List<Quiz> findBycategory(Category category);

    public List<Quiz> findByActive(Boolean b);
    List<Quiz> findByCategoryAndActive(Category c, boolean b);
}
