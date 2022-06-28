// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ActivelunboApi } from "../../apis/activelunbo.api.js";
import { ShopclassApi } from "../../apis/shopclass.api.js";
import { ShopApi } from "../../apis/shop.api.js";
import { ShoplunboApi } from "../../apis/shoplunbo.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;

    console.log(options,'optionsoptions');
    super.onLoad(options);
    this.Base.setMyData({
      
      orderstatus:0,wh:160,shoplist:[],shoplunbolist:[],autoplay:false,
      shopclasslist:[],vieid:'list0'
    })

  //自定义的tabbar
     if (typeof this.getTabBar === 'function' &&
     this.getTabBar()) {
     this.getTabBar().setData({
       selected: 1
     })
   }
   
  }
  onMyShow() {
    var that = this;
   

    var shopclassApi = new ShopclassApi()
    shopclassApi.shopclasslist({},(res)=>{
      var json={
        id:'',
        name:'推荐',
      }
      res.unshift(json)
      this.Base.setMyData({shopclasslist:res})
    })


    var shopApi  =new ShopApi()
    shopApi.shoplist({},(res)=>{
      this.Base.setMyData({shoplist:res})
    })

    var shoplunboApi =new ShoplunboApi()
    shoplunboApi.shoplunbolist({},(res)=>{
      var autoplay =false
      if(res.length==0){
        autoplay=false
      }else{
        autoplay=true
      }
      this.Base.setMyData({shoplunbolist:res,autoplay})
    })

   
   

  }
  bindchoose(e){
      var that = this;
      var index = e.currentTarget.dataset['index']

      var str = 'list'+index
      // return
      this.Base.setMyData({
          
          orderstatus:e.currentTarget.dataset.index,vieid:str
      })
  }
  changeWidth(e){
    var length = e.detail.value.length
    var wh=length*20
    // this.Base.setMyData({wh})
    console.log('changeWidth',e);
    // let input = document.getElementById("myInput");
    // input.size = input.value.length > 4 ? input.value.length : 4;
  }
  xq(e){
    var id = e.currentTarget.id
    if(id>0){
      wx.navigateTo({
        url: '/pages/commoditydetail/commoditydetail?id='+id,
      })

    }

  }
  shopbind(e){
    var id = e.currentTarget.id
    if (id>0) {
      wx.navigateTo({
        url: '/pages/commoditydetail/commoditydetail?id='+id,
      })
    }

  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindchoose = content.bindchoose;

body.shopbind = content.shopbind;
body.xq = content.xq;
body.changeWidth = content.changeWidth;
Page(body)