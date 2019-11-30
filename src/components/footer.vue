<template>
  <div class="footer">
    <div class="foot-t">
      <ul>
        <li>
          <i><img src="../../static/img/source.png" alt=""></i>
          <p>
            <span>源头直供</span>
            <span>无中间商 确保低价</span>
          </p>
        </li>
        <li>
          <i><img src="../../static/img/quality.png" alt=""></i>
          <p>
            <span>品质保障</span>
            <span>品质护航 购物无忧</span>
          </p>
        </li>
        <li>
          <i><img src="../../static/img/replacement.png" alt=""></i>
          <p>
            <span>七天无理由退换</span>
            <span>为您提供售后无忧保障</span>
          </p>
        </li>
        <li>
          <i><img src="../../static/img/delivery.png" alt=""></i>
          <p>
            <span>保价配送</span>
            <span>支持退换 安全便捷</span>
          </p>
        </li>
        <li>
          <i><img src="../../static/img/supervise.png" alt=""></i>
          <p>
            <span>质检监督</span>
            <span>正品保障 支持复检</span>
          </p>
        </li>
        <li>
          <i><img src="../../static/img/shot.png" alt=""></i>
          <p>
            <span>实物拍摄</span>
            <span>相机拍摄 真实还原</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="foot-b">
      <ul>
        <li><a href="/about_us.html">关于我们</a></li>
        <li>><a href="/about_us/2090.html">发展沿革</a></li>
        <li>><a href="/about_us/2091.html">组织架构图</a></li>
        <li>><a href="/about_us/2092.html">发展愿景</a></li>
        <li>><a href="/about_us/2108.html">集团介绍</a></li>
      </ul>
      <span></span>
      <ul>
        <li><a href="/help_list/66.html">帮助中心</a></li>
        <li>><a href="/help/2174.html">购买翡翠常遇问题</a></li>
        <li>><a href="/help/2175.html">无忧退货</a></li>
        <li>><a href="/help/2176.html">怀南会承诺</a></li>
        <li>><a href="/help/2177.html">发票说明</a></li>
      </ul>
      <span></span>
      <ul>
        <li><a href="/article_list/70.html">媒体报道</a></li>
        <li>支付宝</li>
        <li>微信支付</li>
        <li>银行卡汇款/转账</li>
      </ul>
      <!-- <span></span>
      <ul class="qr_phone">
        <li>
          <i></i>
          <span>
            <i></i>iPhone
          </span>
        </li>
        <li>
          <i></i>
          <span>
            <i></i>Android
          </span>
        </li>
      </ul> -->
    </div>
    <div class="foot">
      <p>电话：0519-86888690&nbsp;周一到周六&nbsp;09:00-22:00&nbsp;&nbsp;苏ICP备19046182号-1</p>
      <p>版权所有©2016-2019&nbsp;常州怀南汇商务服务有限公司</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  width: 100%;
  height: 438px;
  overflow: hidden;
  min-width: 1200px;
}
.foot-t {
  width: 100%;
  height: 100px;
  background: rgb(245, 245, 245);
}
.foot-t ul {
  width: 1200px;
  height: 100px;
  background: rgb(245, 245, 245);
  margin: 0 auto;
  padding-top: 30px;
  box-sizing: border-box;
}
.foot-t ul li {
  float: left;
  height: 40px;
  margin-right: 42px;
}
.foot-t ul li:last-child {
  margin: 0;
}
.foot-t ul li i {
  float: left;
  width: 40px;
  height: 40px;
  margin-right: 9px;
}
.foot-t ul li p {
  float: right;
  width: auto;
  height: 40px;
  display: flex;
  flex-direction: column;
}
.foot-t ul li p span:nth-child(1) {
  font-size: 15px;
  color: rgb(116, 24, 27);
  font-weight: 800;
}
.foot-t ul li p span:nth-child(2) {
  font-size: 12px;
  color: #8d8d8d;
}
.foot-b {
  width: 1070px;
  height: 195px;
  margin: 0 auto;
  border-bottom: 1px rgb(245, 245, 245) solid;
  box-sizing: border-box;
  padding: 30px 36px;
  padding-bottom: 0;
}
.foot-b ul {
  float: left;
  padding: 0 71px;
  font-size: 10px;
  margin-top: 14px;
}
.foot-b ul:nth-child(1) {
  float: left;
  padding-left: 0;
}
.foot-b .qr_phone {
  float: left;
  padding-right: 0;
  padding-left: 70px;
  margin: 0;
}
.foot-b ul li {
  margin-bottom: 5px;
  font-size: 12px;
  color: #8d8d8d;
}
.foot-b ul li:first-child a{
  font-size: 15px;
  color: rgb(116, 24, 27);
  margin-bottom: 10px;
}
.foot-b ul li:hover a{
  color:rgb(116, 24, 27);
}
.foot-b ul li:last-child a{
  margin: 0;
}
.foot-b > span {
  width: 1px;
  height: 86px;
  content: "";
  border-right: 1px rgb(201, 201, 201) solid;
  float: left;
  margin-top: 17px;
}
.foot-b .qr_phone li {
  float: left;
  margin-right: 47px;
  text-align: center;
}
.foot-b .qr_phone li:last-child {
  margin: 0;
}
.foot-b .qr_phone li > i {
  width: 123px;
  height: 123px;
  display: block;
  background: burlywood;
}
.foot-b .qr_phone li span {
  color: rgb(201, 201, 201);
  font-size: 10px;
  display: block;
  line-height: 18px;
}
.foot-b .qr_phone li span i {
  display: inline-block;
  width: 16px;
  height: 18px;
  background: url(../../static/img/iphone.jpg) no-repeat;
  background-size: 100% 100%;
  margin-top: 1px;
}
.foot-b .qr_phone li:nth-child(2) span i {
  background: url(../../static/img/android.jpg) no-repeat;
}
.foot-b .qr {
  width: 126px;
  height: 126px;
  background: blanchedalmond;
  float: left;
}
.foot {
  width: 100%;
  height: 100px;
  text-align: center;
  color: #8d8d8d;
  font-size: 11px;
  margin-top: 43px;
  box-sizing: border-box;
}
</style>
