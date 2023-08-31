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
                'Departments',
                'Employees',
                'Positions',
                'Exit app'
            ]
        }
    ])
    .then(({ mainList }) => {
             if(mainList === 'Departments') {
            console.log('| DEPARTMENTS |')
            allDept();
        } 
        else if(mainList === 'Employees') {
            console.log('| EMPLOYEES |')
            allEmployees()
        } 
        else if(mainList === 'Positions') {
            console.log('| POSITIONS |')
            allPositions()
        }
        else if(mainList === 'Exit app') {
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

// departments

const allDept = async () => {

    const sql = `SELECT * FROM departments`;
    const [getdata] = await connection.promise().query(sql);
    console.table(getdata);

    subOptions()
}


// employees
const allEmployees = async () => {

    const sql = `SELECT * FROM employees`;
    const [getdata] = await connection.promise().query(sql);
    console.table(getdata);

    subOptions()
}

// positions
const allPositions = async () => {

    const sql = `SELECT * FROM positions`;
    const [getdata] = await connection.promise().query(sql);
    console.table(getdata);

    subOptions()
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
            if(confirmBack === 'Main Menu'){
                console.clear()
                mainMenu()
            } else if(confirmBack === 'Exit app') {
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