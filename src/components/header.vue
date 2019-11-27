<template>
  <div class="head">
    <div class="head-t">
      <div class="top">
        <ul>
          <li>欢迎来到怀南会</li>
          <li>0519-86888690</li>
          <li>客服在线时间9:00-23:00</li>
        </ul>
        <ul>
          <li>翡翠和田玉彩宝文玩零售批发平台</li>
          <li>
            手机版怀南会
            <span>
              <i></i>会员中心
            </span>
          </li>
          <li>请登录/免费注册</li>
        </ul>
      </div>
    </div>
    <div class="head-c">
      <div id="logo">
        <p>怀南会</p>
        <span></span>
      </div>
      <div class="search">
        <form action="/search" name="search_form" method="get" id="search_form">
          <input type="text" name="keyword" autocomplete="off" placeholder="请输入您要搜索的关键词" />
          <div class="btn" rel="search_btn">
            <div>
              <span onclick>搜索</span>
            </div>
          </div>
        </form>
      </div>
      <div class="qrcode"></div>
    </div>
    <div class="nav">
      <ul>
        <li class="all" @mouseover="mouseOver()" @mouseleave="mouseLeave()">
          <i></i>
          <a herf>所有商品分类</a>
          <ul v-show="navShow">
            <li @mouseover="navList=1">
              <a href>翡翠</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>></span>
              <ul class="allList" v-if="navList == 1" @mouseleave="navList=0">
                <li>
                  <p>>&nbsp;&nbsp;翡翠</p>
                  <div>
                    <a href>吊坠吊牌</a>
                    <a href>手镯项链</a>
                    <a href>镶嵌翡翠</a>
                    <a href>把玩件</a>
                  </div>
                </li>
              </ul>
            </li>
            <li @mouseover="navList=2">
              <a href>和田玉</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>></span>
              <ul class="allList" v-if="navList == 2" @mouseleave="navList=0">
                <li>
                  <p>>&nbsp;&nbsp;和田玉</p>
                  <div>
                    <a href>手镯</a>
                    <a href>吊坠吊牌</a>
                    <a href>籽料碧玉</a>
                    <a href>镶嵌玉</a>
                  </div>
                </li>
              </ul>
            </li>
            <li @mouseover="navList=3">
              <a href="#">文玩收藏</a>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>></span>
              <ul class="allList" v-if="navList == 3" @mouseleave="navList=0">
                <li>
                  <p>>&nbsp;&nbsp;文玩收藏</p>
                  <div>
                    <a href>菩提子</a>
                    <a href>紫檀</a>
                    <a href>黄花梨</a>
                    <a href>金丝楠木</a>
                    <a href>沉香</a>
                    <a href>其他木质</a>
                  </div>
                </li>
              </ul>
            </li>
            <li @mouseover="navList=4">
              <a href="#">玉石陶瓷</a>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>></span>
              <ul class="allList" v-if="navList == 4" @mouseleave="navList=0">
                <li>
                  <p>>&nbsp;&nbsp;玉石陶瓷</p>
                  <div>
                    <a href>绿松石</a>
                    <a href>岫玉</a>
                    <a href>杜珊奇</a>
                    <a href>瓷器</a>
                  </div>
                </li>
              </ul>
            </li>
            <li @mouseover="navList=5">
              <a href="#">文房篆刻</a>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>></span>
              <ul class="allList" v-if="navList == 5" @mouseleave="navList=0">
                <li>
                  <p>>&nbsp;&nbsp;文房篆刻</p>
                  <div>
                    <a href>文房四宝</a>
                    <a href>印章篆刻</a>
                  </div>
                </li>
              </ul>
            </li>
            <li @mouseover="navList=6">
              <a href="#">天然宝石</a>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>></span>
              <ul class="allList" v-if="navList == 6" @mouseleave="navList=0">
                <li>
                  <p>>&nbsp;&nbsp;天然宝石</p>
                  <div>
                    <a href>南红</a>
                    <a href>琥珀蜜蜡</a>
                    <a href>珊瑚</a>
                    <a href>天珠碧玺</a>
                  </div>
                </li>
              </ul>
            </li>
            <li @mouseover="navList=7">
              <a href="#">洋酒红酒</a>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>></span>
              <ul class="allList" v-if="navList == 7" @mouseleave="navList=0">
                <li>
                  <p>>&nbsp;&nbsp;洋酒红酒</p>
                  <div>
                    <a href>葡萄酒</a>
                    <a href>威士忌</a>
                    <a href>XO白兰地</a>
                  </div>
                </li>
              </ul>
            </li>
            <li @mouseover="navList=8">
              <a href="#">宝石收藏</a>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>></span>
              <ul class="allList" v-if="navList == 8" @mouseleave="navList=0">
                <li>
                  <p>>&nbsp;&nbsp;宝石收藏</p>
                  <div>
                    <a href>珍珠朱砂</a>
                    <a href>水晶</a>
                    <a href>黑曜石</a>
                    <a href>彩宝</a>
                  </div>
                </li>
              </ul>
            </li>
            <li @mouseover="navList=9">
              <a href="#">健康养生</a>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>></span>
              <ul class="allList" v-if="navList == 9" @mouseleave="navList=0">
                <li>
                  <p>>&nbsp;&nbsp;健康养生</p>
                  <div>
                    <a href>不锈钢磁石</a>
                    <a href>食品</a>
                    <a href>太钢磁石</a>
                  </div>
                </li>
              </ul>
            </li>
            <li @mouseover="navList=10">
              <a href="#">茶叶紫砂</a>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>></span>
              <ul class="allList" v-if="navList == 10" @mouseleave="navList=0">
                <li>
                  <p>>&nbsp;&nbsp;茶叶紫砂</p>
                  <div>
                    <a href>紫砂壶</a>
                    <a href>红茶绿茶</a>
                    <a href>普洱养生茶</a>
                    <a href>紫砂用品</a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li><a href="/">首页</a></li>
        <li>新人专享</li>
        <li>团购</li>
        <li>秒杀</li>
        <li>买家互动</li>
        <li>积分商城</li>
        <li>关于我们</li>
        <li>百科资讯</li>
        <li>商家入驻</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      navShow: false,
      navList: false
    };
  },
  mounted() {
    this.mouseOver();
    this.mouseLeave();
  },
  methods: {
    mouseOver() {
      this.navShow = true;
    },
    mouseLeave() {
      this.navShow = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.head {
  width: 100%;
  height: 179px;
  box-shadow: 0 1px 12px #888888;
  min-width: 1200px;
}
.head-t {
  width: 100%;
  height: 40px;
  background: rgb(245, 245, 245);
}
.top {
  height: 40px;
  width: 1200px;
  margin: 0 auto;
  background: rgb(245, 245, 245);
}
.top ul:nth-child(1) {
  float: left;
  margin: 12px 0;
}
.top ul li {
  float: left;
  padding: 0 8px;
  font-size: 11px;
  border-right: 1px #8d8d8d solid;
  color: #8d8d8d;
  height: 12px;
  line-height: 12px;
}
.top ul li:nth-child(1) {
  padding-left: 0;
}
.top ul li:last-child {
  padding-right: 0;
  border: 0;
}
.top ul:nth-child(2) {
  float: right;
  margin: 12px 0;
  font-size: 12px;
}
.top ul:nth-child(2) li:nth-child(2) span {
  margin-left: 15px;
  color: rgb(242, 208, 134);
}
.top ul:nth-child(2) li:nth-child(2) span i {
  display: inline-block;
  width: 14px;
  height: 10px;
  background: url(../../static/img/menber_icon_03.jpg) no-repeat;
  background-size: 100% 100%;
}

.head-c {
  width: 1200px;
  height: 99px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  position: relative;
}
.head-c .qrcode {
  position: absolute;
  top: 18px;
  right: 52px;
  width: 83px;
  height: 83px;
  background: blanchedalmond;
}
.head-c #logo {
  margin: 15px 0 0 50px;
  height: 64px;
  width: 198px;
  position: relative;
}
.head-c #logo p {
  position: absolute;
  top: -999px;
}
.head-c #logo span {
  width: 198px;
  height: 65px;
  float: left;
  position: absolute;
  background: url(../../static/img/logo_index.png) no-repeat;
  top: 0;
  left: 0;
  background-size: 100% 100%;
}
.head-c .search {
  width: 476px;
  height: 40px;
  margin-left: 136px;
  float: left;
  margin-top: 30px;
  border: 1px rgb(116, 24, 27) solid;
  box-sizing: border-box;
}
.head-c .search input {
  width: 394px;
  height: 37px;
  float: left;
  border: none;
  outline: none;
  padding: 0 12px;
  box-sizing: border-box;
  font-size: 12px;
  margin-top: 1px;
  margin-left: 1px;
}
.head-c .search .btn {
  width: 79px;
  height: 38px;
  background: rgb(116, 24, 27);
  float: right;
  line-height: 38px;
  text-align: center;
  color: white;
  font-size: 12px;
}
.all ul li span {
  float: right;
  margin-right: 30px;
  color: #000;
}
.all > ul > li:hover > span {
  color: rgb(116, 24, 27);
}
.all > ul > li:hover > a {
  color: rgb(116, 24, 27);
}
.nav {
  width: 1200px;
  margin: 0 auto;
  height: 40px;
}
.nav > ul {
  width: 100%;
  height: 100%;
  font-size: 16px;
}

