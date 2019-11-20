// pages/pages/orderSearch/repair/repair.js
const sourceType = [['camera'], ['album'], ['camera', 'album']]
const sizeType = [['compressed'], ['original'], ['compressed', 'original']]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['线上', '线下'],
    index: 0,
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
  onClickLeft() {
    wx.showToast({ title: '点击返回', icon: 'none' });
  },

  onClickRight() {
    wx.showToast({ title: '点击按钮', icon: 'none' });
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
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