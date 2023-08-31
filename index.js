const inquirer = require('inquirer');
const connection = require('./db/connect') //mysql2 connection (if needed)

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
                    'Update employee status',
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
            connection.query(`INSERT INTO departments (name) VALUES ('${deptInput}')`);
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
                message: 'Enter a managers ID for employee: ',
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