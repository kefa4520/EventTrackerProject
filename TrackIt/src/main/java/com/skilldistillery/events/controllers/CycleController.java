package com.skilldistillery.events.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.events.services.CycleService;

@RestController
@RequestMapping("api")
public class CycleController {
	
	
	@Autowired
	private CycleService cycleSvc;

}
