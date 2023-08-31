-- seeds.sql is for placeholder data

-- syntax
-- INSERT INTO #table_name (#column_names) VALUES 
-- ('#data'),
-- ('#data');


-- departments
INSERT INTO departments (name) VALUES
('Office'),
('Sales'),
('Tech');

-- ppositions
INSERT INTO positions (title, salary, department_id) VALUES
('Office Rep', 40000, department_id),
('Sales Person', 45000, department_id),
('Install Tech', 50000, department_id),
('Service Tech', 55000, department_id),
('Operartions', 65000, department_id);

-- employees
INSERT INTO employees (first_name, last_name, position_id, manager_id) VALUES
('David', 'Liebherr', 1, manager_id),
('John', 'Doe', 2, manager_id),
('Ben', 'Garrison', 3, manager_id),
('Danny', 'Greco', 4, manager_id),
('Nancy', 'Desandras', 5, manager_id),
('Russal', 'Zein', 6, manager_id),
('Heather', 'Repp', 7, manager_id);