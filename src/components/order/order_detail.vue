<template>
  <div class="content_box">
    <div class="content">
      <div class="shop_right">
        <h1>订单详情</h1>
        <div>
          <p>订单号：&nbsp;&nbsp;{{data.serialNumber}}</p>
          <p>交易时间：&nbsp;&nbsp;{{data.orderTimeDate}}</p>
        </div>
        <div>
          <p>商家名称：&nbsp;&nbsp;{{data.buyerName}}</p>
        </div>
        <div class="orderInfo">
          <h5>订单信息</h5>
          <p>
            收货信息：
            <span>{{address.name}}</span>
            <span>{{address.phone}}</span>
            <span>{{address.address}}</span>
          </p>
          <p>买家留言：{{data.message==''?'无':data.message}}</p>
        </div>
        <table cellpadding="0" cellspacing="0">
          <tr>
            <th>商品信息</th>
            <th>单价</th>
            <th>数量</th>
            <th>总计</th>
          </tr>
          <tr v-for="(item,i) in goodsList" :key="i">
            <td>
              <img :src="item.thumb" alt />
              <p>{{item.title}}</p>
            </td>
            <td>¥{{item.price}}</td>
            <td>{{item.number}}</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <p>商品总价：&nbsp;&nbsp;¥{{data.totalPrice}}</p>
              <p>
                合计：&nbsp;&nbsp;
                <span>¥{{data.totalPrice}}</span>
              </p>
            </td>
          </tr>
        </table>
        <div class="orderDiary">
          <h5>订单日志</h5>
          <p>
            <span>内容</span>
            <span>时间</span>
          </p>
          <p v-for="(item,i) in data.order_log" :key="i">
            <span>{{item.operate}}</span>
            <span>时间：{{item.operateTimeDate}}</span>
          </p>
          <!-- <p>
            <span>用户：AQaaaa订单支付成功</span>
            <span>时间：2019-11-20&nbsp;&nbsp;14:18:03</span>
          </p>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: null,
      data: {},
      address: {},
      goodsList: []
    };
  },
  created() {
    this.id = this.$route.query.id;
    
    this.getlist();
  },
  methods: {
   
    formatDate(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y, M, D, h, m, s;
      Y = date.getFullYear() + "-";
      M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      D = date.getDate() + " ";
      h = date.getHours() + ":";
      m = date.getMinutes() + ":";
      s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    getlist() {
      let data = {
        id: this.id,
        token:this.c.getCookie()
      };
      let self = this;
      self.$ajax
        .post(
          "/index.php/user/order/detail?ajax=true",
          self.$qs.stringify(data),
          {}
        )
        .then(res => {
          // self.list = res.datalist;
          this.data = res.data;
          this.address = this.data.address;
          this.goodsList = this.data.goods;
        });
    }
  }
};
</script>

