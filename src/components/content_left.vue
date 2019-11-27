<template>
  <div class="shop_left">
    <div class="shop_logo">
      <div class="logo">
        <img :src="uesrinfo.avatar" alt="">
      </div>
      <div class="text">{{uesrinfo.mobile!=null?uesrinfo.mobile:''}}</div>
    </div>
    <div class="shop_info">
      <div class="yue">
        <span>{{uesrinfo.money}}</span>
        <span>余额</span>
      </div>
      <div style="width: 1px;height: 80px;background: #f5f5f5;"></div>
      <div class="jifen">
        <span>{{uesrinfo.score}}</span>
        <span>积分</span>
      </div>
    </div>
    <div class="shop_list">
      <ul>
        <li>订单中心</li>
        <li :class="{changeColor:tag==1}" @click="changeTag(1)">商场订单</li>
        <li :class="{changeColor:tag==2}" @click="changeTag(2)">团购订单</li>
        <li :class="{changeColor:tag==3}" @click="changeTag(3)">秒杀订单</li>
        <li :class="{changeColor:tag==4}" @click="changeTag(4)">积分商品订单</li>
      </ul>
      <ul>
        <li>邀请中心</li>
        <li :class="{changeColor:tag==5}" @click="changeTag(5)">邀请好友</li>
        <li :class="{changeColor:tag==6}" @click="changeTag(6)">返现豪礼</li>
      </ul>
      <ul>
        <li>账户中心</li>
        <li :class="{changeColor:tag==7}" @click="changeTag(7)">账户安全</li>
        <li :class="{changeColor:tag==8}" @click="changeTag(8)">地址管理</li>
        <li :class="{changeColor:tag==9}" @click="changeTag(9)">红包记录</li>
        <li :class="{changeColor:tag==10}" @click="changeTag(10)">消息</li>
      </ul>
      <ul>
        <li>活动中心</li>
        <li :class="{changeColor:tag==11}" @click="changeTag(11)">发起团购</li>
        <li :class="{changeColor:tag==12}" @click="changeTag(12)">参与团购</li>
      </ul>
      <ul>
        <li>会员服务</li>
        <li :class="{changeColor:tag==13}" @click="changeTag(13)">我的评论</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag: 1,
      token: "",
      uesrinfo: { mobile: "", money: "", score: "" }
    };
  },
  mounted() {
    this.load();
    this.tag = localStorage.getItem("tag")?localStorage.getItem("tag"):1;
  },
  methods: {
    changeTag(i){
      this.tag=i;
      localStorage.setItem("tag", i);
      if(i == 1){
        this.$router.push({name: 'index'});
      } else if(i == 2){
        this.$router.push({name: 'orderGroup'});
      } else if(i == 3){
        this.$router.push({name: 'orderSeckill'});
      } else if(i == 4){
        this.$router.push({name: 'orderIntegral'});
      } else if(i == 5){
        this.$router.push({name: 'inviteFriends'});
      } else if(i == 6){
        this.$router.push({name: 'returnCeremony'});
      } else if(i == 7){
        this.$router.push({name: 'accountSafety'});
      } else if(i == 8){
        this.$router.push({name: 'addressManage'});
      } else if(i == 9){
        this.$router.push({name: 'packetRecords'});
      } else if(i == 10){
        this.$router.push({name: 'myMessage'});
      } else if(i == 11){
        this.$router.push({name: 'startCompetition'});
      } else if(i == 12){
        this.$router.push({name: 'joinCompetition'});
      } else if(i == 13){
        this.$router.push({name: 'myComments'});
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
          this.token = res.data.token;
          this.getlist();
        });
    },
    getlist() {
      let data = {
        token: this.token
      };
      let self = this;
      self.$ajax
        .post(
          "/index.php/api/user/home_index?ajax=true",
          self.$qs.stringify(data),
          {}
        )
        .then(res => {
          self.uesrinfo = res.data.result;
          let Info = {
            reward: self.uesrinfo.reward,  //获得的奖励
            referrals: self.uesrinfo.referrals,  //推荐人数
            uid: self.uesrinfo.uid,  //用户id
            freezeMoney: self.uesrinfo.freezeMoney  //冻结资金
          }
          localStorage.setItem("Info",JSON.stringify(Info));
        });
    }
  }
};
</script>

<style lang="">
.shop_left {
  width: 200px;
  /* height: 800px; */
  float: left;
  box-sizing: border-box;
  overflow: hidden;
}
.shop_logo,
.shop_info {
  width: 100%;
  height: 100px;
  float: left;
}
.shop_logo,
.shop_info {
  width: 100%;
  height: 100px;
  float: left;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.shop_logo .logo {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  margin: 30px 0 0 20px;
  float: left;
}
.shop_logo .logo img{
  width: 100%;
  height: 100%;
}
.text {
  width: 108px;
  height: 58px;
  line-height: 59px;
  margin: 30px 0 0 10px;
  float: left;
}
.yue,
.jifen {
  width: 80px;
  height: 100px;
  padding: 10px;
  line-height: 30px;
  text-align: center;
  float: left;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.yue span:nth-child(1),
.jifen span:nth-child(1) {
  color: #74171b;
}
.shop_list {
  width: 100%;
  overflow: hidden;
  float: left;
}
.shop_list ul {
  margin: 10px;
  padding: 10px 30px;
  overflow: hidden;
}
.shop_list ul li {
  line-height: 30px;
  color: #666666;
  cursor: pointer;
}
.shop_list ul li:hover {
  color: #74171b;
}
.shop_list ul li:first-child:hover {
  color: #000;
}
.shop_list ul li:first-child {
  font-weight: bold;
  font-size: 16px;
  color: #000;
  cursor: default;
}
.shop_list ul .changeColor {
  color: #74171b;
}
</style>