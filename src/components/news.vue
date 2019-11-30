<template>
  <div class="news">
    <div class="news_box">
      <div class="new_l">
        <div class="new_title">
          <p>媒体报道</p>
          <p>更多></p>
        </div>
        <div class="new_content">
          <div class="layui-carousel" id="test1" style="background:none">
            <div carousel-item style="background:none">
              <div style="background:none">
                <a href="/article_list.html">
                  <img src="../../static/img/feicui.jpg" class="news_img" />
                </a>
              </div>
              <div style="background:none">
                <a href="/article_list.html">
                  <img src="../../static/img/yushi.jpg" class="news_img" />
                </a>
              </div>
            </div>
          </div>
          <!-- <p></p>
          <p>
            <span>中华孝道园入选《民族品牌之路》特别节目</span>
            <span>"社会诚信，国之根本"。2019年7月6日。常州孝道文化产业股份有限公司总裁温宁力女士受央......</span>
          </p>
          <div class="new_bottom">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>-->
        </div>
      </div>
      <div class="new_r">
        <div class="new_title">
          <p>怀南会资讯</p>
          <p>更多></p>
        </div>
        <div class="new_content">
          <ul>
            <li>百科资讯</li>
            <li><a href="/article/2103.html">翡翠手镯圆条好还是扁条好？</a></li>
            <li>
              <a href="/article/2119.html">你的南红手串准备好过冬了吗？</a>
            </li>
            <li><a href="/article/2145.html">白兰地和威士忌的区别是什么</a></li>
            <li><a href="/article/2155.html">几种古钱币的鉴定方法</a></li>
            <li><a href="/article/2161.html">买蓝宝石必须注意的四个原则</a></li>
            <li><a href="/article/2163.html">南红珍品收藏热的原因分析</a></li>
          </ul>
          <ul>
            <li>珠宝知识</li>
            <li><a href="/article/2179.html">拨乱反正 涅槃重生</a></li>
            <li>
              <a href="/article/2180.html">互联网企业大佬看好区块链技术</a>
            </li>

            <li><a href="/article/2181.html">数字货币在大陆遭遇滑铁卢</a></li>

            <li>
              <a href="/article/2182.html"
                >资产通证化——新时代的弄潮儿呼之欲出</a
              >
            </li>
            <li><a href="/article/2183.html">资产通证化 一绝</a></li>
          </ul>
          <ul>
            <li>问答</li>
            <li><a href="/article/2100.html">顶级翡翠为何多素面？</a></li>
            <li><a href="/article/2101.html">翡翠手镯并没那么容易摔坏</a></li>
            <li><a href="/article/2102.html">帝王绿翡翠为何价值连城</a></li>
            <li><a href="/article/2104.html">玛瑙与翡翠有哪些区别</a></li>
            <li><a href="/article/2105.html">5个动作暴露出你是翡翠外行</a></li>
            <li><a href="/article/2106.html">翡翠文化与佛文化的渊源</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "news",
  data() {
    return {};
  },
  mounted() {
    layui.use("carousel", function() {
      var carousel = layui.carousel;
      carousel.render({
        elem: "#test1",
        width: "100%", //设置容器宽度
        height: "200px",
        arrow: "none", //不显示箭头
        anim: "fade" //切换动画方式
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.news {
  height: 393px;
  width: 100%;
  background: rgb(245, 245, 245);
  margin-bottom: 23px;
  overflow: hidden;
  box-sizing: border-box;
  min-width: 1200px;
}
.news .news_box {
  width: 1200px;
  margin: 42px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: rgb(245, 245, 245);
}
.news_box .new_l {
  width: 384px;
  height: 310px;
  background: white;
  padding: 7px 14px 0 14px;
  box-sizing: border-box;
}
.new_l .new_title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 44px;
  line-height: 44px;
  border-bottom: 1px #f5f5f5 solid;
  font-weight: 800;
}
.new_l .new_title p:nth-child(1) {
  color: rgb(116, 24, 27);
  font-size: 18px;
}
.new_l .new_title p:nth-child(2) {
  color: rgb(116, 24, 27);
  font-size: 12px;
}
.new_l .new_content {
  width: 100%;
  padding: 25px 0;
  height: 256px;
  box-sizing: border-box;
}
.new_l .new_content p:nth-child(1) {
  width: 180px;
  height: 136px;
  float: left;
  margin-right: 14px;
  background: burlywood;
}
.new_l .new_content p:nth-child(2) {
  width: 158px;
  height: 136px;
  float: left;
}
.new_l .new_content p:nth-child(2) span:nth-child(1) {
  font-size: 14px;
  color: rgb(19, 3, 3);
  display: inline-block;
  margin-bottom: 8px;
}
.new_l .new_content p:nth-child(2) span:nth-child(2) {
  font-size: 12px;
  color: #8d8d8d;
}
.new_l .new_bottom {
  width: 100%;
  height: 16px;
  float: left;
  text-align: center;
  margin-top: 42px;
}
.news_img {
  width: 100%;
  height: 100%;
}
#test1 .layui-carousel-ind ul {
  background: none;
}
#test1 .layui-carousel-ind ul:hover {
  background: none;
}
#test1 .layui-carousel-ind li {
  width: 16px;
  height: 16px;
  display: inline-block;
  background: #eaeaea;
  border-radius: 50%;
}
#test1 .layui-carousel-ind li.layui-this {
  background: rgb(116, 24, 25);
}
#test1 .layui-carousel-ind li:hover {
  background: rgb(116, 24, 25);
}
.new_r {
  width: 805px;
  height: 310px;
  background: white;
  padding: 7px 25px 0 25px;
  box-sizing: border-box;
}
.new_r .new_title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 44px;
  line-height: 44px;
  border-bottom: 1px #f5f5f5 solid;
  font-weight: 800;
}
.new_r .new_title p:nth-child(1) {
  color: rgb(116, 24, 25);
  font-size: 18px;
}
.new_r .new_title p:nth-child(2) {
  color: rgb(116, 24, 25);
  font-size: 12px;
}
.new_r .new_content {
  width: 100%;
  padding: 25px 0;
  height: 256px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.new_r .new_content ul {
  width: 220px;
}
.new_r .new_content ul li {
  width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  line-height: 27px;
}
.new_r .new_content ul li a {
  color: #8d8d8d;
}
.new_r .new_content ul li a:hover {
  color: rgb(116, 24, 27);
}
.new_r .new_content ul li:nth-child(1) {
  color: rgb(27, 5, 6);
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 7px;
}
.layui-carousel > [carousel-item]:before {
  display: none;
}
</style>
