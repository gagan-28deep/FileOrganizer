const path = require("path");
const fs = require("fs");
const { dir } = require("console");

let types = { dsa: ["java", "class"] };

function organizerFolder(dirPath) {
  let desPath;
  if (dirPath == undefined) {
    console.log("Please enter a valid path");
    return;
  }
  let doesExist = fs.existsSync(dirPath);

  if (doesExist == true) {
    desPath = path.join(dirPath + "/");

    if (fs.existsSync(desPath) == false) {
      fs.mkdirSync(desPath);
    } else {
      console.log("Folder already Exists");
    }
  } else {
    console.log("Please enter a valid path");
  }

  organizer_helper(dirPath, desPath);
}

function organizer_helper(src, dest) {
  let childnames = fs.readdirSync(src);
  //   Will give everything present inside directory
  //   console.log(childnames);
  for (let i = 0; i < childnames.length; i++) {
    let childAddress = path.join(src, childnames[i]);
    //   Full path to childNames
    //   console.log(childAddress)

    let isFile = fs.lstatSync(childAddress).isFile();

    if (isFile == true) {
      // console.log(childAddress + "    " + isFile)

      let fileCategory = getCategory(childnames[i] , dest);
    //   console.log(childnames[i] + " Belongs to -> " + fileCategory)
        

      sendFiles(childAddress , dest , fileCategory)
    }
  }
}

function getCategory(Filename , dest) {
  for(let i = 0 ; i<Filename.length ; i++){

    let baseName = path.basename(Filename);
    baseName = baseName.split(".")[0];
    let folderPath = path.join(dest  + baseName);
    // console.log(folderPath)
    dirCreator(folderPath);
    // getCategory(Filename , dest)
  }
  let ext = path.extname(Filename).slice(1);
  // console.log(ext)
  for (let key in types) {
    let cTypeArr = types[key];
    // console.log(cTypeArr);

    for (let i = 0; i < cTypeArr.length; i++) {
      if (ext == cTypeArr[i]) {
        return key;
      }
    }
  }
}

function dirCreator(FolderPath) {
  if (FolderPath == undefined) {
    console.log("Enter a valid Path");
  } 
     else if(fs.existsSync(FolderPath)){
        //   console.log("Folder ALready Exists")
          return
      }
    else{

        fs.mkdirSync(FolderPath);
    }
}


function sendFiles(srcFilePath , dest  ,fileCategory , FolderPath){
    // console.log(srcFilePath)

    let baseName = path.basename(srcFilePath);
    baseName = baseName.split(".")[0];
    let folderPath = path.join(dest  + baseName);
    
    console.log(folderPath)
    
    let filename = path.basename(srcFilePath)
    // console.log(filename)

    let destFilePath = path.join(folderPath, filename)
    // console.log(destFilePath)

    fs.copyFileSync(srcFilePath , destFilePath)
    
    fs.unlinkSync(srcFilePath)

    console.log("FIles Organized")
}

module.exports = {
  organizerFolderKey: organizerFolder,
};
