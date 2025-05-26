# Student CRUD App

## Overview
A simple student management system app using:
- **Backend**: Spring Boot with JPA
- **Database**: MYSQL

## Backend Technologies
- **Spring Boot** - Framework for building REST APIs
- **Spring Data JPA** - Database interaction with PostgreSQL
- **Spring Boot Starter Web** - For building web applications
- **Spring Boot Starter Test** - Testing utilities
- **MYSQL** - Relational database for persistent storage

## Setup
### Backend:
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/Student-CRUD-App.git
   cd job-site-backend/spring-boot-rest
   ```
2. Configure `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/fullstack
   spring.datasource.username=root
   spring.datasource.password=password
   ```
3. Build and run:
   ```sh
   mvn spring-boot:run
   ```


## API Endpoints
| Method | Endpoint         | Description      |
|--------|-----------------|------------------|
| GET    | /api/jobs       | Get all jobs    |
| GET    | /api/jobs/{id}  | Get job by ID   |
| POST   | /api/jobs       | Create a job    |
| PUT    | /api/jobs/{id}  | Update a job    |
| DELETE | /api/jobs/{id}  | Delete a job    |

## License
MIT License
