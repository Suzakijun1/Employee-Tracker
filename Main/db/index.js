const { getTable } = require("console.table");
const connection = require("./connection");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    return this.connection.promise().query(`SELECT * FROM employee`);
  }

  findAllDepartments() {
    return this.connection.promise().query(`SELECT * FROM department`);
  }

  findAllRoles() {
    return this.connection.promise().query(`SELECT * FROM role`);
  }
  addDepartment(department) {
    return this.connection
      .promise()
      .query(`INSERT INTO department SET ?`, department);
  }
  addEmployee(employee) {
    return this.connection
      .promise()
      .query(`INSERT INTO employee SET ?`, [employee]);
  }
  async getRoles() {
    return this.connection.promise().query(`SELECT * FROM role`);
  }
  getManager() {
    return this.connection
      .promise()
      .query(`SELECT first_name, last_name, manager_id FROM employee`);
  }
}

module.exports = new DB(connection);
