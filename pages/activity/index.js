// pages/activity/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sliderList:[
      { name: "全南昌"},
      { name: "全南昌"},
      { name: "全南昌"},
      { name: "全南昌"},
      { name: "全南昌"},
      { name: "全南昌"},
      { name: "全南昌"},
    ],
    isfull: false,
    allNC: false,
    allType: false,
    allInterval: false,
    filtSort: false,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleAllNC: function (e) {
    this.setData({ 
      allNC: !this.data.allNC,
      isfull: !this.data.isfull,
      allType: false,
      allInterval: false,
      filtSort: false,
      shownavindex: e.currentTarget.dataset.nav 
    })
    this.isShowbg()
  },
  handleAllType: function (e) {
    this.setData({
      allType: !this.data.allType,
      isfull: !this.data.isfull,
      allNC: false,
      allInterval: false,
      filtSort: false,
      shownavindex: e.currentTarget.dataset.nav
    })
    this.isShowbg()
  },
  handleAllInterval: function (e) {
    this.setData({
      allInterval: !this.data.allInterval,
      isfull: !this.data.isfull,
      allNC: false,
      allType: false,
      filtSort: false,
      shownavindex: e.currentTarget.dataset.nav
    })
    this.isShowbg()
  },
  handleFilterSort: function (e) {
    this.setData({
      filtSort: !this.data.filtSort,
      isfull: !this.data.isfull,
      allNC: false,
      allType: false,
      allInterval: false,
      shownavindex: e.currentTarget.dataset.nav
    })
    this.isShowbg()
  },
  isShowbg:function(){
    let allNC = this.data.allNC;
    let allType = this.data.allType;
    let allInterval = this.data.allInterval;
    let filtSort = this.data.filtSort;
    if (allNC || allType || allInterval || filtSort){
      this.setData({isfull:true})
    }else{
      this.setData({ isfull: false })
    }
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