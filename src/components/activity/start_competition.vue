<template>
  <div class="content_box">
    <div class="content">
      <div class="shop_right">
        <h1>发起团购</h1>
        <div>
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td>团购名称</td>
              <td>需参加人数</td>
              <td>已参加人数</td>
              <td>状态</td>
              <td>操作</td>
            </tr>
            <tr v-for="(item,i) in list" :key="i">
              <td>{{item.title}}</td>
              <td>{{item.goodsNum}}</td>
              <td>{{item.joinNum}}</td>
              <td>{{item.joinNum!=item.goodsNum?'未成团':'已成团'}}</td>
              <td>{{item.joinNum!=item.goodsNum?'取消拼团':'待发货'}}</td>
            </tr>
            <tr v-if="!list||list.length==0" style="height:85px;">
              <td colspan="5">您还没有参加过任何团购活动！</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
    getlist() {
      let data = {
        page: "1",
        span: "10",
        token: this.c.getCookie(),
      };
      let self = this;
      this.$ajax
        .post(
          "/index.php/group/group_initiate?ajax=true",
          self.$qs.stringify(data),
          {}
        )
        .then(res => {
          self.list = res.data.list
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
.shop_right div {
  margin-bottom: 35px;
}
.shop_right div table {
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
