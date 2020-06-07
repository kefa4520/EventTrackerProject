package com.skilldistillery.events.controllers;

import java.beans.PropertyEditorSupport;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.events.entities.Cycle;
import com.skilldistillery.events.services.CycleService;

@RestController
@RequestMapping("api")
public class CycleController {
	
	
	@Autowired
	private CycleService cycleSvc;
	
	@GetMapping("cycles")
	public List<Cycle> index(){
		return cycleSvc.findAll();
		
	}
	
	@GetMapping("cycles/{id}")
	public Cycle findCycleById(@PathVariable Integer id, HttpServletResponse response) {
		Cycle cycle = cycleSvc.findCycleById(id);
		if(cycle == null) {
			response.setStatus(404);
			
		}
		return cycle;
	}
	
	@PostMapping("cycles")
	public Cycle createCycle( 
			@RequestBody Cycle cycle,   
			HttpServletRequest request,
			HttpServletResponse response
	) {
		try {
			cycle = cycleSvc.addCycle(cycle);
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(cycle.getId());
			response.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			cycle = null;
		}
		return cycle;
	}
	
	@PutMapping("cycles/{id}")
	public Cycle updateCycle(@PathVariable Integer id,
			@RequestBody Cycle cycle,
			HttpServletResponse response
	) {
		try {
			cycle = cycleSvc.updateCycle(cycle, id);
			if (cycle == null) {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			cycle = null;
		}
		return cycle;
	}
	
	@DeleteMapping("cycles/{id}")
	public void deleteCycleById(
			@PathVariable Integer id,
			HttpServletResponse response
	) {
		try {
			if (cycleSvc.deleteCycleById(id)) {
				response.setStatus(204);
			}
			else {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(409);
		}
	}
	
	
	//*************************************************
	@InitBinder
	public void initBinder(WebDataBinder webDataBinder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat timeFormat = new SimpleDateFormat("HH:MM");
		dateFormat.setLenient(true);
		webDataBinder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
		webDataBinder.registerCustomEditor(LocalDate.class, new PropertyEditorSupport() {
			@Override
			public void setAsText(String text) throws IllegalArgumentException {
				setValue(LocalDate.parse(text, DateTimeFormatter.ofPattern("yyyy-MM-dd")));
			}
			@Override
			public String getAsText() throws IllegalArgumentException {
				return DateTimeFormatter.ofPattern("yyyy-MM-dd").format((LocalDate) getValue());
			}
		});
		webDataBinder.registerCustomEditor(LocalTime.class, new PropertyEditorSupport() {
			@Override
			public void setAsText(String text) throws IllegalArgumentException {
				setValue(LocalTime.parse(text, DateTimeFormatter.ofPattern("HH:MM")));
			}
			@Override
			public String getAsText() throws IllegalArgumentException {
				return DateTimeFormatter.ofPattern("HH:MM").format((LocalDate) getValue());
			}
		});
}
	

}
