DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (

);

CREATE TABLE role (
    title,
    salary,
    department_id
    -- what constraints?
);

CREATE TABLE employee (
    first_name,
    last_name,
    role_id,
    manager_id
    -- what happens when something is deleted?
);