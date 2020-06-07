package com.skilldistillery.events.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Cycle {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
//	@JsonDeserialize(using = LocalDateDeserializer.class)
//    @JsonSerialize(using = LocalDateSerializer.class)
	@Column(name = "period_start")
	private LocalDate periodStart;
	
	
	@Column(name = "period_duration")
	private int periodDuration;
	
	@Column(name = "cycle_length")
	private int cycleLength;
	
	private String notes;
	
	@Enumerated(EnumType.STRING)
	private Volume volume;
	
	
	private String name;


	
	//methods

	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public LocalDate getPeriodStart() {
		return periodStart;
	}


	public void setPeriodStart(LocalDate periodStart) {
		this.periodStart = periodStart;
	}


	public int getPeriodDuration() {
		return periodDuration;
	}


	public void setPeriodDuration(int periodDuration) {
		this.periodDuration = periodDuration;
	}


	public int getCycleLength() {
		return cycleLength;
	}


	public void setCycleLength(int cycleLength) {
		this.cycleLength = cycleLength;
	}


	public String getNotes() {
		return notes;
	}


	public void setNotes(String notes) {
		this.notes = notes;
	}


	public Volume getVolume() {
		return volume;
	}


	public void setVolume(Volume volume) {
		this.volume = volume;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public Cycle(int id, LocalDate periodStart, int periodDuration, int cycleLength, String notes, Volume volume,
			String name) {
		super();
		this.id = id;
		this.periodStart = periodStart;
		this.periodDuration = periodDuration;
		this.cycleLength = cycleLength;
		this.notes = notes;
		this.volume = volume;
		this.name = name;
	}


	public Cycle() {
		super();
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Cycle other = (Cycle) obj;
		if (id != other.id)
			return false;
		return true;
	}


	@Override
	public String toString() {
		return "Cycle [id=" + id + ", periodStart=" + periodStart + ", periodDuration=" + periodDuration
				+ ", cycleLength=" + cycleLength + ", notes=" + notes + ", volume=" + volume + ", name=" + name + "]";
	}
	
	
	
}
