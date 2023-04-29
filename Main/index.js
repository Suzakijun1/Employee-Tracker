const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

init();

//Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  loadMainPrompts();
}

function loadMainPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View All Departments",
          value: "VIEW_ALL_DEPARTMENTS",
        },
        {
          name: "View All Roles",
          value: "VIEW_ALL_ROLES",
        },
        {
          name: "Add An Employee",
          value: "ADD_AN_EMPLOYEE",
        },
        {
          name: "Add A Role",
          value: "ADD_A_Role",
        },
        {
          name: "Add An Department",
          value: "ADD_AN_DEPARTMENT",
        },
        {
          name: "Update An Employee",
          value: "UPDATE_AN_EMPLOYEE",
        },
      ],
    },
  ]).then((response) => {
    switch (response.choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_ALL_DEPARTMENTS":
        viewAllDepartments();
        break;
      case "VIEW_ALL_ROLES":
        viewAllRoles();
        break;
      case "ADD_AN_DEPARTMENT":
        addDepartment();
        break;
      case "ADD_AN_EMPLOYEE":
        addEmployee();
        break;
    }
  });
}

function viewEmployees() {
  db.findAllEmployees()
    .then(function ([allEmployees]) {
      console.table(allEmployees);
    })
    .then(function () {
      loadMainPrompts();
    });
}

function viewAllDepartments() {
  db.findAllDepartments()
    .then(function ([allDepartments]) {
      console.table(allDepartments);
    })
    .then(function () {
      loadMainPrompts();
    });
}

function viewAllRoles() {
  db.findAllRoles()
    .then(function ([allRoles]) {
      console.table(allRoles);
    })
    .then(function () {
      loadMainPrompts();
    });
}

function addDepartment() {
  prompt([
    {
      name: "name",
      type: "input",
      message: "What would you like the department name to be?",
    },
  ])
    .then(function (answer) {
      db.addDepartment(answer);
    })
    .then(function () {
      console.log("Success!");
      loadMainPrompts();
    });
}

async function addEmployee() {
  let roles = await db.getRoles();
  let roleChoices = roles.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const manager = await db.getManager();
  const managerChoices = manager.map((manager) => ({
    firstName: manager.first_name,
    lastName: manager.last_name,
    value: manager.manager_id,
  }));
  await prompt([
    {
      name: "firstName",
      type: "input",
      message: "What is the first name of the employee?",
    },
    {
      name: "lastName",
      type: "input",
      message: "What is the last name of the employee?",
    },

    {
      name: "roleId",
      type: "list",
      message: "What is the employee's role?",
      choices: roleChoices,
    },
    {
      name: "managerId",
      type: "list",
      message: "What is the employee's role?",
      choices: managerChoices,
    },
  ])
    .then(function (answer) {
      db.addEmployee(answer);
    })
    .then(function () {
      console.log("Employee added successfully!");
    });
}
