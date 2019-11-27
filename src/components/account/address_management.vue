<template>
  <div class="content_box">
    <div class="content">
      <div class="shop_right">
        <h1>配送地址</h1>
        <div>
          <button @click="addAddress()">新增地址</button>
          <p>
            您已创建
            <span>1</span>个收货地址，最多可创建20个
          </p>
        </div>
        <div>
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td>收货人</td>
              <td>所在地区</td>
              <td>详细地址</td>
              <td>手机</td>
              <td>操作</td>
            </tr>
            <tr>
              <td>放大的</td>
              <td>江苏省&nbsp;常州市&nbsp;钟楼区&nbsp;南大街街道</td>
              <td>南大街智汇园612</td>
              <td>123154654</td>
              <td>
                <span>修改</span>
                <span class="redC">默认地址</span>
                <span>删除</span>
              </td>
            </tr>
            <tr>
              <td>放大的</td>
              <td>江苏省&nbsp;常州市&nbsp;钟楼区&nbsp;南大街街道</td>
              <td>南大街智汇园612</td>
              <td>123154654</td>
              <td>
                <span>修改</span>
                <span>设为默认</span>
                <span>删除</span>
              </td>
            </tr>
            <tr>
              <td>放大的</td>
              <td>江苏省&nbsp;常州市&nbsp;钟楼区&nbsp;南大街街道</td>
              <td>南大街智汇园612</td>
              <td>123154654</td>
              <td>
                <span>修改</span>
                <span>设为默认</span>
                <span>删除</span>
              </td>
            </tr>
            <tr v-if="false">
              <td colspan="5">您还没有设置任何收货地址</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div v-if="addpopup" id="mask"></div>
    <div v-if="addpopup" class="popup">
      <div>
        <h1>添加收货地址</h1>
        <span @click="addpopup = false">X</span>
      </div>
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td>所属省份</td>
          <td>
            <select>
              <option value="">请选择省份</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>所属城市</td>
          <td>
            <select>
              <option value="">请选择城市</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>区/县</td>
          <td>
            <select>
              <option value="">请选择区/县</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>详细地址</td>
          <td>
            <input type="text" placeholder="详细地址" />
          </td>
        </tr>
        <tr>
          <td>收货人姓名</td>
          <td>
            <input type="text" placeholder="请输入收货人姓名" />
          </td>
        </tr>
        <tr>
          <td>手机号码</td>
          <td>
            <input type="tel" placeholder="请输入收货人手机号码" />
          </td>
        </tr>
      </table>

      <button>确定</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addpopup: false
    };
  },
  methods: {
    addAddress() {
      this.addpopup = true;
    }
  }
};
</script>

<style scoped>
/* 弹窗 */
#mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1200px;
  z-index: 999;
  background: #666;
  opacity: 0.5;
}
.popup {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 780px;
  height: 595px;
  background: #fff;
  z-index: 1000;
  border: 2px solid #74181b;
}
.popup div {
  height: 55px;
  background: #f5f5f5;
  line-height: 55px;
  padding: 0 30px;
  font-size: 16px;
}
.popup div h1 {
  font-weight: normal;
  float: left;
  font-size: 16px;
}
.popup div span {
  float: right;
  cursor: pointer;
}
.popup table {
  width: 100%;
  border: 1px #ececec solid;
}
.popup table tr {
  height: 60px;
}
.popup table tr td {
  border-bottom: 1px #ececec solid;
  font-size: 14px;
  text-align: center;
}
.popup table tr td select,
.popup table tr td input {
  width: 320px;
  height: 40px;
  outline: none;
  border: 1px #ececec solid;
  padding: 0 15px;
  box-sizing: border-box;
}
.popup table tr td:first-child {
  border-right: 1px #ececec solid;
  width: 211px;
  height: 60px;
  box-sizing: border-box;
  line-height: 60px;
}
.popup table tr:last-child td {
  border-bottom: 0;
}
.popup button {
  height: 50px;
  line-height: 50px;
  width: 130px;
  color: #fff;
  background: #74171b;
  font-size: 18px;
  margin: 60px 0 0 330px;
}
.content_box {
  overflow: hidden;
  width: 1000px;
  background: #fff;
  padding-bottom: 120px;
  margin-top: 15px;
  float: left;
}
.content {
  min-height: 600px;
  width: 1200px;
  overflow: hidden;
  margin: 0 auto;
}

.shop_right {
  width: 1000px;
  min-height: 1000px;
  float: left;
  padding-left: 30px;
  margin-top: 16px;
  box-sizing: border-box;
}
.shop_right h1 {
  font-size: 26px;
  height: 55px;
  line-height: 55px;
  font-weight: normal;
  padding: 0 20px;
  margin-bottom: 20px;
  border-bottom: 1px #ececec solid;
}
.shop_right div {
  margin-bottom: 35px;
}
.shop_right div:nth-of-type(1) {
  display: flex;
  flex-direction: row;
}
.shop_right div:nth-of-type(1) > p {
  height: 46px;
  line-height: 46px;
  font-size: 12px;
  color: #666;
}
.shop_right div:nth-of-type(1) > p span {
  color: #74171b;
}
.shop_right div:nth-of-type(1) button {
  width: 130px;
  height: 46px;
  line-height: 46px;
  font-size: 16px;
  color: #fff;
  background: #74171b;
  margin-right: 16px;
}
.shop_right div > table {
  width: 100%;
  border: 1px #e9e9e9 solid;
}
.shop_right div table tr:nth-child(1) {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  font-weight: normal;
  background: #f7f7f7;
  text-align: center;
  color: #000;
}
.shop_right div table tr td:nth-child(1) > img {
  width: 46px;
  height: 46px;
  border: 1px #ececec solid;
}
.shop_right div table tr td:nth-child(2) > img {
  width: 18px;
  height: 18px;
}
.shop_right div table tr {
  height: 46px;
  text-align: center;
  color: #666;
}
.shop_right div table tr td:first-child {
  padding-left: 30px;
}
.shop_right div table tr td:last-child span {
  height: 16px;
  line-height: 16px;
  padding: 0 5px;
  border-right: 1px #c9c9c9 solid;
}
.shop_right div table tr td:last-child span:last-child {
  border: 0;
}
.shop_right div table tr td {
  border-bottom: 1px #ececec solid;
}
.shop_right div table tr:last-child td,
.shop_right div table tr:first-child td {
  border: 0;
}
.shop_list ul .changeColor {
  color: #74171b;
}
.redC {
  color: #74171b;
}
</style>
