const { app, dialog, BrowserWindow, ipcMain } = require("electron");

if (require('electron-squirrel-startup')) app.quit();

const fs = require("fs");
const path = require("path");
const url = require("url");
const decompress = require("decompress");
const uuid = require("uuid");
const { stringify } = require("querystring");

let win;
let srcDir;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "build/index.html"),
      protocol: "file:",
      slashes: true,
    })
    
  );
  
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// ipcMain.on("toMain", (event, args) => {
//   if(args==="get-path"){
//     return app.getPath('home');
//   }
// });

ipcMain.handle("toMain", (event, args) => {
  // console.log("reached here");
  //dialog.showMessageBox({ title: "Message", message: "received + " + args });
  let result;
  if (args.command === "get-list") {
    result = getBooksData(); //app.getAppPath(); //app.getPath("home");
    console.log(result);
  } else if (args.command === "load-book") {
    loadBook(args.path);
  } else if (args.command === "add-book") {
    result = openFile();
  } else if (args.command === "remove-book") {
    result = removeBook(args.path);
  }
  return result;
});

async function getBooksData() {
  const errors = [];
  const booksData = [];
  srcDir = app.getAppPath() + "/books";
  if (!fs.existsSync(srcDir)) {
    errors.push("books folder was not found in the application folder");
  } else {
    const files = await fs.promises.readdir(srcDir);

    for (const file of files) {
      // Get the full paths
      const fullPath = path.join(srcDir, file);
      const stat = await fs.promises.stat(fullPath);
      if (!stat.isFile()) {
        console.log("processing", file);
        try {
          const book = {};
          book.data = JSON.parse(
            fs.readFileSync(srcDir + "/" + file + "/learnable.json", {
              encoding: "utf8",
              flag: "r",
            })
          );
          book.image = base64_encode(srcDir + "/" + file + "/cover.png");
          book.path = srcDir + "/" + file;
          booksData.push(book);
        } catch (err) {
          const errMessage = `Error while processing ${err.message}.`;
          errors.push(errMessage);
          console.error(errMessage);
        }
      }
    }
  }
  if (errors.length > 0) {
    fs.appendFile("error.txt", errors.join("\r\n"), function (err) {
      if (err) throw err;
    });
    dialog.showMessageBox({
      title: i18next.t('Error'),
      message:
        'Some errors occurred',
    });
  }
  return JSON.stringify(booksData);
}

function base64_encode(file) {
  try {
    return "data:image/png;base64," + fs.readFileSync(file, "base64");
  } catch (err) {
    throw err;
  }
}

function openFile() {
  dialog
    .showOpenDialog(win, {
      properties: ["openFile"],
      filters: [{ name: "Package files", extensions: ["zip", "oer"] }],
    })
    .then((result) => {
      console.log(result.canceled);
      console.log(result.filePaths);
      return installFile(result.filePaths[0]);
    })
    .catch((err) => {
      console.log(err);
    });
}

function installFile(zipFile) {
  const newDest = srcDir + "/" + uuid.v4();
  decompress(zipFile, newDest)
    .then((files) => {
      //console.log(files);
      dialog.showMessageBox({
        title: 'Success',
        message: "Package added. Please click Refresh button to see changes.",
      });
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  return false;
  //update books list in renderer
  // win.webContents.send("update-book-list", 1);
}

const loadBook = (book_path) => {
  const child = new BrowserWindow({ parent: win });
  const book = JSON.parse(
    fs.readFileSync(book_path + "/learnable.json", {
      encoding: "utf8",
      flag: "r",
    })
  );
  const entry = book.main ? book.main : "build/index.html";
  child.loadURL(
    url.format({
      pathname: path.join(book_path + "/" + entry),
      protocol: "file:",
      slashes: true,
    })
  );
  child.show();
  return true;
};

const removeBook = (book_path) => {
  try {
    fs.rmSync(book_path, { recursive: true });
    return true;
  } catch (err) {
    console.error(`Error while deleting ${err.message}.`);
    dialog.showMessageBox({ title: "Error", message: err.message });
  }
};
