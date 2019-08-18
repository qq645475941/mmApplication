// 获取openid接口
function getOpenId(callback) {
  // if (wx.showLoading){
  //   wx.showLoading({ title: '加载中', mask: true })
  // }

  wx.login({
    success: res => {
      wx.request({
        url: getApp().globalData.apiServer + '/api/getOpenId',
        data: {
          js_code: res.code
        },
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function(sres) {
          var data = sres.data;
          if (data) {
            if (data.code == 1) {
              var openId = data.data;
              console.log('当前用户openid：' + openId)
              getApp().globalData.openId = openId;
              callback && callback()
              // getWxLoginInfo(openId);
              loginComplete();
            } else {
              loginErr();
            }
          } else {
            loginErr();
          }
        },
        fail: function(fres) {
          console.log(fres);
          loginErr();
        },
        complete: function() {
          // if (wx.hideLoading){
          //   wx.hideLoading()
          // }
        }
      })
    }
  })
}

// 根据openid获取用户登录信息
function getWxLoginInfo(openId) {
  // if (wx.showLoading)
  //   wx.showLoading({
  //     title: '加载中',
  //     mask: true
  //   })
  wx.showLoading({
    title: '加载中'
  })
  var postdata = {
    openId: openId,
    globalPlatformId: getApp().globalData.globalPlatformId,
  };
  var params = {
    postdata: JSON.stringify(postdata)
  };
  wx.request({
    url: getApp().globalData.apiServer + '/carrier/getWxLoginInfo',
    data: params,
    method: 'POST',
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    success: function(res) {
      wx.hideLoading()
      var data = res.data;
      if (data) {
        if (data.code == 1) {
          getApp().globalData.logoutComplete = false;
          var userInfoData = JSON.parse(data.data);
          console.log(userInfoData)
          var publicPicUrl = userInfoData.publicPicUrl;
          if (typeof(publicPicUrl) != "undefined" && publicPicUrl != 'undefined' && publicPicUrl != null) {
            getApp().globalData.picServer = userInfoData.publicPicUrl;
            console.log('返回的图片路径：' + userInfoData.publicPicUrl)
          }
          // 定时入口轮询间隔
          getApp().globalData.pollingSec = userInfoData.pollingSec * 1000;
          // GPS定位信息轮询间隔
          getApp().globalData.pollingSecGPS = userInfoData.pollingSecGPS * 1000;

          getApp().globalData.userId = userInfoData.user_id;
          getApp().globalData.globalUserType = userInfoData.globalUserType //账号身份
          getApp().getBaseLocaltionParams()
          setInterval(() => {
            getApp().getBaseLocaltionParams()
          }, getApp().globalData.pollingSecGPS)
          try {
            wx.setStorageSync(getApp().globalData.userSessionKey, userInfoData)
          } catch (e) {
            console.log("setStorageSync => 保存用户缓存信息失败")
          }
          var accountList = userInfoData.accountList;
          var userType = userInfoData.globalUserType;

          let signaturePicFlag = userInfoData.signaturePicFlag;
          if (userType != '' || userType != null) {
            switch (userType) {
              case "GR":
                //                   if (isEmpty(userInfoData.driverCatalog)) {
                //                     userInfoData.driverCatalog = 'N'
                //                   }
                if (signaturePicFlag == "1") {
                  wx.reLaunch({
                    url: '/pages/first/signature'
                  });
                  return
                }
                if (userInfoData.driverCatalog == 'Y') {
                  var mydata = {};
                  mydata.openId = getApp().globalData.openId;
                  mydata.userId = getApp().globalData.userId;
                  mydata.globalPlatformId = getApp().globalData.globalPlatformId;
                  mydata.globalLoginType = getApp().globalData.globalLoginType;
                  mydata.globalFromType = getApp().globalData.globalFromType;
                  mydata.globalUserType = getApp().globalData.globalUserType;
                  mydata.statusDesc = 'transport';
                  mydata.fromRow = 0;
                  mydata.toRow = 20;
                  var params = {
                    postdata: JSON.stringify(mydata)
                  };
                  wx.request({
                    url: getApp().globalData.apiServer + '/driver/delivery.list',
                    data: params,
                    method: 'POST',
                    header: {
                      "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(res) {
                      var data = res.data
                      if (data.code == 1) {
                        var dataFmt = JSON.parse(data.data);
                        if (dataFmt.length > 0) {
                          wx.reLaunch({
                            url: '/pages/first/newTransporting'
                          });
                        } else {
                          wx.reLaunch({
                            url: getApp().globalData.loginInitPage
                          })
                        }
                      }else{
                        wx.showModal({
                          title: '提示',
                          content: data.message?data.message:'网络故障',
                          showCancel:false,
                          success:function(){
                            wx.reLaunch({
                              url: '/pages/first/index'
                            })
                          }
                        })
                      }
                    },
                    fail: function() {
                      wx.reLaunch({
                        url: getApp().globalData.loginInitPage,
                      })
                    }
                  })
                } else {
                  wx.redirectTo({
                    url: '/pages/first/set'
                  })
                }
                break;
              case "JJR":
                if(!getApp().globalData.isAllowJJR){
                  notAllowJJR()
                  return
                }
                if (getApp().globalData.loginInitPage =='/pages/resource/index'){
                  getApp().globalData.loginInitPage = '/pages/middleman/index/index'
                }
                wx.reLaunch({
                  url: getApp().globalData.loginInitPage
                });
                // wx.reLaunch({ url: '/middleman/guidance/index' });
                break;
              case "GS":
                if (!getApp().globalData.isAllowJJR) {
                  notAllowJJR()
                  return
                }
                if (getApp().globalData.loginInitPage == '/pages/resource/index') {
                  getApp().globalData.loginInitPage = '/pages/middleman/index/index'
                }
                wx.reLaunch({
                  url: getApp().globalData.loginInitPage
                });
                // wx.reLaunch({ url: '/pages/logistics/certification/index' });
                break;
            }
          } else {
            getApp().globalData.globalUserType = 'GR';
            wx.reLaunch({
              url: '/pages/user/authentication/step1'
            })
          }
        } else {
          if(openId){
            wx.reLaunch({
              url: '/pages/user/loginCode'
            })
          }else{
            loginErr()
          }
        }
      } else {
        if (openId) {
          wx.reLaunch({
            url: '/pages/user/loginCode'
          })
        } else {
          loginErr()
        }
      }
    },
    fail: function(res) {
      console.log(res)
      wx.hideLoading()
      wx.showModal({
        title: '系统提示',
        content: getApp().globalData.failMsg,
        showCancel: false,
        success: () => {
          loginErr()
        }
      })
    },
    complete: function() {
      // if (wx.hideLoading)
      //   wx.hideLoading()
    }
  })
}

