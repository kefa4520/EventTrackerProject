package com.skilldistillery.events.services;

import java.util.List;

import com.skilldistillery.events.entities.Cycle;

public interface CycleService {

List<Cycle> findAll();

Cycle findCycleById(Integer id);

List<Cycle> findByName(String name);

Cycle addCycle(Cycle cycle);

Cycle updateCycle(Cycle cycle, Integer id);

boolean deleteCycleById(Integer id);

	
}
