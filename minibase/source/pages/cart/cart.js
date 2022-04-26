import {
    AppBase
  } from "../../appbase.js";  
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CartApi } from "../../apis/cart.api.js";
import { OrderApi } from "../../apis/order.api.js";

  class Content extends AppBase {
    constructor() {
      super();
    }
    onLoad(options) {
      this.Base.Page = this;
      //options.id=5;
      //options.id = 149;
      super.onLoad(options);
      this.Base.setMyData({
        val:0,
        show:false,cartlist:[],amount:0.00,quanshow:false
      })
      var amount =0;
      var amount=amount.toFixed(2)
      this.Base.setMyData({amount})


    }
   
    onMyShow() { 
      var that = this;  


      this.carlist()

     
    }

    edit(){
      this.Base.setMyData({
        show:!this.data.show
      })
    }
    //点击选框，改变总价
  selectList(e) {
    const index =e.currentTarget.dataset.index;    // 获取data- 传进来的index
    console.log(index)
    // let carts =this.data.img_s;                    // 获取购物车列表
    // const selected =carts[index].selected;         // 获取当前商品的选中状态
//     carts[index].selected= !selected;              // 改变状态
//     this.setData({
//         img_s: carts
//     });
//    this.countotal();                           // 重新获取总价
}
    checkboxChange(e) {
          console.log('checkbox发生change事件，携带value值为：', e.detail.value)
          if(e.detail.value ==1){
            this.Base.setMyData({
              val:0
            });
          }else{
            this.Base.setMyData({
              val:1
            });
          }
        }

  carlist(){
    var cartApi = new CartApi()
    cartApi.cartlist({},(res)=>{
      for (let item of res) {
        item.show=false
      }
      this.Base.setMyData({cartlist:res})
    })

  }
  jiage(){
    var cartlist =this.Base.getMyData().cartlist
    var amount=0;
    for (let item of cartlist) {
      if (item.show==true) {
        amount=amount+item.num*item.pricelist_present
       
      }
     
    
      
    }
    this.Base.setMyData({amount:amount.toFixed(2)})

  }
  xzbind(e){
    var index = e.currentTarget.id
    var cartlist =this.Base.getMyData().cartlist
    
    cartlist[index].show=!cartlist[index].show
     
    this.Base.setMyData({cartlist})

    this.jiage()

  }
  quanbind(){
    var quanshow =this.Base.getMyData().quanshow
    var cartlist =this.Base.getMyData().cartlist

    if(quanshow==false){
 for(let item of cartlist){
      item.show=true
    }
    }else{
      for(let item of cartlist){
        item.show=false
      }
    }
   


    this.Base.setMyData({quanshow:!quanshow,cartlist})

this.jiage()

  }
  gosc(){
    var cartlist =this.Base.getMyData().cartlist
    var show = this.Base.getMyData().show
    var that =this
    var str=[]
    for(let item of cartlist){
      if (item.show==true) {
        str.push(item.id)
      }

    }
    if (str.length==0) {
      return
    }


    if (show==true) {
      // 删除
      wx.showModal({
        content: '确定要删除这些商品吗？',
        success(res){
          if (res.confirm) {

            var orderApi = new OrderApi()
         
      orderApi.update({
        type:'C',leixin:'A',str
      },(res)=>{
        if (res.code==0) {
          that.Base.toast('删除成功')
          
          that.carlist()
          that.jiage()
        }else{
          that.Base.toast('删除失败')
        }

      })


            
          }else if(res.cancel){

          }

        }
      })
      

      
    }else{
      var str2=str.toString()
      console.log(str2,'str2');
      // return
      wx.navigateTo({
        url: '/pages/confirmorder/confirmorder?str='+str2,
      })

    }

    





    

  }


  }
  var content = new Content();
  var body = content.generateBodyJson();
  body.onLoad = content.onLoad;
  body.onMyShow = content.onMyShow;
  body.checkboxChange=content.checkboxChange;
  body.selectList=content.selectList;
  body.edit = content.edit;

  body.gosc = content.gosc;
  body.quanbind = content.quanbind;
  body.jiage = content.jiage;
  body.xzbind = content.xzbind;
  body.carlist = content.carlist;
  Page(body)