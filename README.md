## Event Tracker Project

#### Weekend Project for Skill Distillery

### Overview
> This is an Event Tracker that uses Spring REST C.R.U.D. API and helps women keep track of their monthly cycle. In addition to tracking their cycle length and frequency, users can document period related changes.

---
### **Table of REST Endpoints**
**HTTP Verb**| **URI**| **Request Body**|**Response Body**|
--------|--------|--------|--------|--------|
**GET** | api/cycles|       |Collection of all *cycles entries* |
**GET** | api/cycles/{id}| | Representation of entry at id number-- {id}|
**GET** | api/cycles/search/{name}| | Collection of all *cycles entries* with name-- {name}|
**POST** | api/cycles| Representation of new *cycle* entry| Description of the result of the operation|
**PUT** | api/cycles/{id}| Representation of a *new version* of entry at id number--{id}| |
**DELETE** | api/cycles/{id}| | | **Delete** route


## Tech Used
