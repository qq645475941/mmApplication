// wx http 调用

function http (method,url,data = {}){
    return new Promise((reslove, reject) => {
        wx.request({
            method: method.toUpperCase(),
            url: getApp().globalData.apiServer + url, //仅为示例，并非真实的接口地址
            data: data,
            // header: {
            //   'content-type': 'application/x-www-form-urlencoded'
            // },
            success (res) {
                reslove(res.data);
            },
            fail (err) {
                reject(err);
            }
          })
    })
}

// wx jsSdk 调用

module.exports = { http }
