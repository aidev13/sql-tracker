DROP DATABASE IF EXISTS general_db;
CREATE DATABASE general_db;

USE general_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45),
    PRIMARY KEY (id)
    
);

CREATE TABLE positions (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(45),
    salary DECIMAL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(45),
    last_name VARCHAR(45),
    position_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (id)
    FOREIGN KEY (position_id) REFERENCES positions(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);

