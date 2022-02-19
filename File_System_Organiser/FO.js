// We will be creating a File System Organizer
//Features of the Project
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in specific directory according to their extension
// like text files will go into text File Folder .exe files will go into application folder and so on
// so at the end you will have a arranged set of files in specific folders
const helpModule = require("../commands/help");

const organizeModule = require("../commands/organize");

const treeModule = require("../commands/tree");

const organizeFolderModule = require("../commands/organizeFolder");
// const { dir } = require('console')

let input = process.argv.slice(2);

let input_arr = input; // [organzie , folderpath]

let command = input_arr[0];

switch (command) {
  case "tree":
    treeModule.treeKey(input_arr[1]);
    break;
  case "organizefolder":
    organizeFolderModule.organizerFolderKey(input_arr[1]);
    break;
  case "help":
    helpModule.helpFnkey();
    break;
  case "organize":
    organizeModule.organizeKey(input_arr[1]);
    break;
  default:
    console.log("Invalid input");
}
