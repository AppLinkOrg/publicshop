// pages/orderlist/orderlist.js
 // pages/orderinfo/orderinfo.js
 import {
    AppBase
  } from "../../appbase.js";  


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
        show:false
      })
    }
   
    onMyShow() { 
      var that = this;  
     
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
  }
  var content = new Content();
  var body = content.generateBodyJson();
  body.onLoad = content.onLoad;
  body.onMyShow = content.onMyShow;
  body.checkboxChange=content.checkboxChange;
  body.selectList=content.selectList;
  body.edit = content.edit;
  Page(body)