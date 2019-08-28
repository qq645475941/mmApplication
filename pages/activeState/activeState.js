// pages/activeState.js
const {http} = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 'all',
    headerTab: [
      { name: '全部', type: '全部' },
      { name: '待开始', type: '待开始' },
      { name: '进行中', type: '进行中' },
      { name: '已结束', type: '已结束' }
    ],
    activeList:[],
  },
  changeTab(e){
    let tabData = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tabData.type,
    })
    this.getListByapi();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentTab: options.type
    })
    this.getListByapi();
  },

  getListByapi(){
    let userId = 120
    let url = `${userId}/${this.data.currentTab}/gainActivityJoin`
    http('get', url).then(res => {
      console.log(res);
      if (res.result == 0) {
        this.setData({
          activeList: res.obj
        })
      } else {
        this.setData({
          activeList: []
        })
      }
    });
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