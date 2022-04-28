// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ActiveApi } from "../../apis/active.api.js";
import { ShopApi } from "../../apis/shop.api.js";
var WxParse = require('../../wxParse/wxParse');
import { CartApi } from "../../apis/cart.api.js";



class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    // wx.setNavigationBarTitle({
    //   title: '商品详情',
    // })
    this.Base.setMyData({
      showDialog:false,
      flag:false,
      buttom_flag:false,
      show:false,
      shopdetail:{},
      autoplay:false,
      num:1,jiageprice:{},
      type:'',str2:[],guistr:''
    })

  }
  onMyShow() {
    var that = this;

    var shopApi =new ShopApi()
    shopApi.shopdetail({
      id:this.Base.options.id
    },(res)=>{
      var autoplay =false
      if (res.shopimglist.length>1) {
        autoplay=true
      }else{
        autoplay=false
      }
      res.content = that.Base.util.HtmlDecode(res.content);
      WxParse.wxParse('content', 'html', res.content, that, 10);


      for(let item of res.specslist){
        item.show=0
      }


      this.Base.setMyData({shopdetail:res,autoplay})

      this.jiage()
    })



  }
  jiage(){
    var shopdetail = this.Base.getMyData().shopdetail
    var str=[];

    for(let item of shopdetail.specslist){
      var show=item.show
      var id = item['sortlist'][show]['id']
      str.push(id)

    }
    var str2=str.sort((a,b) => a - b)
    

    console.log(str2,'str2');
    // return

    var shopApi =new ShopApi()
    shopApi.pricelist({
      shop_id:this.Base.options.id,
      chooseid:str2
    },(res)=>{
      if (res.code==0) {
        this.Base.setMyData({jiageprice:res.result,str2})
      }else{
        this.Base.setMyData({jiageprice:null,str2:[]})
 wx.showToast({
          title: res.return,
          icon:'none'
        })
      }

    })

  }

  toggleDialog(e) {
    this.Base.setMyData({
      showDialog: !this.data.showDialog,
      flag:!this.data.flag
    });
  }
  toggleDialog_buttom(e) {
    var type=e.currentTarget.dataset.type
    this.Base.setMyData({type,buttom_flag:true})

    return

    this.Base.setMyData({
      show: !this.data.show,
      buttom_flag:!this.data.buttom_flag
    });
    
  }
  jian(){
    var num = this.Base.getMyData().num
    if(num==1){
return
    }
    this.Base.setMyData({num:num-1})
  }
  jia(){
    var num = this.Base.getMyData().num
    this.Base.setMyData({num:num+1})

  }
  close(){
    this.Base.setMyData({buttom_flag:false})
  }
  xzbind(e){
    var  index=  e.currentTarget.dataset['index'];
    var  indexs=  e.currentTarget.dataset['indexs'];
    var shopdetail=this.Base.getMyData().shopdetail

    shopdetail.specslist[index].show=indexs
    this.Base.setMyData({shopdetail})

    this.jiage()


  }

  gocart(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  
  }
  queding(){
    var type= this.Base.getMyData().type
    var that = this 
    var num = this.Base.getMyData().num
    var str2=this.Base.getMyData().str2
    var jiageprice=this.Base.getMyData().jiageprice

    if(type=='A'){
      //加入购物车
      var cartApi = new CartApi()
      cartApi.cartadd({
        shop_id:this.Base.options.id,
        num,chooseid:str2,pricelist_id:jiageprice.id
      },(res)=>{
        if (res.code==0) {
          that.Base.toast("成功添加到购物车")
        }else{
          that.Base.toast("添加购物车失败")
        }

      })


    }

    if (type=='B') {
      var chooseid = str2.toString()
      var json={
        num:num,
        shop_id:this.Base.options.id,
        type:'B',
        chooseid,
        pricelist_id:jiageprice.id
      }
      var strjson = JSON.stringify(json)
      wx.navigateTo({
        url: '/pages/confirmorder/confirmorder?strjson='+ strjson,
      })

      
    }

    if (type=='C') {
      var guistr =''
      var guistrarr =[]
      var shopdetail = this.Base.getMyData().shopdetail
  
      for(let item of shopdetail.specslist){
        var show=item.show
        var name = item['sortlist'][show]['name']
        guistrarr.push(name)
      }
      guistr=guistrarr.toString()
      this.Base.setMyData({guistr,buttom_flag:false})

      
      
    }



  }
  onShareAppMessage(res){
    var taht =this
    
    var shopdetail = this.Base.getMyData().shopdetail
    var path='/pages/commoditydetail/commoditydetail?id='+shopdetail.id
    var title = shopdetail.summary
    var imageUrl=ApiConfig.GetUploadPath()+'shop/'+shopdetail.cover
    // console.log(imageUrl,'imageUrl');
    // return
    var shareObj={
      title:title,
      path:path,
      imageUrl:imageUrl,
      success:function (res){
        console.log(res,'success');
      },
      fail:function(res){
        console.log(res,'fail');
      },
      complete:function(res){
        console.log(res,'complete');
      }

    }
    return shareObj

    


  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.onShareAppMessage = content.onShareAppMessage;
body.queding = content.queding;
body.gocart = content.gocart;
body.jiage = content.jiage;
body.xzbind = content.xzbind;
body.close = content.close;
body.jia = content.jia;
body.jian = content.jian;


body.toggleDialog = content.toggleDialog;
body.toggleDialog_buttom=content.toggleDialog_buttom;



Page(body)