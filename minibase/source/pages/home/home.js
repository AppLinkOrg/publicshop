// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ActivelunboApi } from "../../apis/activelunbo.api.js";
import { RecommendApi } from "../../apis/recommend.api.js";
import { HotmoneyApi } from "../../apis/hotmoney.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      indexbanner:[],autoplay:false,autoplay2:false,activelunbolist:[],recommendlist:[],hotmoneylist:[]
    })
  }
  onMyShow() {
    var that = this;

    var instApi = new InstApi()
    instApi.indexbanner({},(res)=>{
      var autoplay=false
      if (res.length>1) {
        autoplay=true
     
      }else{
        autoplay=false
      }
      this.Base.setMyData({indexbanner:res,autoplay})

    })

// 活动
    var activelunboApi = new ActivelunboApi()
    activelunboApi.activelunbolist({},(res)=>{
      var autoplay2=false
      if (res.length>1) {
        autoplay2=true
     
      }else{
        autoplay2=false
      }
      this.Base.setMyData({activelunbolist:res,autoplay2})
    })


    // 人气推荐
    var recommendApi = new RecommendApi()
    recommendApi.recommendlist({},(res)=>{
      this.Base.setMyData({recommendlist:res})
    })

    // 热卖爆款
    var hotmoneyApi = new HotmoneyApi()
    hotmoneyApi.hotmoneylist({},(res)=>{
      this.Base.setMyData({hotmoneylist:res})
    })







  }

  genduo(){
    wx.navigateTo({
      url: '/pages/classify/classify',
    })
  }
  tuijain(e){
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/commoditydetail/commoditydetail?id='+id,
    })
   
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.tuijain = content.tuijain;
body.genduo = content.genduo;

Page(body)