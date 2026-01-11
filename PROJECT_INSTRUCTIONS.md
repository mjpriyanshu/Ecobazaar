# EcoBazaar Project Structure & Coding Style Guide

## Full-Stack Web Application: Spring Boot + React

---

## Project Structure

```
ecobazaar/
├── ecobazaar-frontend/              # React frontend (Vite + TailwindCSS)
│   ├── public/                      # Static assets (SVGs, images)
│   ├── src/
│   │   ├── assets/                  # Images, icons, and assets.js export file
│   │   ├── components/              # Reusable UI components
│   │   ├── pages/                   # Page-level components
│   │   ├── lib/                     # Utility functions
│   │   ├── context/                 # React Context providers
│   │   ├── App.jsx                  # Main app component with routing
│   │   ├── main.jsx                 # Entry point
│   │   ├── App.css                  # Tailwind imports
│   │   └── index.css                # Global styles
│   ├── package.json                 # Dependencies and scripts
│   └── vite.config.js              # Vite configuration with Tailwind
│
└── ecobazaar/                      # Spring Boot backend
    ├── src/
    │   ├── main/
    │   │   ├── java/com/infosys/springboard/ecobazaar/
    │   │   │   ├── config/          # Security, CORS, Password configs
    │   │   │   ├── controller/      # REST API controllers
    │   │   │   ├── entity/          # JPA entities (models)
    │   │   │   ├── repository/      # Spring Data JPA repositories
    │   │   │   ├── service/         # Business logic layer
    │   │   │   ├── dto/             # Data Transfer Objects
    │   │   │   ├── security/        # JWT utilities, filters
    │   │   │   ├── exception/       # Custom exceptions & handlers
    │   │   │   └── EcoBazaarApplication.java  # Main application
    │   │   └── resources/
    │   │       └── application.properties  # Configuration
    │   └── test/                    # Unit and integration tests
    ├── pom.xml                      # Maven dependencies
    └── target/                      # Compiled classes (ignored in git)
```

---

## Frontend Coding Style & Patterns

### Technology Stack
- **React 19** with functional components and hooks
- **Vite** as build tool
- **TailwindCSS v4** for styling
- **React Router DOM** for routing
- **Axios** for HTTP requests
- **Lucide React** for icons
- **React Hot Toast** for notifications (optional)

### Component Structure Pattern

```javascript
import React, { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const ComponentName = () => {
  // 1. Context hooks first
  const { user, setUser, token } = useContext(AppContext)
  
  // 2. Navigation hooks
  const navigate = useNavigate()
  
  // 3. Refs
  const inputRef = useRef()
  
  // 4. State variables
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  // 5. Event handlers
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const response = await axios.post('/api/auth/login', formData)
      if (response.data.success) {
        setUser(response.data.user)
        navigate('/dashboard')
      } else {
        setError(response.data.message)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }
  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  
  // 6. useEffect hooks
  useEffect(() => {
    // Check authentication, fetch data, etc.
  }, [])
  
  // 7. Main return
  return (
    <div className='min-h-screen bg-gradient-to-b from-green-50 to-white'>
      {/* JSX content */}
    </div>
  )
}

export default ComponentName
```

### Styling Conventions (TailwindCSS v4)
- Use **utility classes exclusively**
- Background overlays: `bg-white/10`, `bg-green-500/30`
- Responsive classes: `md:grid-cols-2`, `max-md:hidden`, `max-sm:text-sm`
- Backdrop effects: `backdrop-blur-lg`
- Gradient buttons: `bg-gradient-to-r from-green-500 to-green-600`
- Shadows: `shadow-md`, `hover:shadow-xl`
- Transitions: `transition`, `hover:scale-105`
- Custom colors: Use green as primary theme (green-50 to green-900)

### Context Pattern (Global State)

```javascript
import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [loading, setLoading] = useState(true)
  
  // Set axios default headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      localStorage.setItem('token', token)
    } else {
      delete axios.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
    }
  }, [token])
  
  // API functions
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password })
      if (response.data.success) {
        setToken(response.data.token)
        setUser(response.data.user)
        return { success: true }
      }
      return { success: false, message: response.data.message }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' }
    }
  }
  
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }
  
  return (
    <AppContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      loading,
      login,
      logout
    }}>
      {children}
    </AppContext.Provider>
  )
}
```

### Assets Management

Create `assets/assets.js` to centralize all imports:

```javascript
import logo from './logo.svg'
import heroImage from './hero.png'
import productPlaceholder from './product.jpg'

const assets = {
  logo,
  heroImage,
  productPlaceholder
}

export default assets
```

Usage: `<img src={assets.logo} alt="Logo" />`

### Axios Configuration

Create `lib/axios.js`:

```javascript
import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default instance
```

---

## Backend Coding Style & Patterns (Spring Boot)

### Technology Stack
- **Java 21**
- **Spring Boot 4.0.1**
- **Spring Data JPA** for database operations
- **Spring Security** with JWT authentication
- **MySQL/PostgreSQL** (or H2 for development)
- **Maven** for dependency management
- **Lombok** for reducing boilerplate
- **Validation API** for input validation

### Entity Pattern (JPA Model)

```java
package com.infosys.springboard.ecobazaar.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String role = "USER";
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

**Key Points:**
- Use `@Entity` for JPA entities
- Use `@Table(name = "table_name")` to specify table names
- Use Lombok `@Data` to auto-generate getters/setters
- Use `@Column` annotations for constraints
- Include timestamp fields with `@CreationTimestamp` and `@UpdateTimestamp`

### Repository Pattern (Spring Data JPA)

```java
package com.infosys.springboard.ecobazaar.repository;

