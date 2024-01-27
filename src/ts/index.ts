const { app, BrowserWindow } = require("electron")
const path = require("node:path")

// Loads the Electron window with the index.html file.
function createWindow() {
    const window = new BrowserWindow({
        width: 1200,
        height: 800,
        useContentSize: true,
        resizeable: false
    });

    window.loadFile("index.html")
}

// Runs createWindow when the app is ready to launch.
app.whenReady().then(() => {
    createWindow()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// Quits the window if the app is on Mac.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})