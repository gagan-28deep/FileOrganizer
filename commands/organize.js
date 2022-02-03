// Organize function will organize all the target folder files in different folders acc to their extension.
const path = require('path')
const fs = require('fs')


let types = {
  media: ["mp4", "mkv", "mp3"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
};

function organizefn(dirPath) {
    let destPath;
    if (dirPath == undefined) {
      console.log("Please enter a Valid Directory Path");
      return;
      // Check whether directory path is passed or not , return if not
    }
  
    let doesExist = fs.existsSync(dirPath);
    // This doesexists will tell if Target Folder Exists or not.
  
    if (doesExist == true) {
      destPath = path.join(dirPath, "organized_files");
      // We created a path for "Organized_file" folder
  
      // Check whether in the given destPath , does a folder with same name exists or not , if not make a folder
      if (fs.existsSync(destPath) == false) {
        fs.mkdirSync(destPath);
      } else {
        console.log("Folder Already Exists");
      }
    } else {
      console.log("Please enter a valid Path");
    }
  
    organize_helper(dirPath, destPath);
  }
  
  function organize_helper(src, dest) {
    let childnames = fs.readdirSync(src);
    // console.log(childnames)
  
    for (let i = 0; i < childnames.length; i++) {
      let childAddress = path.join(src, childnames[i]);
      // console.log(childAddress)
  
      let isFile = fs.lstatSync(childAddress).isFile();
  
      if (isFile == true) {
        //   console.log(childAddress + " " + isFile);
        let fileCatgery = getcategory(childnames[i]);
        //   console.log(childnames[i] + " Belongs to " + fileCatgery);
  
        sendFiles(childAddress, dest, fileCatgery);
      }
    }
  }
  
  function getcategory(Filename) {
    let ext = path.extname(Filename).slice(1);
    // We extracted extension names of the target files
    // console.log(ext)
  
    for (let key in types) {
      let cTypeArr = types[key];
      // We took out all the Category type Arrays here
      // console.log(cTypeArr)
  
      for (let i = 0; i < cTypeArr.length; i++) {
        if (ext == cTypeArr[i]) {
          return key;
        }
      }
    }
  
    return "others";
  }
  
  function sendFiles(srcFilePath, dest, fileCatgery) {
    let catPath = path.join(dest, fileCatgery);
  
    if (fs.existsSync(catPath) == false) {
      fs.mkdirSync(catPath);
    }
  
    let fileName = path.basename(srcFilePath);
    //   console.log(fileName)
  
    let destFilePath = path.join(catPath, fileName);
    //   console.log(destFilePath)
  
    fs.copyFileSync(srcFilePath, destFilePath);
  
    fs.unlinkSync(srcFilePath);
  
    console.log("FIleS Organiized");
}


module.exports = {
    organizeKey : organizefn
}

