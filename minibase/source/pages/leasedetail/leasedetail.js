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
        leasedetail:[],autoplay:false,jiageprice:null,str2:[],first:0
    })

  }
  onMyShow() {
    var that = this;
    
    var first = this.Base.getMyData().first

    if (first!=0) {
      return
    }

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
          item.show=-1;
          for(let items of item.sortlist){
            items.xzshow=true
          }
         
        }

        res.specslist[0].show=0


        this.Base.setMyData({leasedetail:res,autoplay,first:1})

        this.yanshi()
        // this.jiage()
    })



  }
  select(e){
    var  index=  e.currentTarget.dataset['index'];
    var  indexs=  e.currentTarget.dataset['indexs'];
    var leasedetail=this.Base.getMyData().leasedetail

    if (leasedetail.specslist[index].sortlist[indexs].xzshow==false) {
      return
    }

    if (indexs==leasedetail.specslist[index].show) {
      leasedetail.specslist[index].show=-1
    }else{
      leasedetail.specslist[index].show=indexs
    }

    

    this.Base.setMyData({leasedetail})


   



    // 选项排查

  this.yanshi()


    // this.jiage()
  }
  yanshi(){
    var leasedetail=this.Base.getMyData().leasedetail
    var that  = this
     
    var str=[]
    for(let item of leasedetail.specslist){
      
      if(item.show!=-1){
  var show=item.show

  console.log(item,'itemggg');
  
  if (item['sortlist'][show]['xzshow']==false) {
    return
  }
      var id = item['sortlist'][show]['id']

     str.push(id)
      }
   
    }

    var str2=str.sort((a,b) => a - b)
    console.log('进来了22',str2.length==0);
    if (str2.length==0) {
      console.log('进来了');
      for(let item of leasedetail.specslist){
        for(let items of item.sortlist){
          items.xzshow=true
        }
       
      }
      this.Base.setMyData({leasedetail,jiageprice:null})
      // this.jiage()

      return
    }


    console.log(str2,'str2');



   // return


   var leaseApi = new LeaseApi()
   leaseApi.paicha({
     str:str2,
     id:this.Base.options.id
   },(res)=>{
     var arr = res.result.split(",")

     for(const [index,item]  of    leasedetail.specslist.entries()){

       for (const [indexs,items] of item.sortlist.entries()) {
         console.log(item,'leasedetail-items');
         console.log(items,'leasedetail-items');


         if (arr.indexOf(items.id)>=0) {
           items.xzshow=true
         }else{
          if(item.show==indexs){
            item.show=-1
          }
           items.xzshow=false
         }
        
         
         
       }


     }

     console.log(leasedetail,'leasedetail555');
this.Base.setMyData({leasedetail})

this.jiage()

     



     console.log(res,'resres');

   })

  }
 

  jiage(){
     var leasedetail=this.Base.getMyData().leasedetail
     
     var str=[]
     for(let item of leasedetail.specslist){
       if(item.show!=-1){

       
   var show=item.show

   if (item['sortlist'][show]['id']>0) {
    var id = item['sortlist'][show]['id']

    str.push(id)
   }
      
       }
    
     }

     var str2=str.sort((a,b) => a - b)
     console.log(str2,'str2');



    // return

    var sealseApi = new SealseApi()


//     var leaseApi = new LeaseApi()
//     leaseApi.paicha({
//       str:str2,
//       id:this.Base.options.id
//     },(res)=>{

//       for(let item of    leasedetail.specslist){

//         for (let items of item.sortlist) {
//           console.log(item,'leasedetail-items');
//           console.log(items,'leasedetail-items');


//           if (res.result.indexOf>=0) {
//             items.xzshow=true
//           }else{
//             items.xzshow=false
//           }
         
          
          
//         }


//       }
// this.Base.setMyData({leasedetail})

      



//       console.log(res,'resres');

//     })
    // return
    
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
        this.Base.setMyData({jiageprice:null,str2:[]})
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

    console.log(jiageprice,'jiageprice');

    if(jiageprice==null){
      this.Base.toast('尚未配置这个选项')
      return
    }
   

  

    wx.navigateTo({
      url: '/pages/leaseorder/leaseorder?sealseprice_id='+jiageprice.id+'&id='+this.Base.options.id,
    })

  }
  onShareAppMessage(res){
    var taht =this
    
    var leasedetail = this.Base.getMyData().leasedetail
    var path='/pages/leasedetail/leasedetail?id='+leasedetail.id
    var title = leasedetail.introduction
    var imageUrl=ApiConfig.GetUploadPath()+'lease/'+leasedetail.cover
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
  timer(){
    wx.navigateTo({
      url: '/pages/terms/terms?id=1',
    })
  }

  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.yanshi = content.yanshi;
body.timer = content.timer;
body.onShareAppMessage = content.onShareAppMessage;
body.zulin = content.zulin;
body.jiage = content.jiage;
body.select = content.select;

Page(body)