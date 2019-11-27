<template>
  <div class="content_box">
    <div class="content">
      <div class="shop_right">
        <h1>返现豪礼</h1>
        <div>
          <h5>我的邀请信息</h5>
          <div>
            <p>
              <span>累计邀请返现</span>
              <span>
                ¥
                <i>{{info.reward}}</i>
              </span>
            </p>
            <p>
              <span>当前邀请返现余额</span>
              <span>
                ¥
                <i>{{Number(info.freezeMoney).toFixed(2)}}</i>
              </span>
            </p>
          </div>
        </div>
        <!-- <div>
          <h5>提现方式</h5>
          <div class="pay_way">
            <p :class="{active:way==1}" @click="payWay(1)"></p>
            <p :class="{active:way==2}" @click="payWay(2)"></p>
          </div>
          <div class="cash">
            <p>提现金额</p>
            <input type="number" v-model="money" placeholder="请输入提现金额" />
          </div>
          <button @click="submitCash()">提交申请</button>
        </div> -->
        <div>
          <h5>累计邀请提现记录</h5>
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td>申请时间</td>
              <td>预计到账</td>
              <td>金额</td>
              <td>状态</td>
              <td>备注</td>
            </tr>
            <tr v-for="(item,i) in datalist" :key="i">
              <td>{{item.createTime}}</td>
              <td>{{item.payTime}}</td>
              <td>{{item.money}}</td>
              <td>{{item.status==0?'待处理':item.status==1?'已到账':'提现失败'}}</td>
              <td>{{item.remark}}</td>
            </tr>
            <tr v-if="!datalist||datalist.length==0">
              <td colspan="5">暂无提现记录</td>
            </tr>
          </table>
          <div v-if="totalPage>1" class="pages">
            <p @click="Topage((--tag)==0?1:tag)">&lt;</p>
            <p v-for="i in totalPage" :key="i" :class="{changebg:tag==i}" @click="Topage(i)">{{i}}</p>
            <p @click="Topage((++tag)>=totalPage?totalPage:tag)">&gt;</p>
            <p @click="Topage(totalPage)">尾页</p>
          </div>
        </div>
        <div>
          <h5>提现说明</h5>
          <p>1.目前本平台仅支持提现到支付宝/微信，按照其平台规则收取0.1%手续费，最低0.1元/笔。</p>
          <p>2.提现的微信/支付宝账户须为注册时绑定的实名制账户，如注册账户不能使用，请联系怀南会客服为您重新绑定。</p>
          <p>3.通常情况下提交提现后资金将在24小时内到账，请耐心等待。如逾期未到账，请联系怀南会客服为您确认进度，但由于合作方规则及通信网络原因，人工无法加急提现，敬请谅解。</p>
          <p>4.如由于网络、信息错误导致提现失败，资金将返回到您的账户中，请您不必担心资金安全，核实信息无误后再次提交提现即可。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      way: 1,
      token: null,
      datalist: null,
      money: null,
      info: {
        reward: '',
        freezeMoney: ''
      },
      totalPage: null,
      tag: 1,
    };
  },
  mounted() {
    this.getData();
    this.info = JSON.parse(localStorage.getItem("Info"));
  },
  methods: {
    Topage(i) {
      this.tag = i;
      this.getlist(i);
    },
    payWay(i) {
      this.way = i;
    },
    submitCash() {
      let data = {
        token: this.token,
        sms_verify: '',
        openingBank: '',
        account: '',
        accountName: '',
        money: this.money
      };
      let self = this;
      if(this.money<=0){
        this.$message({
          showClose: true,
          message: '提现金额不得小于等于零',
          type: 'warning'
        });
      } else if(this.money==null){
        this.$message({
          showClose: true,
          message: '请输入提现金额',
          type: 'warning'
        });
      } else if(Number(this.info.freezeMoney)==0){
        this.$message({
          showClose: true,
          message: '当前邀请返现余额为0，不能提现',
          type: 'warning'
        })
      } else {
        self.$ajax
        .post("/index.php/api/user/addwithdraw", self.$qs.stringify(data), {})
        .then(res => {
          // console.log(res);
          self.token = res.data.token;
          self.getData();
        });
        this.$router.push({ name: "cashOut" });
      }
    },
    getData(page) {
      let data = {
        token: localStorage.getItem("token"),
        page: page?page:1,
        span: "10"
      };
      let self = this;
      self.$ajax
        .post("/index.php/api/user/withdraw", self.$qs.stringify(data), {})
        .then(res => {
          // console.log(res);
          self.totalPage = res.data.totalPage;
          self.datalist = res.data.list;
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
.shop_right > div {
  margin-bottom: 35px;
}
.shop_right div h5 {
  font-weight: normal;
  font-size: 15px;
  margin-bottom: 10px;
}
.shop_right div:nth-of-type(1) div {
  height: 66px;
  width: 100%;
  background: #f6f6f6;
  padding: 8px 15px;
  box-sizing: border-box;
}
.shop_right div:nth-of-type(1) div p {
  height: 25px;
  line-height: 25px;
}
.shop_right div:nth-of-type(1) div p span:nth-child(2) i {
  font-size: 12px;
}
.shop_right div:nth-of-type(1) div p span:nth-child(2) {
  color: #de0812;
  font-size: 8px;
  margin-left: 8px;
}
.shop_right div:nth-of-type(2) button {
  width: 100px;
  height: 40px;
  font-size: 12px;
  line-height: 40px;
  color: #fff;
  background: #74171b;
  margin-left: 106px;
}
.pay_way {
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
}
.pay_way p {
  width: 150px;
  height: 60px;
  border: 1px #ececec solid;
  background: url(../../../static/img/wechat_pay.jpg) no-repeat;
  background-size: 100% 100%;
  margin-right: 28px;
}
.pay_way p:nth-child(2) {
  background: url(../../../static/img/zfb_pay.jpg) no-repeat;
  background-size: 100% 100%;
}
.cash {
  height: 30px;
  line-height: 30px;
  color: #666;
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
}
.cash p {
  margin-right: 16px;
  line-height: 30px;
  height: 30px;
}
.cash input {
  width: 240px;
  height: 30px;
  border: 1px #ececec solid;
  box-sizing: border-box;
  padding: 15px;
}
.shop_right div table {
  width: 100%;
  border: 1px #ececec solid;
  margin-bottom: 20px;
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
.shop_right div table tr {
  height: 85px;
  text-align: center;
  color: #666;
}
.shop_right div table tr td {
  border-bottom: 1px #ececec solid;
}
.shop_right div table tr:last-child td,
.shop_right div table tr:first-child td {
  border: 0;
}
.shop_right > div:last-of-type > p {
  color: #666;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
}
.pay_way .active {
  border: 1px #74171b solid;
}
.shop_list ul .changeColor {
  color: #74171b;
}
.pages {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 20px;
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
