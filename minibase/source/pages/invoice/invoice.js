// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { AboutusApi } from "../../apis/aboutus.api.js";
import { InvoiceApi } from "../../apis/invoice.api.js";



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
      name:'',duty:'',address:'',mobile:'',bank:'',bankaccount:'',invoicedetail2:null
    })

  }
  onMyShow() {
    var that = this;

   this.oindetail()

    



  }
  oindetail(){
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
          this.Base.setMyData({name:'',duty:'',address:'',mobile:'',bank:'',bankaccount:''})
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
          this.Base.setMyData({name:'',duty:'',address:'',mobile:'',bank:'',bankaccount:''})
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


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.shenqing = content.shenqing;
body.oindetail = content.oindetail;

Page(body)