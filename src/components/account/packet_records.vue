<template>
  <div class="content_box">
    <div class="content">
      <div class="shop_right">
        <h1>红包记录</h1>
        <div>
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td>金额</td>
              <td>有效期</td>
              <td>满多少可用</td>
              <td>是否使用</td>
            </tr>
            <tr v-for="(item, i) in list.list" :key="i">
              <td>{{ item.redPaper }}元</td>
              <td style="color: #74171b;">
               {{
                  item.endTimeDate
                }}
                {{
                  item.postTimeDate.slice(0, 10)
                }}&nbsp;&nbsp;至&nbsp;&nbsp;{{
                  item.endTimeDate.slice(0, 10)
                }}
              </td>
              <td>{{ item.minPrice }}元</td>
              <td>{{ item.statusName }}</td>
            </tr>
            <tr v-if="!list || list.length == 0">
              <td colspan="3">
                <img src="../../../static/img/redbag.png" />
                <br />暂无红包
              </td>
            </tr>
          </table>
          <div v-if="totalPage>1" class="pages">
            <p @click="Topage((--tag)==0?1:tag)">&lt;</p>
            <p v-for="i in totalPage" :key="i" :class="{changebg:tag==i}" @click="Topage(i)">{{i}}</p>
            <p @click="Topage((++tag)>=totalPage?totalPage:tag)">&gt;</p>
            <p @click="Topage(list.totalPage)">尾页</p>
          </div>
        </div>
        <div class="rule">
          <h5>红包使用规则</h5>
          <p>1.获得的红包将在实时发放至红包账户中，用户可在指定页面查看红包账户金额。</p>
          <p>
            2.用户获得的红包为电子现金券，仅限在怀南会电子商务平台(huainanhui.com)
            使用。
          </p>
          <p>3.红包长期有效，一经使用后失效。</p>
          <p>
            4.平台用户消费满百元即可使用红包，消费每百元可折抵10%，上不封顶，
            不满百元部分不参与抵免。
          </p>
          <p>5.红包仅限用户本人使用，不得转赠其他用户、不得提现、不得为其他用户付款时使用。</p>
          <p>6.用户获得多个红包的，红包金额可累计使用，不兑现，不找零。</p>
          <p>7.红包可与其他优惠同享。</p>
          <p>8.若使用红包的订单未支付，则取消订单后将退还红包至红包账户中。</p>
          <p>9.若使用红包的订单发生退款，则退款订单中的红包将不予退还。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tag: 1,
      token: "",
      list: "",
      redText: 1,
      tag: 1,
      totalPage: null,
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
    Topage(i) {
      this.tag = i;
      this.getlist(i);
    },
    getlist(page) {
      let data = {
        token: localStorage.getItem("token"),
        page: page ? page : 1,
        span: '10'
      };
      let self = this;
      self.$ajax
        .post(
          "/index.php/user/red_paper/get_list?ajax=true",
          self.$qs.stringify(data),
          {}
        )
        .then(res => {
          self.list = res.data;
          self.totalPage = res.data.totalPage;
        });
    }
  }
};
</script>

<style scoped>
.active {
  border-bottom: 2px solid #74171b;
  color: #74171b;
}
.pages {
  display: flex;
  flex-direction: row;
  justify-content: center;
        });
    }
  }
};
</script>

<style scoped>
.active {
  border-bottom: 2px solid #74171b;
  color: #74171b;
}
.pages {
  display: flex;
  flex-direction: row;
  justify-content: center;
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
.shop_right div table {
  width: 100%;
  border: 1px #e9e9e9 solid;
  margin-bottom: 20px;
}
.shop_right div table tr:nth-child(1) {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: normal;
  background: #f7f7f7;
  text-align: center;
  color: #000;
}
.shop_right div table tr td:last-child {
  width: 200px;
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
  height: 65px;
  text-align: center;
  color: #666;
  font-size: 16px;
}
.shop_right .rule h5 {
  font-weight: normal;
  margin-bottom: 20px;
  font-size: 15px;
}
.shop_right .rule p {
  font-size: 12px;
  color: #666;
  line-height: 18px;
  height: 18px;
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
</style>
