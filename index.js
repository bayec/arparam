const { app, BrowserWindow, dialog, Menu, screen } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");

  // 自定义菜单栏
  const packageJson = require("./package.json");
  const appMenu = [
    {
      label: "文件",
      submenu: [
        { label: "导入配置" },
        { label: "导出配置" },
        {
          label: "退出",
          click: () => {
            win.close();
          },
        },
      ],
    },
    {
      label: "帮助",
      submenu: [
        {
          label: "使用说明",
          click: () => {
            // 打开使用说明页面
            win.loadFile("help.html");
          },
        },
        {
          label: "关于",
          click: () => {
            dialog.showMessageBoxSync(win, {
              type: "none",
              title: "关于",
              message: packageJson.description,
              detail:
                "版本: " +
                packageJson.version +
                "\n" +
                "作者: " +
                packageJson.author,
            });
          },
        },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(appMenu));

  // TODO(lichen): 后续改成按下F12启动开发者工具
  // win.openDevTools();
}

app.whenReady().then(() => {
  // 获取屏幕宽和高
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  console.log(`width:${width}, height:${height}`);

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
