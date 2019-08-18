// pages/activity/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lx_items_list:[
      { name: "全南昌"},
      { name: "全南昌"},
      { name: "全南昌"},
      { name: "全南昌"},
      { name: "全南昌"},
      { name: "全南昌"},
      { name: "全南昌"},
    ],
    isfull: false,
    lxopen: false,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  lista: function (e) {
    this.setData({ lxopen: !this.data.lxopen, lxshow: !this.data.lxshow, shownavindex: e.currentTarget.dataset.nav })
  },
  listb: function (e) {
    this.setData({ ysjopen: !this.data.ysjopen, ysjshow: !this.data.ysjshow, shownavindex: e.currentTarget.dataset.nav })
  },
  listc: function (e) {
    this.setData({ mhlxopen: !this.data.mhlxopen, mhlxopen: !this.data.mhlxopen, shownavindex: e.currentTarget.dataset.nav })
  },
  listf: function (e) {
    this.setData({ moreopen: !this.data.moreopen, mhlxopen: !this.data.moreopen, shownavindex: e.currentTarget.dataset.nav })
  },
  toSearch: function (e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
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

  }
})