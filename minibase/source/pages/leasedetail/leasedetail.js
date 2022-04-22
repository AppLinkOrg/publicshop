// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { LeaseApi } from "../../apis/lease.api.js";
import { SealseApi } from "../../apis/sealse.api.js";

var WxParse = require('../../wxParse/wxParse');


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
        leasedetail:[],autoplay:false,jiageprice:null,str2
    })

  }
  onMyShow() {
    var that = this;

    var leaseApi =new LeaseApi()
    leaseApi.leasedetail({id:this.Base.options.id},(res)=>{
        var autoplay=false
        if (res.imglist.length>1) {
          autoplay=true
       
        }else{
          autoplay=false
        }
        res.detail=that.Base.util.HtmlDecode(res.detail);
        WxParse.wxParse('content', 'html', res.detail, that, 10);


        for(let item of res.specslist){
          item.show=0;
        }

        


        this.Base.setMyData({leasedetail:res,autoplay,jiageprice:res.jiamu})

        this.jiage()
    })



  }
  select(e){
    var  index=  e.currentTarget.dataset['index'];
    var  indexs=  e.currentTarget.dataset['indexs'];
    var leasedetail=this.Base.getMyData().leasedetail
    leasedetail.specslist[index].show=indexs
    this.Base.setMyData({leasedetail})

    this.jiage()
  }
  jiage(){
     var leasedetail=this.Base.getMyData().leasedetail
     var str=[]
     for(let item of leasedetail.specslist){
       var show=item.show
       var id = item['sortlist'][show]['id']

      str.push(id)
     }

     var str2=str.sort((a,b) => a - b)
     console.log(str2,'str2');



    // return

    var sealseApi = new SealseApi()
    
    sealseApi.sealseprice({
      lease_id:this.Base.options.id,
      chooseid:str2

    },(res)=>{

      if (res.code==0) {

        // wx.showToast({
        //   title: res.return,
        //   icon:'none'
        // })
        this.Base.setMyData({jiageprice:res.result,str2})

        
        
      }else{
        wx.showToast({
          title: res.return,
          icon:'none'
        })
      }

    })


  }
  zulin(){
    var str2 = this.Base.getMyData().str2
    var jiageprice = this.Base.getMyData().jiageprice
   

  

    wx.navigateTo({
      url: '/pages/leaseorder/leaseorder?sealseprice_id='+jiageprice.id+'&id='+this.Base.options.id,
    })

  }


  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.zulin = content.zulin;
body.jiage = content.jiage;
body.select = content.select;

Page(body)