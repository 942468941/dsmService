// pages/pages/appointment/uploadImg1/uploadImg1.js
const sourceType = [['camera'], ['album'], ['camera', 'album']]
const sizeType = [['compressed'], ['original'], ['compressed', 'original']]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showImgArr: [
      { "src": '/pages/static/images/example1.png', "name": "锁舌弹出-正面视图" },
      { "src": '/pages/static/images/example1.png', "name": "锁舌弹出-侧面视图" },
      { "src": '/pages/static/images/example1.png', "name": "锁舌弹出-正面视图" }
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    showImg: false,
    chooseImageShow: true,
    deleteImgStatus: false,
    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 0,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  showExample(e) {
    this.setData({
      showImg: true
    })
  },
  //隐藏示例
  cancelFun(e) {
    this.setData({
      showImg: false
    })
  },
  sourceTypeChange(e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  sizeTypeChange(e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  countChange(e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  chooseImage() {
    const that = this
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success(res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths,
          chooseImageShow: false,
          deleteImgStatus: true
        })
      }
    })
  },
  //删除图片
  deleteImg(e) {
    const that = this;
    that.setData({
      chooseImageShow: true,
      imageList: [],
      deleteImgStatus: false
    })
  },
  previewImage(e) {
    const current = e.target.dataset.src;
    wx.previewImage({
      current,
      urls: this.data.imageList
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