const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    orderInon:[
      { imgPath: "/images/activity/activity.png", text: "全部",link: "?type=all"},
      { imgPath: "/images/activity/activity.png", text: "待开始", link: "?type=ready"},
      { imgPath: "/images/activity/activity.png", text: "进行中", link: "?type=doing"},
      { imgPath: "/images/activity/activity.png", text: "已结束", link: "?type=complated"},
    ],
    myInon:[
      { imgPath: "/images/others/rili.png", text: "活动日历", link: "/pages/calendar/calendar"},
      { imgPath: "/images/others/shoucang.png", text: "活动收藏", link: "/pages/activeShoucang/index"},
      { imgPath: "/images/others/guanzhu.png", text: "我的关注", link: "/pages/myAttention/index"},
      { imgPath: "/images/others/jifen.png", text: "我的积分", link: "/pages/myIntegral/index"},
      { imgPath: "/images/others/shanghu.png", text: "商户入口", link: "/pages/shanghu/index"},
      { imgPath: "/images/others/kefu.png", text: "联系客服",link: "dialogModal"},
      { imgPath: "/images/others/scan.png", text: "扫描二维码",link: "scanCode"},
      { imgPath: "/images/others/qiandao.png", text: "签到", link: "/pages/signIn/signIn"},
      { imgPath: "/images/others/gzh.png", text: "关注公众号",link: ""},
      { imgPath: "/images/others/headIcon.png", text: "业务合作", link: "/pages/yewuhezuo/index"},
      { imgPath: "/images/others/guanyu.png", text: "关于我们", link: "/pages/aboutMe/index"},
      { imgPath: "/images/others/yijian.png", text: "意见反馈", link: "/pages/yijianfankun/index"},
    ],

    dialogShow: false,
    buttons: [{ text: '取消' }, { text: '呼叫' }],

  },
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // 获取用户信息
  getUserInfo: function (e) {
    console.log(e)
    const userInfo = e.detail.userInfo;
    if (util.isEmpty(userInfo)){
      this.setData({
        userInfo: '',
        hasUserInfo: false
      })
    }else{
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  onReady: function () {

  },
  onShow: function () {

  },

  onHide: function () {

  },

  toActive: function (e) {
    let data = e.currentTarget.dataset.info
    wx.navigateTo({
      url: '/pages/activeState/activeState'+data.link,
    })
  },

  toIcon:function(e){
    let data = e.currentTarget.dataset.info
    if (data.link == 'dialogModal') {
      this.setData({
        dialogShow: true
      })
      return
    }
    if(data.link == 'scanCode') {
      this.handleScan();
      return;
    }
    if(data.link) {
      wx.navigateTo({
        url: data.link,
      })
    }
  },
  // 扫描二维码
  handleScan: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        wx.showToast({
          title: '扫描二维码',
        })
      }
    })
  },
  toSearch: function (e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  toUserInfo(){
    wx.navigateTo({
      url: '/pages/userinfo/index',
    })
  },
  tapDialogButton(e) {
    this.setData({
      dialogShow: false
    })
  }
})