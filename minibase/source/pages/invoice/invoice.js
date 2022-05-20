// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { AboutusApi } from "../../apis/aboutus.api.js";
import { InvoiceApi } from "../../apis/invoice.api.js";
import {
  ApiUtil
} from "../../apis/apiutil.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: '发票服务',
    })
    this.Base.setMyData({
      name:'',duty:'',address:'',mobile:'',bank:'',bankaccount:'',invoicedetail2:null,strtime:'',first:0,timer:null
    })

  }
  onMyShow() {
    var that = this;

    
      this.oindetail()
      
   

  

    



  }
  oindetail(){
    var that = this
    var first = this.Base.getMyData().first
    var timer = this.Base.getMyData().timer

    this.Base.setMyData({first:1})

    var invoiceApi = new InvoiceApi()
    

   
    invoiceApi.invoicedetail2({
      type:this.Base.options.type,
      id:this.Base.options.id
    },(res)=>{
      if (res!=null) {

        this.Base.setMyData({
          name:res.name,
          duty:res.duty,
          address:res.address,
          mobile:res.mobile,
          bank:res.bank,
          bankaccount:res.bankaccount,
          invoicedetail2:res
        })

        // 定时器
        var submit_time = res.submit_time   //提交时间
        var up_time=res.up_time  //结束时间


        var sub_time2=new Date(submit_time.replace(/-/g, '/')).getTime()
        var up_time2=new Date(up_time.replace(/-/g, '/')).getTime()

        var differ_time=up_time2-sub_time2




        if(first==0 && res.timestatus==0){
          timer=setInterval(function () {
            var str = ApiUtil.Timedata(differ_time)
       differ_time=differ_time*1-1000

       if (str=='') {

        that.Base.setMyData({str:'0秒'})
        clearInterval(timer)

        that.oindetail()
       }else{
        that.Base.setMyData({str})
       }
            
          },1000)

          this.Base.setMyData({timer})

        }



      }


      

    })
  }
  shenqing(){
    var type = this.Base.options.type
    var id = this.Base.options.id
    var name=this.Base.getMyData().name
    var duty=this.Base.getMyData().duty
    var address=this.Base.getMyData().address
    var mobile=this.Base.getMyData().mobile
    var bank=this.Base.getMyData().bank
    var bankaccount=this.Base.getMyData().bankaccount

    if (name=='') {
      wx.showToast({
        title: '填写抬头名称',
        icon:'none'
      })
      return
    }
    if (duty=='') {
      wx.showToast({
        title: '填写纳税人识别号',
        icon:'none'
      })
      return
    }
    if (address=='') {
      wx.showToast({
        title: '公司地址（选填）',
        icon:'none'
      })
      return
    }
    if (mobile=='') {
      wx.showToast({
        title: '填写电话号码',
        icon:'none'
      })
      return
    }

    var invoiceApi =new InvoiceApi()
    if (type=='A') {
      invoiceApi.invoicelist({
        leaseorder_id:id,name,duty,address,mobile,bank,bankaccount,
        type
      },(res)=>{
        if (res.code==0) {
          wx.showToast({
            title: '提交成功',
            icon:'none'
          })
          this.Base.setMyData({name:'',duty:'',address:'',mobile:'',bank:'',bankaccount:'',first:0})
          this.oindetail()
        }else{
          wx.showToast({
            title: res.return,
            icon:'none'
          })
  
        }
  
      })
    }else{
      invoiceApi.invoicelist({
        shoporder_id:id,name,duty,address,mobile,bank,bankaccount,
        type
      },(res)=>{
        if (res.code==0) {
          wx.showToast({
            title: '提交成功',
            icon:'none'
          })
          this.Base.setMyData({name:'',duty:'',address:'',mobile:'',bank:'',bankaccount:'',first:0})
          
          this.oindetail()
        }else{
          wx.showToast({
            title: res.return,
            icon:'none'
          })
  
        }
  
      })

    }
    


    



    

  }
  baocun(){

  }
  onHide(){
    console.log('我要隐藏');
    var timer=this.Base.getMyData().timer
    clearInterval(timer)

  }
  onUnload(){
    console.log('我要隐藏111');
    var timer=this.Base.getMyData().timer
    clearInterval(timer)
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.onUnload = content.onUnload;
body.onHide = content.onHide;
body.baocun = content.baocun;
body.shenqing = content.shenqing;
body.oindetail = content.oindetail;

Page(body)