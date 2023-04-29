const { prompt, default: inquirer } = require("inquirer");
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
          value: "VIEW_All_ROLES",
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
    }
  });
}

function viewEmployees() {
  db.findAllEmployees().then(function ([allEmployees]) {
    console.table(allEmployees);
  });
}
