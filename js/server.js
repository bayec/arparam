const http = require("http");
const fs = require("fs");

function getEncodeConfig() {
  const mainResolution = document.getElementById("main-resolution")
    .selectedIndex;

  let mainResolutionWidth = 0;
  let mainResolutionHeight = 0;
  switch (mainResolution) {
    case 0:
      mainResolutionWidth = 2592;
      mainResolutionHeight = 1944;
      break;
    case 1:
      mainResolutionWidth = 2560;
      mainResolutionHeight = 1440;
      break;
    case 2:
      mainResolutionWidth = 1920;
      mainResolutionHeight = 1080;
      break;
    case 3:
      mainResolutionWidth = 1280;
      mainResolutionHeight = 720;
      break;
    default:
      break;
  }

  const secondResolution = document.getElementById("second-resolution")
    .selectedIndex;

  let secondResolutionWidth = 0;
  let secondResolutionHeight = 0;
  switch (secondResolution) {
    case 0:
      secondResolutionWidth = 1280;
      secondResolutionHeight = 720;
      break;
    case 1:
      secondResolutionWidth = 704;
      secondResolutionHeight = 576;
      break;
    case 2:
      secondResolutionWidth = 640;
      secondResolutionHeight = 360;
      break;
    case 3:
      secondResolutionWidth = 352;
      secondResolutionHeight = 288;
      break;
    default:
      break;
  }

  const mainBitrateIndex = document.getElementById("main-bitrate")
    .selectedIndex;
  const secondBitrateIndex = document.getElementById("second-bitrate")
    .selectedIndex;

  const mainStreamResultVo = {
    codeType: document.getElementById("main-encode-mode").selectedIndex + 1,
    profile: document.getElementById("main-profile").selectedIndex + 1,
    resolutionWidth: mainResolutionWidth,
    resolutionHeight: mainResolutionHeight,
    fps: parseInt(document.getElementById("main-fps").value),
    bitrateType: document.getElementById("main-bitrate-type").selectedIndex + 1,
    picQual: document.getElementById("main-quality").selectedIndex + 1,
    bitrate: parseInt(
      document.getElementById("main-bitrate").options[mainBitrateIndex].value
    ),
    frameInterval: parseInt(
      document.getElementById("main-frame-interval").value
    ),
    openAudio: document.getElementById("main-audio").checked ? 1 : 2,
  };

  const subStreamResultVo = {
    codeType: document.getElementById("second-encode-mode").selectedIndex + 1,
    profile: document.getElementById("second-profile").selectedIndex + 1,
    resolutionWidth: secondResolutionWidth,
    resolutionHeight: secondResolutionHeight,
    fps: parseInt(document.getElementById("second-fps").value),
    bitrateType:
      document.getElementById("second-bitrate-type").selectedIndex + 1,
    picQual: document.getElementById("second-quality").selectedIndex + 1,
    bitrate: parseInt(
      document.getElementById("second-bitrate").options[secondBitrateIndex]
        .value
    ),
    frameInterval: parseInt(
      document.getElementById("second-frame-interval").value
    ),
    openAudio: document.getElementById("second-audio").checked ? 1 : 2,
  };

  const videoStreamResultVo = {
    mainStreamResultVo: mainStreamResultVo,
    subStreamResultVo: subStreamResultVo,
  };

  // console.log(JSON.stringify(videoStreamResultVo));

  return videoStreamResultVo;
}

function getOsdConfig() {
  const eqptOsdResultVo = {
    right1: document.getElementById("custom1-title").value,
    right2: document.getElementById("custom2-title").value,
    right3: document.getElementById("custom3-title").value,
    right4: document.getElementById("custom4-title").value,
    left4: document.getElementById("channel-title").value,
  };

  // console.log(JSON.stringify(eqptOsdResultVo));

  return eqptOsdResultVo;
}

function get28181Config() {
  const nvrIpcResultVo = {
    accessEnable28181: document.getElementById("enable-28181").checked ? 1 : 0,
    chnlResultVo: [
      {
        alarmChnl: document.getElementById("alarm-id").value,
        audioChnl: document.getElementById("audio-id").value,
        chnlAcct: document.getElementById("video-id").value,
      },
    ],
    eqptAcct: document.getElementById("device-id").value,
    eqptName: document.getElementById("device-name").value,
    eqptPwd: document.getElementById("device-password").value,
    heartCycle: parseInt(document.getElementById("heart-cycle").value),
    ip: document.getElementById("sip-server-ip").value,
    isOpen35114: document.getElementById("enable-35114").checked ? 1 : 0,
    port: document.getElementById("sip-server-port").value,
    regisInterval: 60,
    servDomain: document.getElementById("sip-server-domain").value,
    servId: document.getElementById("sip-server-id").value,
    streamIndex: document.getElementById("stream-index").selectedIndex + 1,
    timeOutCoungt: parseInt(document.getElementById("timeout-count").value),
    validPeriod: parseInt(document.getElementById("valid-period").value),
  };

  // console.log(JSON.stringify(nvrIpcResultVo));

  return nvrIpcResultVo;
}

function get1400Config() {
  const eqpt1400ResultVo = {
    accessEnable1400: document.getElementById("enable-1400").checked ? 1 : 0,
    eqptAcct: document.getElementById("1400-device-id").value,
    eqptPwd: document.getElementById("1400-password").value,
    heartCycle: parseInt(document.getElementById("1400-heart-cycle").value),
    ip: document.getElementById("1400-server-ip").value,
    port: document.getElementById("1400-server-port").value,
    timeOutCoungt: parseInt(
      document.getElementById("1400-timeout-count").value
    ),
    userName: document.getElementById("1400-username").value,
  };

  // console.log(JSON.stringify(eqpt1400ResultVo));

  return eqpt1400ResultVo;
}

function saveConfig() {
  const jsonConfig = {
    eqpt1400ResultVo: get1400Config(),
    nvrIpcResultVo: get28181Config(),
    eqptOsdResultVo: getOsdConfig(),
    videoStreamResultVo: getEncodeConfig(),
  };
  fs.writeFile("./local.json", JSON.stringify(jsonConfig), "utf8", (err) => {
    alert("保存成功!");
  });
}

const server = http.createServer((req, res) => {
  // TODO(lichen): 后续这里改成状态栏显示
  console.log("Recv a request, method: " + req.method + " url: " + req.url);

  if (req.url === "/api/dghyExtEqpt/getGbEqptSipInfo") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    const jsonConfig = {
      eqpt1400ResultVo: get1400Config(),
      nvrIpcResultVo: get28181Config(),
      eqptOsdResultVo: getOsdConfig(),
      videoStreamResultVo: getEncodeConfig(),
    };
    // console.log(JSON.stringify(jsonConfig));

    res.end(
      JSON.stringify({
        result: window.btoa(JSON.stringify(jsonConfig)),
        code: "1",
        msg: "成功",
      })
    );
  } else {
    // TODO(lichen): 这里改成一个错误提示
    console.error(`请求url(${req.url})非法!`);
    res.statusCode = 404;
    res.end();
  }
});

let isOn = false;
function startServer() {
  // TODO(lichen): 改成从本机获取
  const hostname = "192.168.100.5";

  if (isOn) {
    document.getElementById("port").disabled = false;
    document.getElementById("start-server").value = "启动服务";
    server.close();
  } else {
    const port = document.getElementById("port").value;
    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
    document.getElementById("port").disabled = true;
    document.getElementById("start-server").value = "关闭服务";
  }
  isOn = !isOn;
}
