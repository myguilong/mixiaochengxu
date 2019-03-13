// pages/goods/goods.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    selected:true,
    selected1:false,
    goods_num:0,
    goodsname:'',
    price:'',
    memory:'',
    color:''
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cartlength = wx.getStorageSync('attr_item')
    const id = options.id
    
    const detail = app.globalData.goodsDetail.filter(item=>item.id==id)
    app.globalData.thisDetail=detail;
    let arr=[];
    //arr为购物车中该商品的数量    
    if(cartlength)
    {
      //判断cartlength中是否存在值
      arr=cartlength.filter(item=>item.goodsname==detail[0].header)
      
    }else
    {
     arr=[]
    }
    this.setData({
      detail:detail[0],
      goods_num:cartlength.length, //获取购物车存在的商品数量
      goodsname:arr.length?arr[0].goodsname:detail[0].header,
      price:arr.length?arr[0].price:detail[0].meta,
      memory:arr.length?arr[0].memory:detail[0].default[0],
      color:arr.length?arr[0].color:detail[0].default[1]
     
    })
    
  },
  previewImage(e){
   const index=e.currentTarget.dataset.id
    const slide = this.data.detail.goods_slides;
    const imgList = [];
    slide.map(item=>{
      imgList.push(item.slide_url)
    })
    wx.previewImage({
      current:imgList[index],
      urls:imgList
    })
  },
  selectParameter(){
     this.setData({
       selected:false,
       selected1:true
     })
  },
  selectBrief(){
    this.setData({
      selected: true,
      selected1:false
    })
  },
  toSelect(){
    const arr_item = wx.getStorageSync('attr_item')
    console.log(arr_item)
    console.log(this.data.detail)
    const temp={
      goodsname: this.data.detail.header,
      memory: this.data.detail.default[0],
      price: this.data.detail.meta,
      color: this.data.detail.default[1],
      select_num:1,
      selected:false
    }
   wx.setStorageSync('attr_item', [temp,...arr_item])
   wx.showToast({
     title: '加入购物车成功',
     icon: 'success',
     duration: 3000,
     success:()=>{
       setTimeout(() => {
         wx.navigateBack({
           url: '../goods/goods'
         })
       }, 1000)
     }
   })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const cartlength = wx.getStorageSync('attr_item')
    
    this.setData({
      goods_num:cartlength.length
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