import com.infosys.springboard.ecobazaar.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
}
```

**Key Points:**
- Extend `JpaRepository<Entity, ID>`
- Spring Data JPA auto-implements basic CRUD
- Use method naming conventions for custom queries
- Use `@Query` for complex queries

### DTO Pattern (Data Transfer Objects)

```java
package com.infosys.springboard.ecobazaar.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequest {
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}
```

```java
package com.infosys.springboard.ecobazaar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data);
    }
    
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message, null);
    }
}
```

### Service Layer Pattern

```java
package com.infosys.springboard.ecobazaar.service;

import com.infosys.springboard.ecobazaar.dto.LoginRequest;
import com.infosys.springboard.ecobazaar.dto.SignupRequest;
import com.infosys.springboard.ecobazaar.entity.User;
import com.infosys.springboard.ecobazaar.repository.UserRepository;
import com.infosys.springboard.ecobazaar.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    public String signup(SignupRequest request) {
        // Validation
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        // Create user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");
        
        userRepository.save(user);
        
        return "User registered successfully";
    }
    
    public String login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        return jwtUtil.generateToken(user.getEmail());
    }
}
```

**Key Points:**
- Use `@Service` annotation
- Use constructor injection with `@RequiredArgsConstructor` (Lombok)
- Keep business logic in service layer
- Throw custom exceptions for error handling

### Controller Pattern (REST API)

```java
package com.infosys.springboard.ecobazaar.controller;

import com.infosys.springboard.ecobazaar.dto.ApiResponse;
import com.infosys.springboard.ecobazaar.dto.LoginRequest;
import com.infosys.springboard.ecobazaar.dto.SignupRequest;
import com.infosys.springboard.ecobazaar.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<String>> signup(@Valid @RequestBody SignupRequest request) {
        try {
            String message = authService.signup(request);
            return ResponseEntity.ok(ApiResponse.success(message, null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> login(@Valid @RequestBody LoginRequest request) {
        try {
            String token = authService.login(request);
            return ResponseEntity.ok(ApiResponse.success("Login successful", token));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}
```

**Key Points:**
- Use `@RestController` for REST APIs
- Use `@RequestMapping` for base path
- Use `@CrossOrigin` to allow frontend requests
- Use `@Valid` for automatic validation
- Return `ResponseEntity<ApiResponse<T>>` for consistent responses
- Use try-catch for error handling

### Security Configuration

```java
package com.infosys.springboard.ecobazaar.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    
    private final JwtAuthenticationFilter jwtAuthFilter;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}
```

### JWT Utility

```java
package com.infosys.springboard.ecobazaar.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final long EXPIRATION_TIME = 86400000; // 24 hours
    
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY)
                .compact();
    }
    
    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    
    public boolean isTokenValid(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
```

### Application Properties

```properties
# Server Configuration
server.port=8080
spring.application.name=EcoBazaar

# Database Configuration (MySQL)
spring.datasource.url=jdbc:mysql://localhost:3306/ecobazaar
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=your-secret-key-here
jwt.expiration=86400000

# CORS
cors.allowed-origins=http://localhost:5173
```

---

## Key Requirements & Best Practices

### General
- **File Naming:**
  - Frontend: PascalCase for components (`HomePage.jsx`), camelCase for utilities
  - Backend: PascalCase for classes (`UserController.java`), camelCase for methods
- **Import Style:** ES6 imports for frontend, Java imports for backend
- **Error Handling:** Consistent try-catch blocks with user-friendly messages
- **Response Format:** `{success: boolean, message: string, data?: any}`

### Frontend
- **State Management:** React Context for global state, `useState` for local state
- **Authentication:** JWT tokens in `localStorage`, axios interceptors
- **Styling:** Mobile-first responsive design with TailwindCSS
- **Code Organization:** Separate components, pages, context, lib
- **Environment Variables:** `VITE_API_URL` for backend URL

### Backend
- **Layered Architecture:** Controller → Service → Repository → Entity
- **Dependency Injection:** Constructor injection with Lombok `@RequiredArgsConstructor`
- **Validation:** Use Jakarta Validation annotations (`@Valid`, `@NotBlank`, etc.)
- **Exception Handling:** Global exception handler with `@ControllerAdvice`
- **Security:** JWT-based stateless authentication
- **CORS:** Configure for frontend origin
- **Database:** Use migrations or `ddl-auto=update` for dev

### API Endpoint Convention
```
POST   /api/auth/signup       - Register new user
POST   /api/auth/login        - Login user
GET    /api/products          - Get all products
GET    /api/products/:id      - Get product by ID
POST   /api/products          - Create product (admin)
PUT    /api/products/:id      - Update product (admin)
DELETE /api/products/:id      - Delete product (admin)
```

---

## Development Workflow

### Frontend Development
```bash
cd ecobazaar-frontend
npm install
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
```

### Backend Development
```bash
cd ecobazaar
./mvnw clean install # Build project
./mvnw spring-boot:run # Run application (http://localhost:8080)
```

### Testing
- **Frontend:** Vitest or Jest
- **Backend:** JUnit 5 with Spring Boot Test

---

## Git Convention
```
feat: Add user authentication
fix: Resolve login form validation
style: Update homepage design
refactor: Restructure product service
docs: Update API documentation
```

---

This guide ensures consistency across the full-stack EcoBazaar project for current and future developers.
