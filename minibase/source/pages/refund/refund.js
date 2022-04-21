// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { SafeApi } from "../../apis/safe.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: '退款/售后',
    })


    this.Base.setMyData({
        list:[
            {id:'', name:'全部'},{id:'A', name:'申请中'},{id:'B', name:'处理中'},{id:'C', name:'已处理'}
        ],
        select:0,orderlist:[],safelist:[]
    })

  }
  onMyShow() {
    var that = this;

    
this.safe()

  }
  safe(){
    var select = this.Base.getMyData().select

    var safeApi = new SafeApi()
    safeApi.safelist({
        select
    },(res)=>{
        this.Base.setMyData({orderlist:res})

    })
  }
  xz(e){
      this.Base.setMyData({select:e.currentTarget.id})
      this.safe()
  }
  look(e){
      var type = e.currentTarget.dataset['type'];
      var id = e.currentTarget.id;
      wx.navigateTo({
        url: '/pages/refunddetail/refunddetail?type='+type+'&id='+id,
      })
    // pages/applysale/applysale

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.look = content.look;
body.safe = content.safe;
body.xz = content.xz;


Page(body)