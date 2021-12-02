package com.examroom.backend.repo;

import com.examroom.backend.model.exam.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository  extends JpaRepository<Category,Long>{

}
