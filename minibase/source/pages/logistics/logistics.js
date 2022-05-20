// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { AboutusApi } from "../../apis/aboutus.api.js";
import { GoodsApi } from "../../apis/goods.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: '物流信息',
    })
    this.Base.setMyData({
      dataList:[
        {
          content:'【广州市】快件到达驿站请及时领取',
          time:'12-22 12:23'
        },
        {
          content:'快件正在派送',
          time:'12-22 12:23'
        }
      ],
      no:'',
      wuliu:null,first:0

    })


  

    

  }
  onMyShow() {
    var that = this;

    var first=this.Base.getMyData().first
    if (first==0) {
      var goodsApi = new GoodsApi()
      goodsApi.wuliu2({
        no:this.Base.options.no
      },(res)=>{
        if (res.status=="200") {
          // this.Base.setMyData({wuliu:res.result})
          this.Base.setMyData({wuliu:res})
        }else{
          that.Base.toast(res.msg)
          this.Base.setMyData({wuliu:null})
        }
        
        console.log(res,'reskkkk');
  
      })

      this.Base.setMyData({first:1})
      
    }

   

    



  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
Page(body)