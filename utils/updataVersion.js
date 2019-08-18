function updataVersion() {
  var updateManager = wx.getUpdateManager()
  updateManager.onCheckForUpdate(function (res) {
    console.log(res.hasUpdate)
  })
  updateManager.onUpdateReady(function () {
    wx.showModal({
      title: '更新提示',
      content: '已更新至最新版本，即将重启应用。',
      showCancel: false,
      success:(res)=> {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      }
    })
  })
  updateManager.onUpdateFailed(function () {
    wx.showToast({
      title: '新版本下载失败'
    })
  })
}
export default updataVersion;