/*
 * @Author: TerryMin
 * @Date: 2019-08-28 14:03:17
 * @LastEditors: TerryMin
 * @LastEditTime: 2019-08-29 21:22:27
 * @Description: file not
 */
const api = require("../../utils/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/images/others/banner.png',
      '/images/others/banner.png',
      '/images/others/banner.png'
    ],
    indicatorDots: true,
    indicatorColor: "rgb(255,255,255)",
    indicatorActiveColor: "rgb(255,96,111)",
    autoplay: false,
    interval: 5000,
    duration: 1000,
    currentPage: 0,
    title: '积木宝贝大型亲子涂鸦——创意联展门票来砍价啦~',
    lookNumber: 282,
    collectNumber: 82,
    applyNumber: 59,
    activityItem: {},
    detailList: [
      {
        ageRange: '0 - 12',
        activityTime: '2019-08-19至2019-08-23',
        address: '积木宝贝IM盈石中心/积木宝贝新建中心',
        peopleNumber: '人数不限',
        hoster: '积木宝贝科学早教',
        tips: '如有疑问,请点击页面左下角"客服"进行咨询'
      }
    ]
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
    let activityItem = wx.getStorageSync('activityItem');
    console.log(activityItem);
    if (activityItem) {
      this.setData({
        activityItem
      });
      wx.clearStorageSync('activityItem')
    }

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

  goPage: function () {

  },
  payAttention: function () {
    api.http('post', `/insertActivityConcern`, { userId, activityId }).then(res => {
      if (res.result == 0) {
        if (res.obj.length) {
          let data = res.obj.map(item => {
            item.cover = JSON.parse(item.cover || '[]');
            item.startDate = item.startDate.split(' ')[0];
            item.endDate = item.endDate.split(' ')[0];
            return item;
          })
          data = [...this.data.newActiveList, ...data];
          let page = this.data.currentPage + 1;
          this.setData({
            newActiveList: data,
            isAcEnd: false,
            currentPage: page
          })
        } else {
          this.setData({
            isAcEnd: true,
          })
        }
      }
      this.setData({
        isLoading: false
      })
    })
  }
})