# EcoBazaar

EcoBazaar is a Spring Boot application designed as part of the Springboard Internship. It provides a platform for managing eco-friendly products and services.

## Project Structure

The project follows the standard Maven directory structure:

```
HELP.md
mvnw
mvnw.cmd
pom.xml
src/
  main/
    java/
      com/
        infosys/
          springboard/
            ecobazaar/
              EcoBazaarApplication.java
              config/
                PasswordConfig.java
                SecurityConfig.java
              controller/
                AuthController.java
              entity/
                User.java
              repository/
                UserRepository.java
              security/
                JwtUtil.java
              service/
  resources/
    application.properties
    static/
    templates/
  test/
    java/
      com/
        infosys/
          springboard/
            ecobazaar/
              EcoBazaarApplicationTests.java
```

## Key Files

### `pom.xml`
The Maven configuration file includes dependencies for:
- Spring Boot Starter Data JPA
- Spring Boot Starter Security
- Spring Boot Starter Validation
- Spring Boot Starter WebMVC

### `EcoBazaarApplication.java`
The main entry point for the Spring Boot application:
```java
@SpringBootApplication
public class EcoBazaarApplication {
    public static void main(String[] args) {
        SpringApplication.run(EcoBazaarApplication.class, args);
    }
}
```

### `application.properties`
Configuration for the application:
```properties
spring.application.name=EcoBazaar
spring.datasource.url=jdbc:mysql://localhost:3306/ecobazaar
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
server.port=8080
```

## Features

- **Authentication and Authorization**: Managed by `AuthController` and `SecurityConfig`.
- **User Management**: `User` entity and `UserRepository` for database operations.
- **JWT Security**: Implemented in `JwtUtil`.
- **Database Integration**: Configured with MySQL.

## How to Run

1. Clone the repository.
2. Ensure MySQL is running and update the `application.properties` file with your database credentials.
3. Build the project using Maven:
   ```bash
   ./mvnw clean install
   ```
4. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
5. Access the application at `http://localhost:8080`.

## License

This project is licensed under the Infosys Springboard Internship program.