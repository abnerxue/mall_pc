<template>
  <div class="content_box">
    <div class="content">
      <h1>豪礼提现</h1>
      <div class="show">
        <div>
          <img src="../../../static/img/pay_success.jpg" alt />
          <p>提交成功</p>
        </div>
        <div class="step">
          <p>
            <i class="stepY"></i>
            <span>已提交</span>
          </p>
          <p></p>
          <p>
            <i class="stepY"></i>
            <span>待审核</span>
          </p>
          <p></p>
          <p>
            <i :class="moneyStatu?'stepM':'stepN'"></i>
            <span :style="moneyStatu?'color: #c9c9c9':''">提现到账</span>
          </p>
        </div>
      </div>
      <div class="cashDetail" v-if="true">
        <p>
          <span>提现方式</span>
          <span>微信</span>
        </p>
        <p>
          <span>提现金额</span>
          <span>1元</span>
        </p>
        <p>
          <span>预计到账</span>
          <span>2019-11-05&nbsp;&nbsp;19:12</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      moneyStatu: true
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.content_box {
  position: absolute;
  top: 180px;
  left: 0;
  width: 100%;
  min-height: 900px;
  min-width: 1200px;
  background: #fff;
  padding-bottom: 120px;
  margin-top: 15px;
  box-sizing: border-box;
  background: #fff;
}
.content {
  min-height: 600px;
  width: 1200px;
  height: 100%;
  margin: 0 auto;
}
.content > h1 {
  margin-top: 35px;
  padding: 0 40px;
  font-size: 20px;
  font-weight: normal;
}
.content .show {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.show > div:nth-child(1) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 75px;
  margin-top: 65px;
}
.show > div:nth-child(1) img {
  width: 80px;
  height: 80px;
  display: block;
  margin-bottom: 32px;
}
.show > div:nth-child(1) p {
  font-size: 34px;
  height: 34px;
  line-height: 34px;
}
.step {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 150px;
}
.step p {
  margin-right: 28px;
}
.step p:nth-child(2n) {
  width: 112px;
  height: 3px;
  background: #e9e9e9;
}
.step p:last-of-type {
  margin-right: 0;
}
.step p .stepY {
  background: url(../../../static/img/stepY.jpg) no-repeat;
  background-size: 100% 100%;
  width: 50px;
  height: 50px;
  margin-right: 12px;
  float: left;
}
.step p .stepN {
  background: url(../../../static/img/moneyY.jpg) no-repeat;
  background-size: 100% 100%;
  width: 50px;
  height: 50px;
  float: left;
  margin-right: 12px;
}
.step p .stepM {
  background: url(../../../static/img/moneyN.jpg) no-repeat;
  background-size: 100% 100%;
  width: 50px;
  height: 50px;
  float: left;
  margin-right: 12px;
}
.step p span {
  font-size: 22px;
  height: 50px;
  line-height: 50px;
}
.cashDetail {
  font-size: 16px;
  padding: 0 50px;
}
.cashDetail p {
  margin-bottom: 20px;
  height: 16px;
  line-height: 16px;
}
.cashDetail p span:nth-child(1) {
  margin-right: 30px;
}
.cashDetail p:last-of-type span:last-of-type {
  color: #666;
}
</style>
