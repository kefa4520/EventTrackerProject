package com.skilldistillery.events.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.events.entities.Cycle;

public interface CycleRepository extends JpaRepository<Cycle, Integer> {

}
