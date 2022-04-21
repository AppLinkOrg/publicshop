// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { LeaseorderApi } from "../../apis/leaseorder.api.js";
import { ServiceApi } from "../../apis/service.api.js";
import { ReasonApi } from "../../apis/reason.api.js";
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
        var service_id=res[0]['id'];
this.Base.setMyData({servicelist:res,service_id})
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
      var leaseorder_id=this.Base.options.id
      var explain = this.Base.getMyData().explain
      var imglist = this.Base.getMyData().imglist
      
      var imgliststr=imglist.toString()



      if(reason_id<=0){
          wx.showToast({
            title: '请选择申请原因',
            icon:'none'
          })
          return
      }
      if(explain=='' ){
        wx.showToast({
          title: '请描述申请售后服务的具体原因',
          icon:'none'
        })
        return
    }

    var safeApi = new SafeApi()
    safeApi.safeadd({
        leaseorder_id,
        service_id,
        reason_id,
        explain,
        imgliststr

    },(res)=>{
        if (res.code==0) {
            wx.showToast({
              title: '提交成功',
              icon:'none'
            })

            this.Base.setMyData({
                service_id:'',reason_id:'',explain:'',imglist:[],reason_name:'',serveshow:0
            })
            
        }else{
            wx.showToast({
                title: res.return,
                icon:'none'
              }) 

        }



    })





      
     




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