const path = require('path')
const fs = require('fs')

function treefn(dirPath) {
  if (dirPath == undefined) {
    console.log("Please enter a valid Path");
    return;
  } else {
    let doesExist = fs.existsSync(dirPath);
    if (doesExist == true) {
      treehelper(dirPath, " ");
    }
  }
}

function treehelper(targetPath, indent) {
  let isFile = fs.lstatSync(targetPath).isFile();

  if (isFile == true) {
    let fileName = path.basename(targetPath);
    console.log(indent + " ├── " + fileName); // ├──  : includes
  } else {
    let dirName = path.basename(targetPath);
    console.log(indent + " └── " + dirName);

    let children = fs.readdirSync(targetPath);

    // console.log(children)
    for (let i = 0; i < children.length; i++) {
      // console.log(children[i])
      let childPath = path.join(targetPath, children[i]);
      treehelper(childPath, indent + "\t");
    }
  }
}

module.exports = {
  treeKey: treefn,
};
