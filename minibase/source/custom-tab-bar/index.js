Component({
  data: {
    selected: 0,
    color: "#333333",
    selectedColor: "#DF001F",
    list: [{
      pagePath: "/pages/home/home",
      iconPath: "/images/icons/sc2.png",
      selectedIconPath: "/images/icons/sc.png",
      text: "首页"
    }, {
      pagePath: "/pages/classify/classify",
      iconPath: "/images/icons/fx.png",
      selectedIconPath: "/images/icons/fx2.png",
      text: "分类"
    }, {
      pagePath: "/pages/lease/lease",
      iconPath: "/images/icons/zl.png",
      selectedIconPath: "/images/icons/zl2.png",
      text: "租赁"
    }, {
      pagePath: "/pages/cart/cart",
      iconPath: "/images/icons/gwc.png",
      selectedIconPath: "/images/icons/gwc2.png",
      text: "购物车"
    }, {
      pagePath: "/pages/mycenter/mycenter",
      iconPath: "/images/icons/my.png",
      selectedIconPath: "/images/icons/my2.png",
      text: "我"
    }]
  },
  attached() {},
  // ready() {
  //   // 缓存tabber栏的高度
  //   const query = wx.createSelectorQuery().in(this);
  //   query.select('.tab-bar').boundingClientRect((rect) => {
  //     console.log(rect.height)
  //     wx.setStorageSync('tabbarHeight', rect.height)
  //   }).exec()
  // },

  methods: {
   
    switchTab(e) {
      const query = wx.createSelectorQuery().in(this);
      const data = e.currentTarget.dataset
      const url = data.path

      var that = this 


    query.select('.tab-bar').boundingClientRect((rect) => {
      console.log(rect.height)
      wx.setStorageSync('tabbarHeight',rect.height)
     

    }).exec()

          // return

          wx.switchTab({
            url,
            success: (res) => {
              let page = getCurrentPages().pop();
    
              console.log(page == undefined , page == null ,'page44444');
              if (page == undefined || page == null) return;
    
              // page.onLoad({})
    
            }
          })
          // that.setData({
          //   selected: data.index
          // })
     
      
    }
  }
})