<style scoped>
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
  height: 1000px;
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
.shop_right div:nth-of-type(1) {
  padding: 0 20px;
  color: #666;
  background: #e9e9e9;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 40px;
  font-size: 12px;
  margin-bottom: 8px;
}
.shop_right div:nth-of-type(2) {
  padding: 0 20px;
  font-size: 12px;
  line-height: 40px;
  margin-bottom: 16px;
  color: #666;
  height: 40px;
  border: 1px #ececec solid;
}
.orderInfo {
  height: 114px;
  border: 1px #ececec solid;
  padding: 15px 18px;
  margin-bottom: 30px;
}
.orderInfo h5 {
  font-size: 15px;
  font-weight: normal;
  margin-bottom: 22px;
}
.orderInfo p {
  margin-bottom: 14px;
  color: #666;
}
.shop_right table {
  border: 1px #ececec solid;
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}
.shop_right table tr {
  height: 85px;
}
.shop_right table tr th {
  font-weight: normal;
}
.shop_right table tr td p span {
  color: #de0812;
}
.shop_right table tr th:nth-of-type(1) {
  text-align: left;
  padding-left: 100px;
}
.shop_right table tr:first-child {
  height: 30px;
  text-align: center;
  background: #f5f5f5;
  padding: 0;
}
.shop_right table tr td:first-child {
  padding: 0 15px;
}
.shop_right table tr td:first-child img {
  width: 60px;
  height: 60px;
  border: 1px #ececec solid;
  margin-right: 16px;
  float: left;
}
.shop_right table tr td:first-child p {
  float: left;
  height: 60px;
  line-height: 60px;
}
.shop_right table tr:last-child {
  height: 40px;
}
.shop_right table tr td:last-child {
  width: 110px;
  font-size: 10px;
  text-align: right;
  padding-right: 15px;
}
.orderDiary {
  height: 155px;
  border: 1px #ececec solid;
  padding: 15px 0 0 0;
  box-sizing: border-box;
}
.orderDiary h5 {
  font-size: 15px;
  font-weight: normal;
  margin-bottom: 10px;
  padding: 0 18px;
}
.orderDiary p:nth-of-type(1) {
  background: #f8f8f8;
  padding: 0 72px;
  height: 30px;
  line-height: 30px;
}
.orderDiary p:nth-of-type(2) {
  margin-top: 20px;
  margin-bottom: 15px;
}
.orderDiary p {
  height: 12px;
  line-height: 12px;
  font-size: 12px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.shop_list ul .changeColor {
  color: #74171b;
}
</style>
  },
  methods: {
    formatDate(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y, M, D, h, m, s;
      Y = date.getFullYear() + "-";
      M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      D = date.getDate() + " ";
      h = date.getHours() + ":";
      m = date.getMinutes() + ":";
      s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    getlist() {
      let data = {
        id: this.id,
        token:this.c.getCookie()
      };
      let self = this;
      self.$ajax
        .post(
          "/index.php/user/order/detail?ajax=true",
          self.$qs.stringify(data),
          {}
        )
        .then(res => {
          // self.list = res.datalist;
          this.data = res.data;
          this.address = this.data.address;
          this.goodsList = this.data.goods;
        });
    }
  }
};
</script>

<style scoped>
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
  height: 1000px;
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
.shop_right div:nth-of-type(1) {
  padding: 0 20px;
  color: #666;
  background: #e9e9e9;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 40px;
  font-size: 12px;
  margin-bottom: 8px;
}
.shop_right div:nth-of-type(2) {
  padding: 0 20px;
  font-size: 12px;
  line-height: 40px;
  margin-bottom: 16px;
  color: #666;
  height: 40px;
  border: 1px #ececec solid;
}
.orderInfo {
  height: 114px;
  border: 1px #ececec solid;
  padding: 15px 18px;
  margin-bottom: 30px;
}
.orderInfo h5 {
  font-size: 15px;
  font-weight: normal;
  margin-bottom: 22px;
}
.orderInfo p {
  margin-bottom: 14px;
  color: #666;
}
.shop_right table {
  border: 1px #ececec solid;
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}
.shop_right table tr {
  height: 85px;
}
.shop_right table tr th {
  font-weight: normal;
}
.shop_right table tr td p span {
  color: #de0812;
}
.shop_right table tr th:nth-of-type(1) {
  text-align: left;
  padding-left: 100px;
}
.shop_right table tr:first-child {
  height: 30px;
  text-align: center;
  background: #f5f5f5;
  padding: 0;
}
.shop_right table tr td:first-child {
  padding: 0 15px;
}
.shop_right table tr td:first-child img {
  width: 60px;
  height: 60px;
  border: 1px #ececec solid;
  margin-right: 16px;
  float: left;
}
.shop_right table tr td:first-child p {
  float: left;
  height: 60px;
  line-height: 60px;
}
.shop_right table tr:last-child {
  height: 40px;
}
.shop_right table tr td:last-child {
  width: 110px;
  font-size: 10px;
  text-align: right;
  padding-right: 15px;
}
.orderDiary {
  height: 155px;
  border: 1px #ececec solid;
  padding: 15px 0 0 0;
  box-sizing: border-box;
}
.orderDiary h5 {
  font-size: 15px;
  font-weight: normal;
  margin-bottom: 10px;
  padding: 0 18px;
}
.orderDiary p:nth-of-type(1) {
  background: #f8f8f8;
  padding: 0 72px;
  height: 30px;
  line-height: 30px;
}
.orderDiary p:nth-of-type(2) {
  margin-top: 20px;
  margin-bottom: 15px;
}
.orderDiary p {
  height: 12px;
  line-height: 12px;
  font-size: 12px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.shop_list ul .changeColor {
  color: #74171b;
}
</style>
