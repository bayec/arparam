layui.use(["element", "form", "layer", "slider"], function () {
  const form = layui.form;
  const layer = layui.layer;

  //自定义验证规则
  form.verify({
    fps: function (value) {
      if (value < 1 || value > 25) {
        return "帧率范围 [1,25]";
      }
    },
    interval: function (value) {
      if (value < 25 || value > 150) {
        return "I帧间隔范围 [25,150]";
      }
    },
    sipid: function (value) {
      if (value.length != 20) {
        return "长度必须是 20 位!";
      }
    },
    ip: function (value) {
      const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if (!reg.test(value)) {
        return "不是合法的 ip 地址!";
      }
    },
    port: function (value) {
      if (value < 1024 || value > 65535) {
        return "用户端口号范围 [1024,65535]";
      }
    },
    heartbeat: function (value) {
      if (value < 1) {
        return "心跳周期不小于 1 秒!";
      }
    },
    timeout: function (value) {
      if (value < 1) {
        return "心跳超时次数不小于 1 次!";
      }
    },
    valid: function (value) {
      if (value < 1) {
        return "注册有效期不小于 1 秒!";
      }
    },
  });

  form.on("select(main-resolution)", function (data) {
    // console.log(data.value); //得到被选中的值
    if (data.value == "5M(2592*1944)" || data.value == "2K(2560*1440)") {
      // TODO(lichen): 改成对话框提示是否更合适？
      layer.tips("此分辨率只适用 DV300 型号!", "#main-resolution");
    }
  });

  form.on("submit(save-encode-config)", function (data) {
    layer.msg(JSON.stringify(data.field));
    return false;
  });

  form.on("submit(save-osd-config)", function (data) {
    layer.msg(JSON.stringify(data.field));
    return false;
  });

  form.on("submit(save-28181-config)", function (data) {
    layer.msg(JSON.stringify(data.field));
    return false;
  });

  form.on("submit(save-1400-config)", function (data) {
    layer.msg(JSON.stringify(data.field));
    return false;
  });
});
