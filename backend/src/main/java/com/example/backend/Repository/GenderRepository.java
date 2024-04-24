package com.example.backend.Repository;

import com.example.backend.Entity.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GenderRepository extends JpaRepository<Gender, Integer> {
    Optional<Gender> findGenderByGenderName(String gender);
}