// 登录完成
function loginComplete() {
  console.log("--- 初始化openid完成 ---")
  getApp().globalData.openIdComplete = true;
}

// 登录失败
function loginErr() {
  console.log("--- 获取openid登录失败 ===> 跳转error页 ---")
  // 跳转至异常页
  wx.redirectTo({
    url: '/pages/user/error'
  })
  loginComplete();
}

// 判断字符串是否为空
function isEmpty(value) {
  if (typeof(value) == "undefined" || value == 'undefined' || value == null)
    return true;
  value = (value + '').replace(/(^\s+)|(\s+$)/g, "");
  if (value == '')
    return true;
  return false;
}

function driverQuery(callback) {
  var postdata = {
    openId: getApp().globalData.openId,
    globalPlatformId: getApp().globalData.globalPlatformId,
    userId: getApp().globalData.userId,
    globalUserType: getApp().globalData.globalUserType,
    globalLoginType: getApp().globalData.globalLoginType,
    globalFromType: getApp().globalData.globalFromType
  }
  var params = {
    postdata: JSON.stringify(postdata)
  };
  var opt = {
    url: getApp().globalData.apiServer + '/driver/driver.query',
    data: params,
    method: 'POST',
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    success: function(res) {
      wx.hideLoading()
      let data = res.data
      if (data.code == 1) {
        callback && callback(JSON.parse(data.data))
        console.log(JSON.parse(data.data))
      } else {
        if (isEmpty(data.message)) {
          data.message = '未知错误'
        }
        wx.showToast({
          title: data.message
        })
      }
    }
  }
  wx.showLoading({
    title: '加载中'
  })
  wx.request(opt)
}
function notAllowJJR(){
  wx.showModal({
    title: '温馨提示',
    content: "非司机账户登录功能正在开发中，敬请期待！",
    showCancel: false,
    confirmText: "好的",
    success: function (res) {
      if (res.confirm) {
        var mydata = {};
        // 全局参数
        mydata.openId = getApp().globalData.openId;
        mydata.userId = getApp().globalData.userId;
        mydata.globalPlatformId = getApp().globalData.globalPlatformId;
        mydata.globalLoginType = getApp().globalData.globalLoginType;
        mydata.globalFromType = getApp().globalData.globalFromType;
        mydata.globalUserType = getApp().globalData.globalUserType;
        var params = {
          postdata: JSON.stringify(mydata)
        };
        wx.request({
          url: getApp().globalData.apiServer + '/carrier/logout',
          data: params,
          method: 'POST',
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            var data = res.data
            if (data.code == 1) {
              getApp().globalData.logoutComplete = true;
              try {
                wx.removeStorageSync(getApp().globalData.userSessionKey);
              } catch (e) {
                console.log("removeStorageSync => 删除用户缓存信息失败")
              }

            }
          },
          fail: function () {
            wx.showModal({
              title: '系统提示',
              content: getApp().globalData.failMsg,
              showCancel: false
            })
          },
          complete: function () { }
        })
        // wx.reLaunch({
        //   url: '/pages/user/loginCode'
        // })
      }
    }
  })
}
// 定义
module.exports = {
  getOpenId: getOpenId,
  getWxLoginInfo: getWxLoginInfo
}