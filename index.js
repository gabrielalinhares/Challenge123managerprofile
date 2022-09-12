const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path"); // function to create path 
const fs = require("fs"); // function to create the external html file 
const TeamMembers = []; // array for the teams members 
const render = require("./src/htmlRenderer");

const ManagerQst = function () {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Lets build your team! Please input manager's name",
        name: "name",
      },
      {
        type: "input",
        message: "Please input manager's ID",
        name: "id",
      },
      {
        type: "input",
        message: "Please input  manager's email",
        name: "email",
      },
      {
        type: "input",
        message: "Please input  manager's office number",
        name: "officeNumber",
      },
    ])
    .then(function (mgr) { // assign teams to the manager 
      const manager = new Manager(
        mgr.name,
        mgr.id,
        mgr.email,
        mgr.officeNumber
      );
      TeamMembers.push(manager);
      addTeamMember();
    });
};

ManagerQst(); // calling manager questions function 

const addTeamMember = function () { // creating function to add the rest of the team members 
  inquirer
    .prompt([
      {
        type: "list",
        message: "Please select what type of employee do you want to add",
        name: "team",
        choices: ["Engineer", "Intern", "finish building my team"],
      },
    ])
    .then(function (teamMember) {
      switch (teamMember.team) {
        case "Engineer":
          EngineerQst();
          break;
        case "Intern":
          InternQst();
          break;
        case "finish building my team":
          const html = render(TeamMembers);
          write(html);
          return html;
        default:
          return TeamMembers;
      }
    });
};


const write = function (html) {// creatting function to create HTML File 
  const OUTPUT_DIR = path.resolve(__dirname, "dist");
  const outputPath = path.join(OUTPUT_DIR, "team.html");
  fs.writeFile(outputPath, html, function (err) {
    if (err) throw err;
    console.log("Team page generated!");
  });
};

const EngineerQst = function () {//defining function EngineerQst
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please input  engineer's name",
        name: "name",
      },
      {
        type: "input",
        message: "Please input engineer's ID?",
        name: "id",
      },
      {
        type: "input",
        message: "Please input engineer's email",
        name: "email",
      },
      {
        type: "input",
        message: "Please input engineer's GitHub",
        name: "github",
      },
    ])
    .then(function (eng) {
      const engineer = new Engineer(eng.name, eng.id, eng.email, eng.github);
      TeamMembers.push(engineer);
      addTeamMember();
    });
};


const InternQst = function () { //defining function to prompt intern questions
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please input intern's name",
        name: "name",
      },
      {
        type: "input",
        message: "Please input ntern's ID",
        name: "id",
      },
      {
        type: "input",
        message: "Please input intern's email",
        name: "email",
      },
      {
        type: "input",
        message: "Please input intern's school",
        name: "school",
      },
    ])
    .then(function (int) {
      const intern = new Intern(int.name, int.id, int.email, int.school);
      TeamMembers.push(intern);
      addTeamMember();
    });
};
