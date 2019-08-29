/*
 * @Author: TerryMin
 * @Date: 2019-08-29 20:51:55
 * @LastEditors: TerryMin
 * @LastEditTime: 2019-08-29 21:17:23
 * @Description: file not
 */
const api = require("../../utils/api.js")

Page({
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
    newActiveList: [],
    activeStateMap: {
      '0': '活动无效',
      '1': '报名中',
      '2': '报名结束',
      '3': '进行中',
      '4': '活动结束',
    },
    isAcEnd: false,
    isLoading: false,
  },

  onLoad: function (options) {
    this.ajaxActiveList()
  },

  onPullDownRefresh() {
    this.setData({
      currentPage: 0,
      newActiveList: [],
      isAcEnd: false,
    })
    this.ajaxActiveList();
    wx.stopPullDownRefresh()
  },

  onReachBottom() {
    if (!this.data.isAcEnd) {
      this.ajaxActiveList();
    }
  },


  ajaxActiveList: function () {
    if (this.data.isLoading) {
      return;
    }
    this.setData({
      isLoading: true,
    })
    api.http('get', `${this.data.currentPage}/gainActivity`).then(res => {
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
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  toSearch: function (e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  toActive: function () {
    wx.navigateTo({
      url: '/pages/calendar/calendar',
    })
  },
  toNotification: function () {
    wx.navigateTo({
      url: '/pages/notification/notification',
    })
  },
  toSign: function () {
    wx.navigateTo({
      url: '/pages/signIn/signIn',
    })
  },
  toCollect: function () {
    wx.navigateTo({
      url: '/pages/activeShoucang/index',
    })
  },
  goActivity: function (event) {
    console.log(event.currentTarget.dataset);
    wx.setStorageSync('activityItem', event.currentTarget.dataset.item);
    wx.navigateTo({
      url: '/pages/activity-detail/index',
    })
  },
  handleScan: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        wx.showToast({
          title: '扫描二维码',
        })
      }
    })
  }
})