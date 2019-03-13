// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     arrlist:[],
     startX:0,//开始坐标
     startY:0,
     price_sum:0,
    selectAllStatus:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //从storage中获取数据
    wx.getStorage({
      key: 'attr_item',
      success: (res)=>{
        console.log(res)
        this.setData({
          arrlist:res.data
        })
        console.log(this.data.arrlist)
      },
      fail:res=>{
        wx.showToast({
          title:'失败',
          icon:fail
        })
      }
    })
    
  },
  touchstart:function(e){
 
     this.data.arrlist.map(item=>{
       if(item.isTouchMove)
       {
         item.isTouchMove=false
       }
     })
     this.setData({
       startX:e.changedTouches[0].clientX,
       startY:e.changedTouches[0].clientY,
       arrlist:this.data.arrlist
     })
   
  },
  selectAll(){
    this.data.arrlist.forEach(item=>{
      item.selected = !this.data.selectAllStatus
    })
    let result = 0;
    this.data.arrlist.map(item => {
      if (item.selected) {
        result += parseInt(item.price.split('元')[0])
      }
    })

    this.setData({
      arrlist: this.data.arrlist,
      selectAllStatus: !this.data.selectAllStatus ,
      price_sum: result
    })
  },
    //滑动事件处理
  touchmove(e){
    let index=e.currentTarget.dataset.index,
    startX= this.data.startX,//开始的x坐标点
    startY= this.data.startY,//开始的y坐标点
    touchMoveX=e.changedTouches[0].clientX,
    touchMoveY=e.changedTouches[0].clientY,
    //获得滑动角度
    angle = this.angle({
      X:startX,
      Y:startY
    },{
      X:touchMoveX,
      Y:touchMoveY
    })
    this.data.arrlist.forEach((v,i)=>{
        //v是属性,i是索引
        v.isTouchMove=false
        if(i==index){
          if(touchMoveX>startX){
            v.isTouchMove=false
          }else
          {  
            v.isTouchMove=true
          }
        }
    })
    //更新可移动的属性
    this.setData({
      arrlist:this.data.arrlist
    })
  },
  angle(start,end){
    let X=end.X-start.Y,
    Y=end.X-start.Y
    return 360*Math.atan(Y/X)/(2*Math.PI)
  },
  selectList(e){
   this.data.arrlist.forEach((v,i)=>{
     if(i==e.currentTarget.dataset.index)
     {
        v.selected=!v.selected

      }
   })
   this.setData({
     arrlist: this.data.arrlist
   })
   let result =0;
   this.data.arrlist.map(item=>{
     if(item.selected)
     {
       result += parseInt(item.price.split('元')[0])
     }
   })
   this.setData({
     price_sum:result
   })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  delCartItem(e){
    console.log(e.currentTarget.dataset.index)
      let arr_item=wx.getStorageSync('attr_item');
      arr_item.splice(e.currentTarget.dataset.index,1)
      wx.setStorageSync('attr_item',arr_item)
      this.setData({
       arrlist:arr_item
     })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getStorage({
      key: 'attr_item',
      success: (res) => {
        console.log(res)
        this.setData({
          arrlist: res.data
        })
        console.log(this.data.arrlist)
      },
      fail: res => {
        wx.showToast({
          title: '失败',
          icon: fail
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})