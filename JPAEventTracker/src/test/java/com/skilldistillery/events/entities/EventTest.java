package com.skilldistillery.events.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class EventTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	
	private Event event;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("TrackerPU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		event = em.find(Event.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		event = null;
	}

	@Test //
	@DisplayName("testing that event mapping work")
	void test1() {
		assertNotNull(event);
		assertEquals("Coco", event.getName());

		
		
	}
		
		
		
	}