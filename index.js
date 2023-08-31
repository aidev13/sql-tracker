const inquirer = require('inquirer');
const connection = require('./db/connect') //mysql2 connection

const mainMenu = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'mainList',
                message: 'Please select from the following:',
                choices: [
                    'View All Departments',
                    'View All Employees',
                    'View All Positions',
                    'Add a department',
                    'Add an employee',
                    'Add a position',
                    'Update employee status/position',
                    'Exit app'
                ]
            }
        ])
        .then(({ mainList }) => {
            if (mainList === 'View All Departments') {
                console.log('| DEPARTMENTS |')
                allDept();
            }
            else if (mainList === 'View All Employees') {
                console.log('| EMPLOYEES |')
                allEmployees()
            }
            else if (mainList === 'View All Positions') {
                console.log('| POSITIONS |')
                allPositions()
            }
            else if (mainList === 'Add a department') {
                console.clear()
                addDept()
            }
            else if (mainList === 'Add an employee') {
                console.clear()
                addEmployee()
            }
            else if (mainList === 'Add a position') {
                console.clear()
                addPosition()
            }
            else if (mainList === 'Update employee status/position') {
                console.clear()
                // console.log('!! Try Again Later !!')
                // subOptions()
                updateEmployee()
            }
            else if (mainList === 'Exit app') {
                console.clear()
                console.log('Bye!')
                process.exit()
            }
        })
        .catch((err) => {
            throw err
        });
};

// calling main menu on node load
mainMenu()

// --- Departments ---
// view all current department
const allDept = async () => {
    const sql = `SELECT * FROM departments`;
    const [getdata] = await connection.promise().query(sql);
    console.table(getdata);
    subOptions();
}
// add a department
const addDept = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'deptInput',
                message: 'Please enter a new department name: ',
            }
        ])
        .then(({ deptInput }) => {
            const sql = `INSERT INTO departments (name) VALUES ('${deptInput}')`
            connection.query(sql);
            subOptions();
        })
}


// --- Employees ---
const allEmployees = async () => {
    const sql = `SELECT * FROM employees`;
    const [getdata] = await connection.promise().query(sql);
    console.table(getdata);
    subOptions();
}
// add an employee
const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter employees first name: ',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter employees last name: ',
            },
            {
                type: 'input',
                name: 'position_id',
                message: 'Enter a position ID: ',
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter a managers ID for employees: '
            }
        ])
        .then(({ first_name, last_name, position_id, manager_id }) => {
            const sql = `INSERT INTO employees (first_name, last_name, position_id, manager_id) VALUES ('${first_name}', '${last_name}', '${position_id}', '${manager_id}')`
            connection.query(sql, (err, result) => {
                if (err) throw err
            })
            subOptions();
        })
}


// --- Positions ---
const allPositions = async () => {
    const sql = `SELECT * FROM positions`;
    const [getdata] = await connection.promise().query(sql);
    console.table(getdata);
    subOptions();
}
// add a position
const addPosition = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter position title: ',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter salary: ',
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter department ID: '
            }
        ])
        .then(({ title, salary, department_id }) => {
            const sql = `INSERT INTO positions (title, salary, department_id) 
            VALUES ('${title}', '${salary}', '${department_id}')`
            connection.query(sql, (err, result) => {
                if (err) throw err
            })
            subOptions();
        })
}

// updating employee
const updateEmployee = async () => {
    // get list of employees and  id
    // get list of position id
const [POSITIONS] = await connection.promise().query(`SELECT title, id FROM positions`)
const [employees] = await connection.promise().query(`SELECT * FROM employees`)
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'employeeID',
                message: 'Which employee do you want to update? ',
                choices: employees.map(employee => {
                    return {
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }
                }) 
            },
            {
                type: 'list',
                name: 'updatedPosition',
                message: 'Enter new position: ',
                choices: POSITIONS.map(position => {
                    return {
                        name: position.title,
                        value: position.id
                    }
                }) 
            }
        ])
        .then(({ employeeID, updatedPosition }) => {
            const sql = `UPDATE employees SET position_id = ? WHERE employees.id = ?`
            connection.query(sql, [updatedPosition, employeeID], (err, result) => {
                if (err) throw err
            })

            subOptions();
        })
}



// function to allow user to select another option...
const subOptions = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'confirmBack',
                message: "Select an option:",
                choices: [
                    'Main Menu',
                    'Exit app'
                ]
            }
        ])
        .then(({ confirmBack }) => {
            if (confirmBack === 'Main Menu') {
                console.clear()
                mainMenu()
            } else if (confirmBack === 'Exit app') {
                console.clear()
                console.log('Bye!')
                process.exit()
            }

        })
        .catch((err) => {
            throw err
        })
}


module.exports = mainMenu