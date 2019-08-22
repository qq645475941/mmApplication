// pages/activeState.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 'all',
    headerTab: [
      { name: '全部', type: 'all' },
      { name: '待开始', type: 'ready' },
      { name: '进行中', type: 'doing' },
      { name: '已结束', type: 'complated' }
    ],
    activeList:[],
    apiData:[
      { info:'【青山湖区】孔明灯亲子放灯，免费畅玩，祭祀祈福，怀念先人~', btn:'待开始',type:'ready',},
      { info: '【青山湖区】孔明灯亲子放灯，免费畅玩，祭祀祈福，怀念先人~', btn: '进行中', type: 'doing', },
      { info: '【青山湖区】孔明灯亲子放灯，免费畅玩，祭祀祈福，怀念先人~', btn: '已结束', type: 'complated',},
      { info: '【青山湖区】孔明灯亲子放灯，免费畅玩，祭祀祈福，怀念先人~', btn: '待开始', type: 'ready',},
      { info: '【青山湖区】孔明灯亲子放灯，免费畅玩，祭祀祈福，怀念先人~', btn: '进行中', type: 'doing',},
      { info: '【青山湖区】孔明灯亲子放灯，免费畅玩，祭祀祈福，怀念先人~', btn: '已结束', type: 'complated',},
      { info: '【青山湖区】孔明灯亲子放灯，免费畅玩，祭祀祈福，怀念先人~', btn: '待开始', type: 'ready', },
      { info: '【青山湖区】孔明灯亲子放灯，免费畅玩，祭祀祈福，怀念先人~', btn: '进行中', type: 'doing',},
    ]
  },
  filterListData(){
    if(this.data.currentTab !== 'all') {
      let data = this.data.apiData.filter(item => {
        return item.type == this.data.currentTab;
      })
      this.setData({
        activeList:data
      })
    } else {
      this.setData({
        activeList:this.data.apiData
      })
    }
  },

  changeTab(e){
    let tabData = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tabData.type,
    })
    this.filterListData();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      currentTab: options.type
    })
    this.filterListData();
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