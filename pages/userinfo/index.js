const app = getApp();
const { http } = require('../../utils/api.js');
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
  saveUserinfo(){
    let params = {
      openId:"oxDGv4v3KDex3laEUYrGxj4f32fM",
      photoUrl: app.globalData.userInfo.avatarUrl,
      name:"app.globalData.userInfo.nickName",
      phone:"18739898900",
      address:"杭州西湖",
      personalSignature:"啦啦啦，啦啦啦"
    }
    http('post', 'insertMotherUser', params)
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  }
})