#!/usr/bin/env node

'esversion: 6';

const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const fs = require("fs");
const {
    cwd
} = require("process");
const pathBase = process.cwd(); // Get current working directory.

const msn = (msn) => {
    console.log(
        chalk.bold.red(
            figlet.textSync(msn, {
                font: "ANSI Shadow",
                horizontalLayout: "default",
                verticalLayout: "default",
            })
        )
    );
}; // Customize our nice message.
const queryParams = () => { //Questions!
    const qs = [{
            name: "name",
            type: "input",
            message: "Please specify your game name.\n",
        },
        {
            name: "port",
            type: "input",
            message: "Please specify your preferred Port.\n",
        },
        {
            name: "gameid",
            type: "input",
            message: "Please specify your game ID.\n",
        },
        {
            name: "local",
            type: "confirm",
            message: "Run the server locally?.\n",
        },
        {
            name: "template",
            type: "list",
            message: "Select a template",
            choices: [
                "Empty Installation",
                "Data Saving Template",
                "Sword Fighting Template",
                "Gun Fighting Template",
            ],
        },
        {
            name: "version",
            type: "list",
            message: "Select a node-hill version. (Latest is the best)",
            choices: [
                "Node-Hill 8.5.0 [Important Fixes]",
                "Node-Hill 8.4.6 [MessageAll replacement]",
                "Node-Hill 8.4.5 [Security patch]",
                "Node-Hull 8.4.4 [Various Fixes]",
                "Node-Hill 8.4.3 [Player Moved Event]",
                "Node-hill 8.4.2 [Brick Collision Detection]",
            ],
        },
    ];
    return inquirer.prompt(qs);
};

const createFile = (data) => {
    try {
        var fs = require('fs');
        scripts = `${data.name}/user_scripts`
        maps = `${data.name}/maps`
        fs.mkdirSync(scripts,{recursive: true});
        fs.mkdirSync(maps, {recursive: true});
        fs.writeFile(`${process.cwd()}/${data.name}/user_scripts/index.js`, `console.log("Here goes your script bois!");`, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Done");
                });
        fs.writeFile(`${process.cwd()}/${data.name}/start.js`, `

// Generated using Node-Hill-CLI by Edge.
const nh = require('node-hill');

nh.startServer({
    gameId: ${data.gameid} , 
    port: ${data.port}, 
    local: ${data.local} , 
    map: './maps/example.brk', 
    scripts: './user_scripts', 
    modules: []
})
`, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Done");
        });
        switch (data.template) {
            case "Sword Fighting Template":
                console.log("Starting to generate files...");
                console.log("Sorry but this is work in progress!");


                break;
            case "Empty Installation":


                break;
            case "Data Saving Template":

                console.log("Generating Data Saving Template...");
                console.log("Sorry but this is work in progress!")

                break;
            case "Gun Fighting Template":
                console.log("Generating Gun Fighting Template...");
                console.log("Sorry but this is work in progress!")

                break;
            case null || undefined:
                console.log("Empty input, generating default...");
                break;
        }
    } catch (err) {
        console.log(err);
    } finally {
        console.log(`
      ------ CREATED ------\n
      The Template has been created.\n
      - PORT: ${chalk.blue.bold(data.port)}\n
      - TEMPLATE: ${chalk.blue.bold(data.template)}\n
      ----------------------------------\n
    `);
    }
};

// Invoke a function...
(async () => {
    msn("NH-CLI");
    createFile(await queryParams());
})();
