const login = require('/utils/login.js')

App({
  onLaunch: function () {
    wx.getLocation({
      success: function (res) {
        console.log(res)
      },
    })
    // 切换环境版本 1、正式环境（正式数据）2、正式环境（验证数据）3、测试环境
    // var versionState = 3;
    // this.globalData.versionState = versionState
    // this.versionSwitch(versionState);
    // login.getOpenId();  // 获取openId && 做持久化登录
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
  // getBaseLocaltionParams: function () {
  //   this.authLocation((res) => {
  //     if (res) {
  //       this.getLocaltionParams((res) => {
  //         if (res) {
  //           this.globalData.locationParams = res
  //         } else {

  //         }
  //       })
  //     } else {

  //     }
  //   })
  // },
  // 版本切换
  // versionSwitch: function (value) {
  //   switch (value) {
  //     case 1:
  //       this.globalData.apiServer = 'https://app-api.wbtech.com/tma';
  //       this.globalData.tpsServer = 'https://tps-api.wbtech.com/app/';
  //       this.globalData.globalPlatformId = 'SX*HSY*0001';
  //       break;
  //     case 2:
  //       this.globalData.apiServer = 'https://app-api.wbtech.com/tma';
  //       this.globalData.tpsServer = 'https://tps-api.wbtech.com/app/';
  //       this.globalData.globalPlatformId = 'SX*YZ*0001';
  //       break;
  //     case 3:
  //       this.globalData.apiServer = 'https://test-wx.wbtech.com/tma';
  //       this.globalData.tpsServer = 'http://116.228.222.130:9003/app/';
  //       this.globalData.globalPlatformId = 'SX*HSY*0001';
  //       break;
  //     default:
  //       this.globalData.apiServer = 'https://app-api.wbtech.com/tma';
  //       this.globalData.tpsServer = 'https://tps-api.wbtech.com/app/';
  //       this.globalData.globalPlatformId = 'SX*HSY*0001';
  //       break;
  //   }
  // },
  globalData: {
    version: '1.0.0', // 版本号

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
  // 位置授权并获取省市区
  authLocation: function (callback) {
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success: (res) => {
              callback(true)
            },
            fail: (res) => {
              callback(false)
            }
          })
        } else {
          callback(true)
        }
      },
      fail: (res) => {
        callback(false)
      }
    })
  },
  // 获取省市区经纬度
  getLocaltionParams: function (callback) {
    // 获取经纬度
    wx.getLocation({
      type: 'gcj02',  // 默认为 wgs84 返回 GPS 坐标；gcj02 返回国测局坐标
      success: (res) => {
        var locations = res.latitude + ',' + res.longitude
        this.getLocationMessage({ lat: res.latitude, lng: res.longitude })
          .then((r) => {
            callback && callback(r)
          })
          .catch(() => {
            callback && callback(false)
          })
      },
      fail: (res) => {
        callback && callback(false)
      }
    })
  },
  //经纬度转对应位置信息
  getLocationMessage: function (params) {
    let lat = params.lat        //纬度
    let lng = params.lng
    let coordtype = params.coordtype ? params.coordtype : 'gcj02ll'
    return new Promise((resolve, reject) => {
      if (coordtype == 'gcj02ll') {           //若传入的为国测局坐标 先转成百度
        this.getBdlnglat({ locations: lng + ',' + lat }, (res) => {
          if (res) {
            lng = res[0].x
            lat = res[0].y
            let params = { lat, lng }
            this.bdGeocoder(params, (r) => {
              if (r) {
                resolve(r)
              } else {
                reject(false)
              }
            })
          } else {
            reject(false)
          }
        })
      } else {
        this.bdGeocoder(params, (d) => {
          if (d) {
            resolve(d)
          } else {
            reject(false)
          }
        })
      }
    })
  },
  /* 纬度在前 
** coordtype 表示传入的坐标系 默认bd09ll
*/
  bdGeocoder: function (params, callback) {
    let data = {
      location: params.lat + ',' + params.lng,
      output: 'json',
      ak: this.globalData.baiduAK
    }
    if (params.coordtype) {
      data.coordtype = params.coordtype
    }
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/',
      data,
      header: { 'content-type': 'application/json' },
      success: (res) => {
        let data = res.data
        if (data.status == 0) {
          let result = data.result
          let locationMessage = {
            city: result.addressComponent.city,
            district: result.addressComponent.district,
            province: result.addressComponent.province,
            lat: params.lat,
            lng: params.lng
          }
          callback && callback(locationMessage)
        } else {
          callback && callback(false)
        }
      }, fail: () => {
        callback && callback(false)
      }
    })
  },
  // 获取百度经纬度//经度在前 //默认将国测局坐标系转成百度坐标系
  getBdlnglat: function (params, call) {
    params.from = params.from ? params.from : 3
    params.to = params.to ? params.to : 5
    wx.request({
      url: 'https://api.map.baidu.com/geoconv/v1/',
      data: { ak: this.globalData.baiduAK, from: params.from, to: params.to, coords: params.locations },
      header: { 'content-type': 'application/json' },
      success: (res) => {
        let data = res.data
        if (data.status == 0) {
          let locations = data.result
          call && call(locations)
        } else {
          call && call(false)
        }
      }, fail: () => {
        call && call(false)
      }
    })
  }
})