.nav > ul > li {
  font-weight: 600;
  float: left;
  height: 40px;
  line-height: 40px;
  padding: 0 17px;
  cursor: pointer;
}
.nav > ul > li:hover {
  color: rgb(104, 29, 33);
}
.nav > ul > li:nth-child(1) {
  padding: 0;
  width: 200px;
  height: 40px;
  background: rgb(116, 24, 27);
  color: white;
  line-height: 40px;
  text-align: center;
}
.nav > ul > li:nth-child(1) > ul {
  padding: 0;
  width: 200px;
  height: auto;
  margin: 0 auto;
  box-sizing: border-box;
}
.nav > ul > li:nth-child(1) > ul > li {
  padding: 0;
  width: 200px;
  height: auto;
  font-size: 16px;
  text-align: center;
  background: white;
  margin: 0 auto;
  position: relative;
  color: #8d8d8d;
  border: 1px solid rgb(116, 24, 27);
  border-top: none;
  border-bottom: none;
  position: relative;
  z-index: 1000;
  position: relative;
  box-sizing: border-box;
  font-size: 16px;
}
.nav > ul > li:nth-child(1) > ul > li:last-child {
  border-bottom: 1px solid rgb(116, 24, 27);
}
.nav > ul > li:nth-child(1) > ul > a {
  text-decoration: none;
  color: rgb(116, 24, 27);
}

.nav > ul > li:nth-child(2) {
  margin-left: 34px;
}
.nav > ul > li:nth-child(1) > a {
  color: #fff;
}

.allList {
  width: 200px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 198px;
  background: #fff;
  border: 1px #74181b solid;
  box-sizing: border-box;
  padding: 10px 10px;
}
.allList p {
  text-align: left;
  color: #74181b;
  font-size: 16px;
  line-height: 25px;
  height: 25px;
}
.allList div {
  width: 100%;
  overflow: hidden;
}
.allList div a {
  float: left;
  padding-right: 10px;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
}
.allList div a:hover {
  color: #74181b;
}
</style>
