const app = getApp()
const util = require('../../utils/util.js')
const login = require('../../utils/login.js')

Page({
  data: {
    version: '',
    versionState: 1,
    items: [{ id: 1, name: '生产环境' }, { id: 2, name: '验证环境' }, { id: 3, name: '测试环境' }],
    radioId: '',
    btnHidden: true,
    countDown:3,                //倒计时
    countDownShow: false,       //倒计时是否显示
    ifDw: false,                //是否是端午
    dwImgNum:0
  },
  onLoad: function (options) {
    var versionState = app.globalData.versionState;
    this.setData({ versionState: versionState })

    util.showLoading()
    // var openIdInterval = setInterval(()=>{
    //   var openId = app.globalData.openId;
    //   var openIdComplete = app.globalData.openIdComplete;
    //   if (openIdComplete) {
    //     if (versionState == 1) {
    //       if (this.judgeDw()){
    //         this.setData({
    //           ifDw: true
    //         })
    //         let imgLoadId = setInterval(()=>{
    //           let dwImgNum = this.data.dwImgNum
    //           if (dwImgNum < 5) {
    //             return
    //           }else{
    //             clearInterval(imgLoadId)
    //             this.countDownJump()
    //           }
    //         },100)
    //       }else{
    //         login.getWxLoginInfo(openId);
    //       }
    //     }
    //     clearInterval(openIdInterval)
    //     util.hideLoading()
    //   }
    // }, 100);
  },
  // 判断是否是端午节
  judgeDw:function(){
    let nowTime = Date.now()
    // nowTime >= 1559836800000 && nowTime <= 1560096000000
    if (nowTime <= 1560096000000){
      return true
    }else{
      return false
    }
  },
  dwImgLoad:function(){
    let dwImgNum = this.data.dwImgNum
    dwImgNum = dwImgNum + 1
    this.setData({
      dwImgNum
    })
  },
  dwImgerr:function(){
    let dwImgNum = this.data.dwImgNum
    dwImgNum = dwImgNum + 1
    this.setData({
      dwImgNum
    })
  },
  // 倒计时跳转
  countDownJump:function(){
    this.setData({
      countDownShow: true
    })
    let countDown = this.data.countDown
    let openId = app.globalData.openId
    this.countDownId = setInterval(()=>{
      if (countDown<=0){
        login.getWxLoginInfo(openId)
        clearInterval(this.countDownId)
      }else{
        countDown = countDown-1
        this.setData({
          countDown
        })
      }
    },1000)
  },
  // 跳过倒计时
  jump:function(){
    let openId = app.globalData.openId
    login.getWxLoginInfo(openId)
    clearInterval(this.countDownId)
  },
  onReady: function () {
    this.setData({ version: app.globalData.version })
    var that = this;
    setTimeout(function(){
      that.setData({ btnHidden: false })
    }, 30000)
  },
  onShow: function () {
  },
  // 切换环境
  radioChange: function (e) {
    var radioId = e.detail.value;
    this.setData({ radioId: radioId })
  },
  // 选择环境
  selectVersionState: function (e) {
    var radioId = this.data.radioId;
    if (util.isEmpty(radioId)) {
      util.alert('请选择环境')
      return;
    }
    radioId = parseInt(radioId)

    switch (radioId) {
      case 1:
        app.globalData.apiServer = 'https://app-api.wbtech.com/tma';
        app.globalData.tpsServer = 'https://tps-api.wbtech.com/app/';
        app.globalData.globalPlatformId = 'SX*HSY*0001';
        break;
      case 2:
        app.globalData.apiServer = 'https://app-api.wbtech.com/tma';
        app.globalData.tpsServer = 'https://tps-api.wbtech.com/app/';
        app.globalData.globalPlatformId = 'SX*YZ*0001';
        break;
      case 3:
        app.globalData.apiServer = 'https://test-wx.wbtech.com/tma';
        app.globalData.tpsServer = 'http://116.228.222.130:9003/app/';
        app.globalData.globalPlatformId = 'SX*HSY*0001';
        break;
      default:
        app.globalData.apiServer = 'https://app-api.wbtech.com/tma';
        app.globalData.tpsServer = 'https://tps-api.wbtech.com/app/';
        app.globalData.globalPlatformId = 'SX*HSY*0001';
        break;
    }
    login.getWxLoginInfo(app.globalData.openId);
  },
  reloadGetWxLoginInfo: function(e){
    login.getWxLoginInfo(app.globalData.openId);
  },
  // 组织touch事件
  stopTouchMove:function(){
    return false;
  }
})