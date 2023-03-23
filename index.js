const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");

const teamMembers = [];

function createEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeName",
        message: "Enter the employee's name:",
      },
      {
        type: "list",
        name: "role",
        message: "Select the employee's role:",
        choices: ["Manager", "Intern", "Engineer"],
      },
      {
        type: "input",
        name: "employeeId",
        message: "Enter the employee's ID:",
      },
      {
        type: "input",
        name: "employeeEmail",
        message: "Enter the employee's email:",
      },
    ])
    .then(({ role, employeeName, employeeId, employeeEmail }) => {
      switch (role) {
        case "Manager":
          inquirer
            .prompt([
              {
                type: "input",
                name: "officeNum",
                message: "Enter the manager's office number:",
              },
            ])
            .then(({ officeNum }) => {
              teamMembers.push(
                new Manager(employeeName, employeeId, employeeEmail, officeNum)
              );

              addAnother();
            });
          break;
        case "Intern":
          inquirer
            .prompt([
              {
                type: "input",
                name: "schoolName",
                message: "Enter the intern's school name:",
              },
            ])
            .then(({ schoolName }) => {
              teamMembers.push(
                new Intern(employeeName, employeeId, employeeEmail, schoolName)
              );

              addAnother();
            });
          break;
        case "Engineer":
          inquirer
            .prompt([
              {
                type: "input",
                name: "githubUsername",
                message: "Enter the engineer's GitHub username:",
              },
            ])
            .then(({ githubUsername }) => {
              teamMembers.push(
                new Engineer(
                  employeeName,
                  employeeId,
                  employeeEmail,
                  githubUsername
                )
              );

              addAnother();
            });
          break;
        default:
          console.warn("Invalid selection.");
      }
    });
}

function addAnother() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "addMore",
        message: "Do you want to add another employee?",
      },
    ])
    .then(({ addMore }) => {
      if (addMore) createEmployee();
      else {
        console.log(teamMembers);
        generateHTMLFile(teamMembers);
      }
    });
}

function generateHTMLFile(team) {
  // TODO: Write code to generate the HTML file using the 'team' array
}

createEmployee();
