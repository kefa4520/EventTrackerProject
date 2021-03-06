## Event Tracker Project

#### Weekend Project for Skill Distillery

### Overview
> This is an Event Tracker that uses Spring REST C.R.U.D. API and helps women keep track of their monthly cycle. In addition to tracking their cycle length and frequency, users can document period related changes.

- Main view displays a list of previously recorded events;
- Clicking on a separate event displays detailed view for the event;
- Events can also be edited or deleted from the table;
- Aggregated data in the top right corner of the main view represents all cycles with the flow of type of "HEAVY". The count updates every time new event is added and marked as "HEAVY"


### Table of REST Endpoints
| Verb   |   URI  | Request Body | Description |
|--------|--------|--------------|-------------|
|  POST  | api/cycles | Representation of new *cycle* entry | Creates a new cycle entry |
|  GET   | api/cycles/{id} | Representation of entry at id number-- {id} | Retrieves a list of cycle entries by id |
|  PUT  | api/cycles/{id} | Representation of a *new version* of entry at id number--{id}| Updates an existing entry |
|  DELETE  | api/cycles/{id} | Representation of a *cycle* entry to be deleted | Removes a cycle entry by id |


## Tech Used
* MySQL, MySQL Workbench
* JPA/Hibernate
* Spring Boot
* Spring Data JPA
* Git/Github
* Postman
* Angular
* JavaScript

## Learning Objectives
- Created a JPA Project
- Created a Java entity class POJO that models the database table.
- Mapped POJO using JPA.
- Configured a Spring Boot app to publish a REST API.
- Used Spring REST annotations.
- Used Spring Data JPA to perform all CRUD operations.
- Practiced sending and receiving JSON.
