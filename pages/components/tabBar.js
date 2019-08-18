// pages/components/tabBar.js
const ap = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // type: {
    //   type: String,
    //   value: 'middleman'
    // },
    activeIndex: {
      type: Number,
      value: 0
    },
    isPhoneX:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabBarlist: {
      // 经纪人
      middleman: [{
          "pagePath": "/pages/middleman/index/index",
          "text": "首页",
          "iconPath": "/images/home/home.png",
          "selectedIconPath": "/images/home/home_sel.png"
        },
        {
          "pagePath": "/middleman/resource/index",
          "text": "货源单",
          "iconPath": "/images/resource/resource.png",
          "selectedIconPath": "/images/resource/resource_sel.png"
        },
        {
          // "pagePath": "/middleman/transportList/index",
          "pagePath": "/middleman/transportList/indexcw",
          "text": "运输单",
          "iconPath": "/images/transport/transport.png",
          "selectedIconPath": "/images/transport/transport_sel.png"
        },
        {
          "pagePath": "/middleman/dispatch/index",
          "text": "调度单",
          "iconPath": "/images/dispatch/dispatch.png",
          "selectedIconPath": "/images/dispatch/dispatch_sel.png"
        },
        {
          "pagePath": "/middleman/my/index",
          "text": "我的",
          "iconPath": "/images/my/my.png",
          "selectedIconPath": "/images/my/my_sel.png"
        }
      ]
    },
    clickStatus: false //多次点击处理
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab: function(e) {
      if (!this.data.clickStatus) {
        this.data.clickStatus = true
        let index = e.currentTarget.dataset.index
        let path = e.currentTarget.dataset.path
        if (index != this.data.activeIndex) {
          wx.redirectTo({ //navigate路由长度会超过限制
            url: path
          })
        }
        this.data.clickStatus = false
      }
    }
  },
  lifetimes:{
    attached:function(){
      // let isBatchDispatch = ap.globalData.isBatchDispatch
      // if (isBatchDispatch==1){
      //   this.setData({
      //     isPhoneX: ap.globalData.isPhoneX,
      //     'tabBarlist.middleman[2].pagePath':'/middleman/transportList/indexcw'
      //   })
      //   return
      // }
      this.setData({
        isPhoneX: ap.globalData.isPhoneX
      })
    }
  },
  attached: function () {
    // let isBatchDispatch = ap.globalData.isBatchDispatch
    // if (isBatchDispatch == 1) {
    //   this.setData({
    //     isPhoneX: ap.globalData.isPhoneX,
    //     'tabBarlist.middleman[2].pagePath': '/middleman/transportList/indexcw'
    //   })
    //   return
    // }
    this.setData({
      isPhoneX: ap.globalData.isPhoneX
    })
  }
})