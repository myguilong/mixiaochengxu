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
    goods_num:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cartlength = wx.getStorageSync('attr_item')
    const id = options.id
    const detail = app.globalData.goodsDetail.filter(item=>item.id==id)
    app.globalData.thisDetail=detail;
    console.log(detail)
    this.setData({
      detail:detail[0],
      goods_num:cartlength.length
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