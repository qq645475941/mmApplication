// pages/components/upload.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    typeVal: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    allImg: {
      1: '/images/others/ID_demo.png', //身份证正面
      2: '/images/others/ID_reverse.png', //身份证反面
      3: '/images/others/jsz.png', //驾驶证
      4: '/images/others/cyzgz.png', //从业资格证
      5: '/images/others/zcxsz.png', //主车行驶证
      6: '/images/others/zcxszfz.png.png', //主车行驶证正副照
      7: '/images/others/zcdlysz.png', //主车道路运输证
      8: '/images/others/gcdlysz.png', //挂车道路运输证
      9: '/images/others/clzmz.jpg', //车辆正面
      10: '/images/others/whpcyzgz.png', //危化品从业资格证
      11: '/images/others/whpgjbg.png', //危化品罐检报告
      12: '/images/others/gcxsz.png', //挂车行驶证
    },
    clickStatus: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    upload: function() {
      if (this.data.clickStatus) {

      } else {
        this.setData({
          clickStatus: true
        })
        this.triggerEvent('uploadconfirm', {
          typeVal: this.data.typeVal
        }, {});
        this.setData({
          clickStatus: false
        })
      }
    },
    chutou: function() {
      return false;
    },
    close:function(){
      this.triggerEvent('close', {}, {});
    }
  }
})