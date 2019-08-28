// components/activeItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listData:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    item:{},
    stateMap:{
      '0':{
        btn:'无效活动',
        type:'complated'
      },
      '1':{
        btn:'待开始',
        type:'ready'
      },
      '2':{
        btn:'待开始',
        type:'ready'
      },
      '3':{
        btn:'进行中',
        type:'doing'
      },
      '4':{
        btn:'已结束',
        type:'complated'
      },
    }
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行;
      this.setData({
        item: this.getItemdata(this.properties.listData)
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getItemdata(data) {
      let cover = JSON.parse(data.cover|| '[]');
      let startDate = data.startDate.split(' ')[0];
      let endDate = data.endDate.split(' ')[0];
      return {
        ...data,
        cover: cover[0] || '/images/others/demo.jpg',
        startDate,
        endDate
      }
    },
  }
})
