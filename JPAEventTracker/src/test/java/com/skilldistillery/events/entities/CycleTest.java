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

public class CycleTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	
	private Cycle cycle;
	
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
		cycle = em.find(Cycle.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		cycle = null;
	}

	@Test //
	@DisplayName("testing that cycle mapping work")
	void test1() {
		assertNotNull(cycle);
		assertEquals("march log", cycle.getName());
		assertEquals(8, cycle.getPeriodDuration());
		assertEquals("2020-03-22", cycle.getPeriodStart().toString());
		assertEquals(23, cycle.getCycleLength());
		assertEquals(Volume.HEAVY, cycle.getVolume());
		
		

		
		
	}
		
		
		
	}