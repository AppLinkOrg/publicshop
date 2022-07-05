// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ActiveApi } from "../../apis/active.api.js";
import { ShopApi } from "../../apis/shop.api.js";
var WxParse = require('../../wxParse/wxParse');
import { CartApi } from "../../apis/cart.api.js";
import { CanshuApi } from "../../apis/canshu.api.js";



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
      type:'',str2:[],guistr:'',first:0,canshushow:false,canshulist:[],instinfoss:null,freightshow:false
    })

  }
  onMyShow() {
    var that = this;
    var first = this.Base.getMyData().first
    if (first!=0) {
      return
      
    }

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
      console.log( res.content,' res.content');
      WxParse.wxParse('content', 'html', res.content, that, 10);


      for(let item of res.specslist){
        item.show=-1
        for(let items of item.sortlist){
          items.xzshow=true
        }
      }
      res.specslist[0].show=0

      this.Base.setMyData({shopdetail:res,autoplay,first:1})

      
this.yanshi()
      // this.jiage()
    })


    // var instApi= new InstApi()
    // instApi.info({}, (instinfoss) => {
    //   if (instinfoss == null || instinfoss == false) {

    //     return;
    //   }

      

      


    //   this.Base.setMyData({
    //     instinfoss: instinfoss
    //   });
      
    // });



  }
  yanshi(){
    var shopdetail = this.Base.getMyData().shopdetail

    var str=[];
    var that = this

    var shopApi =new ShopApi()

    for(let item of shopdetail.specslist){
      var show=item.show
     
console.log(item.sortlist[show],'itemggg');
if (item.show==-1) {
  
}else{
//  if (item.sortlist[show].xzshow==true) {
           var id = item['sortlist'][show]['id']
      str.push(id)
        // }
}
       
        
   
     

    }
    var str2=str.sort((a,b) => a - b)

    console.log('str26666',str2,str2.length);
    console.log('shopdetail',shopdetail);

    if (str2.length==0) {
      for(let item of shopdetail.specslist){
        for(let items of item.sortlist){
          items.xzshow=true
        }
      }
      this.Base.setMyData({shopdetail})
      this.jiage()
      return
    }

    console.log('进来了','str2');

    shopApi.paicha({
      str:str2,
     id:this.Base.options.id
    },(res)=>{
      var arr = res.result.split(",")



      for(const [index,item]  of    shopdetail.specslist.entries()){
        console.log('进来了22',item.show,index);
        for (const [indexs,items]   of item.sortlist.entries()) {
          console.log(item,'leasedetail-items');
          console.log(items,'leasedetail-items');
 
 
          if (arr.indexOf(items.id)>=0) {
            items.xzshow=true
          }else{
console.log('进来了2',item.show,indexs);

            if(item.show==indexs){
              item.show=-1
            }
          
            
            items.xzshow=false
          }
         
          
          
        }
 
 
      }
 
      console.log(shopdetail,'leasedetail555');
 this.Base.setMyData({shopdetail,jiageprice:null})

 that.jiage()


    })







  }
  jiage(){
    var shopdetail = this.Base.getMyData().shopdetail
    var str=[];

    for(let item of shopdetail.specslist){

      var show=item.show
      if (item.show==-1) {
  
      }else{
       if (item.sortlist[show].xzshow==true) {
                 var id = item['sortlist'][show]['id']
            str.push(id)
              }
      }

      // var id = item['sortlist'][show]['id']
      // str.push(id)

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
  close2(){
    this.Base.setMyData({canshushow:false})
  }
  close3(){
    this.Base.setMyData({freightshow:false})
  }
  xzbind(e){
    var  index=  e.currentTarget.dataset['index'];
    var  indexs=  e.currentTarget.dataset['indexs'];
    var shopdetail=this.Base.getMyData().shopdetail

    if (shopdetail.specslist[index].show==indexs) {
      shopdetail.specslist[index].show=-1
    }else{
      shopdetail.specslist[index].show=indexs
    }

    
    this.Base.setMyData({shopdetail})

    this.yanshi()

    // this.jiage()


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

      if(jiageprice==null){
that.Base.toast('请选择规格')
return
      }

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
        if(item.show>=0){
 var name = item['sortlist'][show]['name']
        guistrarr.push(name)
        }
       
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
  canshu(e){
    var index = e.currentTarget.id
    var id = this.Base.options.id
    var that = this

    if (index==2) {
      var instinfo = this.Base.getMyData().instinfo
      console.log(instinfo,'instinfo');
      if (instinfo.frient=='') {
        that.Base.toast('尚未填写运费说明')
        return
      }
      
      instinfo.frient = that.Base.util.HtmlDecode(instinfo.frient);
      console.log('啊啊啊啊');
      WxParse.wxParse('content2', 'html', instinfo.frient, that, 10);
      this.Base.setMyData({freightshow:true})

      return
    }

    var canshuApi = new CanshuApi()
    canshuApi.canshulist({
      shop_id:id
    },(res)=>{
      if (res.length==0) {
        that.Base.toast('商家未上传参数')
        return
      }else{
        this.Base.setMyData({canshulist:res,canshushow:true})
      }
     

    })



  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;


body.yanshi = content.yanshi;
body.close3 = content.close3;
body.close2 = content.close2;
body.canshu = content.canshu;
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