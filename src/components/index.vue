<template>
  <div class="content_box">
    <div class="content">
      <div class="shop_right">
        <div class="list">
          <ul>
            <li :class="{active:redText==1}" @click="showDiv(1)">全部订单</li>
            <li :class="{active:redText==2}" @click="showDiv(2)">待付款</li>
            <li :class="{active:redText==3}" @click="showDiv(3)">待收货</li>
            <li :class="{active:redText==4}" @click="showDiv(4)">待评价</li>
          </ul>
        </div>
        <div class="shop_search">
          <!-- <div class="search">
            <form action="/search" name="search_form" method="get" id="search_form">
              <input type="text" name="keyword" autocomplete="off" placeholder="输入商品名称或订单号搜索" />
              <div class="btn" rel="search_btn">
                <span onclick>搜索</span>
              </div>
            </form>
          </div> -->
        </div>
        <div class="shop_table">
          <table class="table" cellpadding="0" cellspacing="0">
            <tr>
              <th>商品信息</th>
              <th>单价</th>
              <th>数量</th>
              <th>商品状态</th>
              <th>操作</th>
            </tr>
          </table>
          <table
            class="tables"
            cellpadding="0"
            cellspacing="0"
            v-for="(item,i) in orderlist"
            :key="i"
          >
            <tr style="height:30px;background-color: #f6f6f6;margin-top: 5px;text-align: left">
              <th colspan="6" style="text-align: left">
                <span>{{item.orderTime}}</span>
                <span>订单号：{{item.serialNumber}}</span>
              </th>
            </tr>
            <tr v-for="(it,k) in item.goods" :key="k">
              <td>
                <div class="show">
                  <span>
                    <img :src="it.thumb" />
                  </span>
                  <span>{{it.title}}</span>
                </div>
              </td>
              <td>¥{{it.price}}</td>
              <td>{{it.number}}</td>
              <td>
                <p
                  v-if="item.logisticsStatus!=2&&item.payStatus==3&&!(item.affirmReceiptTime==0&&item.logisticsStatus==3)"
                >{{item.logisticsStatus==1?'待发货':item.logisticsStatus==3?'快件已签收':''}}</p>
                <p v-if="item.affirmReceiptTime==0&&item.logisticsStatus==3">交易完成</p>
                <p v-if="item.payStatus==1&&item.affirmPayTime">交易关闭</p>
                <p v-if="item.payStatus==2">等待付款</p>
                <p
                  style="cursor:pointer"
                  v-if="item.logisticsStatus==1&&item.payStatus==3"
                  @click="$router.push({ name: 'orderLogistics',query: { 'expressId': item.expressId,'logisticCode':item.tracking}})"
                >查看物流</p>
                <p
                  style="cursor:pointer"
                  v-if="item.payStatus!=1&&item.payStatus!=2"
                  @click="$router.push({ name: 'orderDetail',query: { 'id': item.id}})"
                >订单详情</p>
              </td>
              <td class="operation">
                <span
                  v-if="item.logisticsStatus!=1&&item.affirmReceiptTime!=0"
                  class="surplus"
                >剩余{{item.affirmReceiptTime}}</span>
                <span
                  v-if="item.logisticsStatus!=1&&item.affirmReceiptTime!=0"
                  class="btn_receipt"
                  @click="confirmOrder(item.id)"
                >确认收货</span>
                <span v-if="item.payStatus==1" class="gopay">立即购买</span>
                <span v-if="item.payStatus==2" class="gopay">立即付款</span>
                <!-- <span v-if="item.payStatus==2" @click="canaelOrder(item.id)">取消订单</span> -->
                <span
                  v-if="item.affirmReceiptTime==0&&item.logisticsStatus==3"
                  @click="$router.push({ name: 'orderEvaluate',query: { 'id': item.id}})"
                  style="cursor:pointer"
                >评价</span>
                <span v-if="item.payStatus==0">已失效</span>
              </td>
            </tr>
          </table>
          <div v-if="!orderlist" class="noOrder">
            <img src="../../static/img/noOrder.jpg" alt />
            <p>您当前没有任何订单哦！</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="totalPage>1" class="pages">
      <p @click="Topage((--tag)==0?1:tag)">&lt;</p>
      <p v-for="i in totalPage" :key="i" :class="{changebg:tag==i}" @click="Topage(i)">{{i}}</p>
      <p @click="Topage((++tag)>=totalPage?totalPage:tag)">&gt;</p>
      <p @click="Topage(totalPage)">尾页</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      redText: 1,
      redColor: 1,
      detail: null,
      orderlist: [],
      token: null,
      totalPage: null,
      tag: 1
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    confirmOrder(id){
      let data = {
        token: this.token,
        orderId: id
      };
      let self = this;
      self.$ajax
        .post("/index.php/user/order/confirm_receive?ajax=true", self.$qs.stringify(data), {})
        .then(res => {
          // console.log(res);
        });
    },
    Topage(i) {
      this.tag = i;
      if (this.redText == 1) {
        this.getorderlist("", i);
      } else if (this.redText == 2) {
        this.getorderlist("un_payment", i);
      } else if (this.redText == 3) {
        this.getorderlist("un_received", i);
      } else {
        this.getorderlist("un_evaluated", i);
      }
    },
    load() {
      let data = {
        name: "guwei",
        password: this.$md5("123456")
      };
      let self = this;
      self.$ajax
        .post("/index.php/login/login?ajax=true", self.$qs.stringify(data), {})
        .then(res => {
          self.token = res.data.token;
          localStorage.setItem("token", self.token);
          self.getorderlist();
        });
    },
    showDiv(i) {
      this.tag = 1;
      this.redText = i;
      if (i == 1) {
        this.getorderlist();
      } else if (i == 2) {
        this.getorderlist("un_payment");
      } else if (i == 3) {
        this.getorderlist("un_received");
      } else {
        this.getorderlist("un_evaluated");
      }
    },
    canaelOrder() {},

    getorderlist(status, page) {
      let data = {
        token: this.token,
        status: status,
        activity: "0",
        span: "1",
        page: page ? page : 1
      };
      let self = this;
      self.$ajax
        .post(
          "/index.php/api/user/order_list?ajax=true",
          self.$qs.stringify(data),
          {}
        )
        .then(res => {
          self.orderlist = res.data.list;
          self.totalPage = res.data.totalPage;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.noOrder {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}
.noOrder p {
  font-size: 18px;
  color: #666666;
  margin-left: 10px;
}
.surplus {
  color: #de0812;
  font-size: 8px;
}
.gopay {
  width: 56px;
  height: 18px;
  font-size: 8px;
  background: #de0812;
  color: #fff;
  line-height: 18px;
  display: block;
  border-radius: 5px;
  cursor: pointer;
  border: 1px #de0812 solid;
  box-sizing: border-box;
}
.gopay:hover {
  border: 1px #de0812 solid;
  color: #de0812;
  background: #fff;
  line-height: 18px;
  display: block;
  border-radius: 5px;
}
.btn_receipt {
  width: 56px;
  height: 18px;
  font-size: 8px;
  background: #74171b;
  color: white;
  line-height: 18px;
  display: block;
  border-radius: 5px;
}
.shop_right {
  width: 1000px;
  min-height: 1000px;
  float: left;
  padding-left: 30px;
  box-sizing: border-box;
}

.show {
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.show span {
  display: block;
  float: left;
}
.show span:nth-child(1) {
  width: 60px;
  height: 60px;
  box-sizing: border-box;
  border: 1px #e9e9e9 solid;
  margin-right: 16px;
}
.show span:nth-child(2) {
  width: 200px;
}
.show span img {
  width: 58px;
  height: 58px;
  float: left;
}
.show p {
  float: left;
}
.shop_search {
  overflow: hidden;
}
.shop_search .search {
  width: 250px;
  height: 30px;
  margin-left: 6px;
  float: left;
  margin-top: 30px;
  margin-bottom: 20px;
  border: 1px #cecece solid;
  box-sizing: border-box;
}
.shop_search .search input {
  width: 200px;
  height: 26px;
  float: left;
  border: none;
  outline: none;
  padding: 0 12px;
  box-sizing: border-box;
  font-size: 12px;
  margin-top: 1px;
  margin-left: 1px;
}
.shop_search .search .btn {
  width: 45px;
  height: 28px;
  background: #888;
  float: right;
  line-height: 38px;
  text-align: center;
  color: white;
  font-size: 12px;
}
.shop_search .search .btn span {
  height: 28px;
  line-height: 28px;
  display: block;
  text-align: center;
  background: #ededed;
  color: #575757;
}
.shop_table {
  overflow: hidden;
  margin-top: 20px;
}
.shop_table table {
  width: 100%;
}
.shop_table .table {
  background: #e9e9e9;
  font-size: 12px;
  height: 40px;
  line-height: 40px;
}
.shop_table .table tr th {
  width: 127px;
}
.shop_table .table tr th:nth-child(1) {
  width: 460px;
  text-align: left;
  padding-left: 100px;
  box-sizing: border-box;
}
.shop_table .tables {
  margin-top: 10px;
  border: 1px #e9e9e9 solid;
}
.shop_table .tables tr td {
  height: 85px;
  text-align: center;
  color: #666666;
  width: 127px;
}
.shop_table .tables tr th {
  height: 30px;
  font-weight: normal;
  padding-left: 15px;
  color: #666666;
}
.shop_table .tables tr th span {
  margin-right: 10px;
}
.shop_table .table tr td {
  width: 127px;
}
.shop_table .tables tr td:nth-child(1) {
  width: 460px;
  text-align: left;
  padding: 0 15px;
  box-sizing: border-box;
}
.operation {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.list {
  width: 100%;
  height: 60px;
  border-bottom: 2px solid #eee;
}
.list ul li {
  width: 100px;
  float: left;
  text-align: center;
  line-height: 60px;
  font-size: 18px;
}
.active {
  border-bottom: 2px solid #74171b;
  color: #74171b;
}
.pages {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 50px;
  margin-top: 20px;
}
.pages p {
  width: 33px;
  height: 33px;
  border: 1px #e9e9e9 solid;
  line-height: 33px;
  text-align: center;
  margin-right: 4px;
  color: rgb(121, 121, 121);
  float: left;
}
.pages .changebg,
.pages p:hover {
  background: rgb(116, 24, 27);
  color: white;
}
.pages p:last-child {
  margin: 0;
  width: 58px;
}
</style>
