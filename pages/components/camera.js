const ap = getApp()
Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    cameraType:{
      type: Number,
      value: 1               //1为身份证正面2为反面
    }
  },
  data: {
    isPhoneX: false,
    flash: false,        //闪关灯
  },
  methods: {
    toggleFlash:function(){
      this.setData({
        flash: !this.data.flash
      })
    },
    stopDefault:function(){
      return false;
    },
    cancel:function() {
      this.triggerEvent('cancel', {}, {});
    },
    takePhoto:function(){
      this.camera.takePhoto({
        quality: 'low',
        success:(res)=>{
          this.setData({
            flash: false
          })
          this.triggerEvent('success', { tempImagePath: res.tempImagePath, cameraType: this.data.cameraType }, {});
        },
        fail:(err)=>{
          this.setData({
            flash: false
          })
          this.triggerEvent('err', err, {});
        }
      })
    }
  },
  lifetimes:{
    created: function () {
      this.setData({
        isPhoneX: ap.globalData.isPhoneX
      })
      this.camera  = wx.createCameraContext()
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.camera']) {
            this.setData({
              cameraAuth: true
            })
          } else {
            wx.authorize({
              scope: 'scope.camera',
              success: () => {
                this.setData({
                  cameraAuth: true
                })
              },
              fail: () => {
                wx.showModal({
                  title: '提示',
                  content: '需要授权相机',
                  confirmText: '去授权',
                  success: (d) => {
                    if (d.confirm) {
                      wx.openSetting({
                        success: (r) => {
                          if (r.authSetting['scope.camera']) {
                            this.setData({
                              cameraAuth: true
                            })
                          }
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        }
      })
    }
  },
  created: function () {
    this.setData({
      isPhoneX: ap.globalData.isPhoneX
    })
    this.camera = wx.createCameraContext()
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.camera']) {
          this.setData({
            cameraAuth: true
          })
        } else {
          wx.authorize({
            scope: 'scope.camera',
            success: () => {
              this.setData({
                cameraAuth: true
              })
            },
            fail: () => {
              wx.showModal({
                title: '提示',
                content: '需要授权相机',
                confirmText: '去授权',
                success: (d) => {
                  if (d.confirm) {
                    wx.openSetting({
                      success: (r) => {
                        if (r.authSetting['scope.camera']) {
                          this.setData({
                            cameraAuth: true
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  }
})
