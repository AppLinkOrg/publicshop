// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { LeaseorderApi } from "../../apis/leaseorder.api.js";
import { ServiceApi } from "../../apis/service.api.js";
import { ReasonApi } from "../../apis/reason.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    wx.setNavigationBarTitle({
      title: '申请售后',
    })

    this.Base.setMyData({
        leaseorderdetail:{},servicelist:[],serveshow:0,reasonlist:[],reason_id:'',
        imglist:[],service_id:'',explain:''
    })


  }
  onMyShow() {
    var that = this;

    // 订单详情
    var leaseorderApi = new LeaseorderApi()
    leaseorderApi.leaseorderdetail({
        id:this.Base.options.id
    },(res)=>{
        this.Base.setMyData({leaseorderdetail:res})

    })

    // 申请服务
    var serviceApi = new ServiceApi()
    serviceApi.servicelist({
        type:'A'
    },(res)=>{
this.Base.setMyData({servicelist:res})
    })


    // 申请原因
    var reasonApi = new ReasonApi()
    reasonApi.reasonlist({
        type:'A'
    },(res)=>{
        this.Base.setMyData({reasonlist:res})
    })



  }
  applyreason(e){
      var index = e.detail.value
      var reasonlist=this.Base.getMyData().reasonlist
      var reason_name=reasonlist[index]['name'];
      var reason_id=reasonlist[index]['id'];
      this.Base.setMyData({reason_name,reason_id})
      console.log(e,'gggg');


  }
  upimg(){

      var imglist=this.Base.getMyData().imglist
      if (imglist.length>5) {
          wx.showToast({
            title: '最多上传五张图片',
            icon:'none'
          })
          return
      }
      this.Base.uploadImage("safeimg",(ret)=>{
          imglist.push(ret)
          this.Base.setMyData({imglist})
      },1,undefined)
  }

  select(e){
      var servicelist = this.Base.getMyData().servicelist
    var   index=  e.currentTarget.dataset['index'];
    var service_id=servicelist[index]['id']
    this.Base.setMyData({serveshow:index,service_id})
  }
  tijiao(){
      var service_id=this.Base.getMyData().service_id
      var reason_id=this.Base.getMyData().reason_id
      var leaseorder_id=thsi.Base.options.id



      
     




  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.tijiao = content.tijiao;
body.select = content.select;
body.upimg = content.upimg;
body.applyreason = content.applyreason;
Page(body)