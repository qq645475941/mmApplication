// pages/notification/notification.js
const { http } = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[],
    activeStateMap: {
      '0': '活动无效',
      '1': '立即参加',
      '2': '报名结束',
      '3': '进行中',
      '4': '活动结束',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataByapi()
  },

  setBeforeDays(time) {
    let now = new Date().getTime();
    let old = new Date(time).getTime();
    let days = (now - old)/1000/60/60/24;
    if(days<1) {
      days = Math.ceil(days*10);
      return days + '小时'
    } else {
      days = Math.ceil(days);
      return days + '天'
    }
  },

  getDataByapi(){
    let userId = getApp().globalData.motherId;
    let url = `${userId}/gainActivityNotice`;
    http('get',url).then(res => {
      if(res.result == 0) {
        let data = [];
        for(let item of res.obj) {
          let cover = JSON.parse(item.cover || '[]');
          let startDate = item.startDate.split(' ')[0];
          let endDate = item.endDate.split(' ')[0];
          let beforeDays = this.setBeforeDays(item.endDate);
          
          data.push({
            ...item,
            cover: cover[0] ||'/images/others/demo.jpg',
            startDate,
            endDate,
            beforeDays
          })
        }
        this.setData({
          lists:data
        })
      } else {
        this.setData({
          lists: []
        })
      }
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