const login = require('/utils/login.js')

App({
  onLaunch: function () {
    wx.getLocation({
      success: function (res) {
        console.log(res)
      },
    })
    login.getOpenId();  // 获取openId && 做持久化登录
    this.isPhoneX()
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    openId:'',
    userInfo:'',
    version: '1.0.0', // 版本号
    motherId:'1',
    apiServer:'https://wechat.mamayy.com/mother/',
  },
  // 获取地理位置
  getLocation: function () {
    wx.getLocation({ type: 'wgs84' })
  },
  // 版本信息
  wxVersion: function () {
    wx.getSystemInfo({
      success: function (res) {
        console.log('手机型号：' + res.model)
        console.log('微信设置的语言：' + res.language)
        console.log('微信版本号：' + res.version)
        console.log('客户端平台：' + res.platform)
        console.log('客户端基础库版本：' + res.SDKVersion)
      }
    })
  },
  // 判断是否为X系列手机
  isPhoneX: function () {
    var type = wx.getSystemInfoSync().model
    if (type.search('iPhone X') != -1) {
      this.globalData.isPhoneX = true
    }
  },
})
