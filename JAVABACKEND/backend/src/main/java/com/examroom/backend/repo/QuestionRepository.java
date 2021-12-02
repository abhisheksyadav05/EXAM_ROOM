package com.examroom.backend.repo;

import com.examroom.backend.model.exam.Question;
import com.examroom.backend.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface QuestionRepository extends JpaRepository<Question,Long> {
    Set<Question> findByQuiz(Quiz quiz);

}
