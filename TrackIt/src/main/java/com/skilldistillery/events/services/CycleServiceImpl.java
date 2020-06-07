package com.skilldistillery.events.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.events.entities.Cycle;
import com.skilldistillery.events.repositories.CycleRepository;

@Service
public class CycleServiceImpl implements CycleService {

	@Autowired
	private CycleRepository cycleRepo;

	@Override
	public List<Cycle> findAll() {

		return cycleRepo.findAll();
	}

	@Override
	public Cycle findCycleById(Integer id) {
		Optional<Cycle> cycle = cycleRepo.findById(id);
		if (cycle.isPresent()) {
			return cycle.get();
		} else {

			return null;
		}
	}

	@Override
	public List<Cycle> findByName(String name) {

		List<Cycle> cycles = cycleRepo.findByName(name);
		if(cycles.size()>0) {
			return cycles;
		} else {
		return null;
	 }
	}

	@Override
	public Cycle addCycle(Cycle cycle) {

		return cycleRepo.save(cycle);
	}

	@Override
	public Cycle updateCycle(Cycle cycle, Integer id) {

		Optional<Cycle> cycleOpt = cycleRepo.findById(id);
		Cycle updatedCycle = null;
		if(cycleOpt.isPresent()) {
			updatedCycle = cycleOpt.get();
			updatedCycle.setName(cycle.getName());
			updatedCycle.setPeriodStart(cycle.getPeriodStart());
			updatedCycle.setPeriodDuration(cycle.getPeriodDuration());
			updatedCycle.setCycleLength(cycle.getCycleLength());
			updatedCycle.setVolume(cycle.getVolume());
			updatedCycle.setNotes(cycle.getNotes());
			cycleRepo.saveAndFlush(updatedCycle);
			
		}
		return updatedCycle;
	}

	@Override
	public boolean deleteCycleById(Integer id) {
		
			try {
				cycleRepo.deleteById(id);
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
		
			
		}
	}

