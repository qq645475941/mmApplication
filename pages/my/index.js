// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInon:[
      { imgPath: "/images/activity/activity.png", text: "全部",link: "?type=all"},
      { imgPath: "/images/activity/activity.png", text: "待开始", link: "?type=ready"},
      { imgPath: "/images/activity/activity.png", text: "进行中", link: "?type=doing"},
      { imgPath: "/images/activity/activity.png", text: "已结束", link: "?type=complated"},
    ],
    myInon:[
      { imgPath: "/images/others/rili.png", text: "活动日历", link: "/pages/calendar/calendar"},
      { imgPath: "/images/others/shoucang.png", text: "活动收藏", link: "/pages/activeShoucang/index"},
      { imgPath: "/images/others/headIcon.png", text: "我的关注", link: "/pages/myAttention/index"},
      { imgPath: "/images/others/headIcon.png", text: "我的积分", link: "/pages/myIntegral/index"},
      { imgPath: "/images/others/scan.png", text: "商户入口",link: ""},
      { imgPath: "/images/others/headIcon.png", text: "联系客服",link: ""},
      { imgPath: "/images/others/scan.png", text: "扫描二维码",link: ""},
      { imgPath: "/images/others/qiandao.png", text: "签到",link: ""},
      { imgPath: "/images/others/shoucang.png", text: "关注公众号",link: ""},
      { imgPath: "/images/others/headIcon.png", text: "业务合作",link: ""},
      { imgPath: "/images/others/headIcon.png", text: "关于我们",link: ""},
      { imgPath: "/images/others/qiandao.png", text: "意见反馈",link: ""},
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toActive: function (e) {
    let data = e.currentTarget.dataset.info
    wx.navigateTo({
      url: '/pages/activeState/activeState'+data.link,
    })
  },

  toIcon:function(e){
    let data = e.currentTarget.dataset.info
    if(data.link) {
      wx.navigateTo({
        url: data.link,
      })
    }
  },
  toSearch: function (e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
})