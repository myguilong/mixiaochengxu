// pages/selectGoods/selectGoods.js
const app = getApp()
//进入时应该是已经选择的规格
Page({
  /**
   * 页面的初始数据
   */
  data: {
    item:[],
     color:'',
    goods_attrSelect:[],
    memory:'',
    price:'',
    curvIndex:0,
    curcIndex:0,
    select_num:1,
    cove_img:'',
    
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断storafesync中是否存在购物车数值，存在就读取不存在就使用原始数据
     
    this.setData({
      item:app.globalData.thisDetail,
      goods_attrSelect: app.globalData.thisDetail,
      color: app.globalData.thisDetail[0].default[1],
      memory: app.globalData.thisDetail[0].default[0],
      price:app.globalData.thisDetail[0].default[3],
      cove_img:app.globalData.thisDetail[0].goods_slides[0].slide_url
    })
    console.log(app.globalData.thisDetail)
    wx.setStorageSync('goodsname',this.data.goods_attrSelect[0].header )
  },
  versionHasSelected(e){   
       this.setData({
         curvIndex:e.currentTarget.dataset.index
       })
  }, 
  selectVersion(e)
  {
     const version = e.detail.value;
     const price = version.split(',')[1]
     const memory = version.split(',')[0]
     wx.setStorageSync('memory', memory)
     wx.setStorageSync('price', price)
     this.setData({
       price,memory
     })
  },
  selectColor(e){
    //这里还要存放一个图片地址进入购物车对象信息
    const cove_img = this.data.goods_attrSelect[0].goods_slides[0].slide_url
     wx.setStorageSync('cove_img',cove_img)
     this.setData({
        color:e.detail.value
     })
    wx.setStorageSync('color', e.detail.value)
  },
  minusCount(){
    this.setData({
      select_num:this.data.select_num==1?this.data.selecl_num=1:this.data.select_num-1
    })
    wx.setStorageSync('select_num', this.data.select_num)
  },
  addCount(){
    this.setData({
       select_num: this.data.select_num == 10 ? this.data.select_num = 10 : this.data.select_num + 1
    })
    wx.setStorageSync('select_num', this.data.select_num)
  },
  colorHasSelected(e){
     //改变图片地址
     const index = e.currentTarget.dataset.index

    this.setData({
      curcIndex:e.currentTarget.dataset.index,
      cove_img: app.globalData.thisDetail[0].goods_slides[index].slide_url
    })
  },
  submit(e){
    const pre_item = wx.getStorageSync('attr_item')
    console.log(pre_item)
    const temp = {
      'goodsname': wx.getStorageSync('goodsname') ? wx.getStorageSync('goodsname'):this.data.goods_attrSelect.header,
      'memory': wx.getStorageSync('memory') ? wx.getStorageSync('memory'):this.data.memory,
      'price': wx.getStorageSync('price') ? wx.getStorageSync('price'):this.data.price,
      'color': wx.getStorageSync('color') ? wx.getStorageSync('color'):this.data.color,
      'select_num': wx.getStorageSync('select_num') ? wx.getStorageSync('select_num'):this.data.select_num,
      'cover':wx.getStorageSync('cover'),
      'cove_img': wx.getStorageSync('cover_img') ? wx.getStorageSync('cover_img'):this.data.cove_img,
      'selected':false,
      'isTouchMove':false
    }
    wx.setStorageSync('attr_item', [temp,...pre_item])
    wx.showToast({
      title: '已加入购物车',
      icon:'success',
      duration:3000,
      success(){
        setTimeout(()=>{
          wx.navigateBack({
            url:'../goods/goods'
          })
        },1000)
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