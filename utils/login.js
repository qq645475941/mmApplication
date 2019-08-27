function getOpenId(callback) {
  wx.login({
    success: res => {
      console.log(res.code)
      wx.request({
        url: 'https://wechat.mamayy.com/mother/' + res.code + '/gainOpenId',
        method: 'GET',
        success: function(sres) {
          var data = sres.data;
          if (data) {
            if (data.result == 0) {
              var openId = data.obj;
              console.log('当前用户openid：' + openId)
              getApp().globalData.openId = openId;
              callback && callback()
              // getWxLoginInfo(openId);
              loginComplete();
            } else {
              loginErr();
            }
          } else {
            loginErr();
          }
        },
        fail: function(fres) {
          console.log(fres);
          loginErr();
        },
        complete: function() {
          // if (wx.hideLoading){
          //   wx.hideLoading()
          // }
        }
      })
    }
  })
}

// 登录完成
function loginComplete() {
  console.log("--- 初始化openid完成 ---")
  getApp().globalData.openIdComplete = true;
}

// 登录失败
function loginErr() {
  console.log("--- 获取openid登录失败 ===> 跳转error页 ---")
  // 跳转至异常页
  // wx.redirectTo({
  //   url: '/pages/user/error'
  // })
  loginComplete();
}



// 定义
module.exports = {
  getOpenId: getOpenId,
}