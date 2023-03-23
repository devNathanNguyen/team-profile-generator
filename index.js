import inquirer from "inquirer";
import { createRequire } from "module";
import Manager from "./lib/Manager.js";
import Engineer from "./lib/Engineer.js";
import Intern from "./lib/Intern.js";
import fs from "fs";

const require = createRequire(import.meta.url);
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

function managerCard(manager) {
  return `
  <div class="card w-96 bg-base-100 shadow-xl">
    <figure>
      <img
        src="images/manager.png"
        alt="manager"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        ${manager.name}
      </h2>
      <p>${manager.getRole()}</p>
      <div class="card-actions justify-end">
        <div class="badge badge-outline">${manager.email}</div>
        <div class="badge badge-outline">${manager.officeNumber}</div>
        <div class="badge badge-outline">${manager.id}</div>
      </div>
    </div>
  </div>
`;
}

function engineerCard(engineer) {
  return `
    <div class="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src="images/engineer.png"
          alt="engineer"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          ${engineer.name}
        </h2>
        <p>${engineer.getRole()}</p>
        <div class="card-actions justify-end">
        <div class="badge badge-outline">${engineer.email}</div>
        <div class="badge badge-outline">${engineer.github}</div>
        <div class="badge badge-outline">${engineer.id}</div>
        </div>
      </div>
    </div>
  `;
}

function internCard(intern) {
  return `
    <div class="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src="images/intern.png"
          alt="intern"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          ${intern.name}
        </h2>
        <p>${intern.getRole()}</p>
        <div class="card-actions justify-end">
        <div class="badge badge-outline">${intern.email}</div>
        <div class="badge badge-outline">${intern.school}</div>
        <div class="badge badge-outline">${intern.id}</div>
        </div>
      </div>
    </div>
  `;
}

function generateHTMLFile(team) {
  fs.writeFileSync(
    "./index.html",
    /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Our team</title>
      <link rel="stylesheet" href="./style.css">
    </head>
    <body>
        <div class="navbar bg-base-100">
            <header class="btn btn-ghost normal-case text-xl">Our team</header>
        </div>
            <div class = "container mx-auto mt-4">
                <div class = "flex flex-wrap justify-center">
                    ${teamMembers
                      .map((teamMember) => {
                        switch (teamMember.getRole()) {
                          case "Manager":
                            return managerCard(teamMember);
                          case "Engineer":
                            return engineerCard(teamMember);
                          case "Intern":
                            return internCard(teamMember);
                        }
                      })
                      .join("")}   
                </div>
            </div>
        </body>
    </html>
    `
  );
}
createEmployee();
