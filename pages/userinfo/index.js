const app = getApp()
Page({
  data: {
    userInfo:''
  },

  onLoad: function (options) {
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    }
  },
  handleNickName:function(e){
    console.log(e)
    let  nickName = e.detail.value
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  }
})