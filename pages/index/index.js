// pages/index/index.js
import showDetail from "../../modules/showDetail"
import showcDetail from "../../modules/showcDetail"
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index_slides:[],
    indicator_dots:true,
    autoplay:true,
    interval:2000,
    duration:1000,
    nav_data:[],
    index_activity:[],
    index_block:[],
    isTap:false,
    isLoading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad(){
     const index_slides=app.globalData.index_slides,
           nav_data=app.globalData.nav_data,
           index_activity=app.globalData.index_activity,
           index_block=app.globalData.index_block,
           sectionList=index_block.map(section=>{
             return section.section
        })
        console.log(sectionList)
        this.setData({
          index_slides,
          index_activity,
          nav_data,
          index_block
        })
   },
   onShow(e){
     this.setData({
       isTap:true
     });
   },
  showDetail(e){
    console.log(e)
    const id = e.currentTarget.dataset.pid;
    console.log(id)
    wx.navigateTo({
      url: `/pages/goods/goods?id=${id}`,
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