var config = require('config.js');
function doLogin(fun) {
  wx.login({
    success: function (res) {
      if (res.code) {
        var code = res.code;
        //存在微信群信息
        if (wx.getStorageSync("shareTicket") != undefined && wx.getStorageSync("shareTicket") != '') {
          wx.login({
            success: function (shareLogin) {
              wx.getShareInfo({
                shareTicket: wx.getStorageSync("shareTicket"),
                success: function (shareInfo) {
                  loginAction(fun, code, shareLogin.code, shareInfo.encryptedData, shareInfo.iv);
                },
                fail: function (res) {
                  loginAction(fun, code);
                }
              });
            }
          })
        } else {
          loginAction(fun, code);
        }
      } else {
        wx.showToast({
          title: "登录失败",
          icon: "none"
        })
      }
    },
    fail: function () {
      wx.showToast({
        title: "登录失败",
        icon: "none"
      })
    }
  })
}

function loginAction(fun, code, groupCode, groupEncryptedData, groupIv) {
  wx.getUserInfo({ //getUserInfo流程
    success: function (userInfo) {
      var encryptedData = userInfo.encryptedData; //一定要把加密串转成URI编码
      var iv = userInfo.iv;
      var param = {
        encryptedData: encryptedData,
        code: code,
        iv: iv
      };
      var shareId = wx.getStorageSync("shareId");
      if (shareId != undefined && shareId != "") {
        param.shareUserId = shareId;
      }
      var scene = wx.getStorageSync("scene");
      if (scene != undefined && scene != "") {
        param.scene = scene;
      }
      if (groupCode != undefined && groupEncryptedData != undefined && groupIv != undefined) {
        param.groupEncryptedData = groupEncryptedData;
        param.groupIv = groupIv;
        param.groupCode = groupCode;
      }
      commonRequest({
        url: config.loginUrl,
        data: param,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: 'POST',
        successFun: function (res) {
          wx.removeStorageSync("shareId");
          wx.removeStorageSync("shareTicket");
          var now = Date.now();
          wx.setStorageSync('sessionIdExpire', now + res.data.data - 60000);
          if (res.header.sessionid == undefined) {
            wx.setStorageSync('sessionId', res.header.sessionId)
          } else {
            wx.setStorageSync('sessionId', res.header.sessionid)
          }
          if (res.header.dsmtoken == undefined) {
            wx.setStorageSync('dsmToken', res.header.dsmToken)
          } else {
            wx.setStorageSync('dsmToken', res.header.dsmtoken)
          }
          if (fun) {
            fun();
          }
        }
      });
    },
    fail: function (e) {
      wx.navigateTo({
        url: '/pages/userInfoAuth/userInfoAuth?code=' + code,
      })
    }
  })
}
function commonRequest(config) {
  if (config.data == undefined) {
    config.data = {};
  }
  if (config.header == undefined) {
    config.header = {};
  }
  if (config.login) {
    if (haveLogin()) {
      config.header.sessionId = wx.getStorageSync("sessionId");
      doRequest(config);
    } else {
      doLogin(function () {
        config.header.sessionId = wx.getStorageSync("sessionId");
        doRequest(config);
      });
    }
  } else {
    if (haveLogin()) {
      config.header.sessionId = wx.getStorageSync("sessionId");
    }
    doRequest(config);
  }

}

function doRequest(config) {
  wx.request({
    url: config.url,
    method: config.method,
    data: config.data,
    header: config.header,
    success: function (res) {
      if (res.data.code == "000000") {
        if (config.successFun) {
          config.successFun(res);
        }
      } else {
        wx.showToast({
          title: res.data.message,
          icon: "none"
        })
        if (config.failFun) {
          config.failFun(res);
        }
      }
    },
    fail: function (e) {
      wx.showToast({
        title: "服务器开了个小差，请稍后重试",
        icon: "none"
      })
      if (config.failFun) {
        config.failFun(e);
      }
    }
  });
}

function haveLogin() {
  var sessionId = wx.getStorageSync("sessionId");
  var sessionIdExpire = wx.getStorageSync("sessionIdExpire");
  var now = Date.now();
  if (sessionId != undefined && sessionId != "" &&
    sessionIdExpire != undefined && sessionIdExpire != '' && now < sessionIdExpire) {
    return true;
  } else {
    return false;
  }
}
function loginRequest(encryptedData, iv, code, fun) {
  var param = {
    encryptedData: encryptedData,
    code: code,
    iv: iv
  };
  var shareId = wx.getStorageSync("shareId");
  if (shareId != undefined && shareId != "") {
    param.shareUserId = shareId;
  }
  var scene = wx.getStorageSync("scene");
  if (scene != undefined && scene != "") {
    param.scene = scene;
  }
  commonRequest({
    url: config.loginUrl,
    data: param,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: 'POST',
    successFun: function (res) {
      wx.removeStorageSync("shareId");
      wx.removeStorageSync("shareTicket");
      var now = Date.now();
      wx.setStorageSync('sessionIdExpire', now + res.data.data - 60000);
      if (res.header.sessionid == undefined) {
        wx.setStorageSync('sessionId', res.header.sessionId)
      } else {
        wx.setStorageSync('sessionId', res.header.sessionid)
      }
      if (res.header.dsmtoken == undefined) {
        wx.setStorageSync('dsmToken', res.header.dsmToken)
      } else {
        wx.setStorageSync('dsmToken', res.header.dsmtoken)
      }
      if (fun) {
        fun();
      }
    }
  });
}

module.exports = {
  doLogin: doLogin,
  postGroup: postGroup,
  haveLogin: haveLogin,
  commonRequest: commonRequest,
  loginRequest: loginRequest
}