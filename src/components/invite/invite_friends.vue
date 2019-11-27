<template>
  <div class="content_box">
    <div class="content">
      <div class="shop_right">
        <h1>我的邀请好友</h1>
        <div>
          <h5>邀请好友</h5>
          <p>这是您的专用邀请链接，请通过微信或QQ发送给好友：</p>
          <div>
            <input type="text" v-model="https" />
            <button @click="copy()">复制</button>
          </div>
        </div>
        <div>
          <h5>我的邀请信息</h5>
          <p>
            <span>累计邀请返现</span>
            <span>
              ¥
              <i>{{data.reward}}</i>
            </span>
          </p>
        </div>
        <div>
          <h5>我的邀请好友</h5>
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td>会员名称</td>
              <td>我从该会员获取的推广佣金</td>
              <td>订单数量</td>
            </tr>
            <tr v-for="(item,i) in list" :key="i">
              <td>{{item.userName}}</td>
              <td>{{item.profit}}</td>
              <td>{{item.orderNum}}</td>
            </tr>
            <tr v-if="!list||list.length==0" style="height:85px;">
              <td colspan="3">暂时没有下线会员</td>
            </tr>
          </table>
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
  data() {
    return {
      https: "",
      list: null,
      tag: 1,
      totalPage: null,
      data: null,
    };
  },
  created() {
    this.getlist();
    this.data = JSON.parse(localStorage.getItem("Info"));
    this.https = 'https://www.huainanhui.com/?presenter=' + this.data.uid;
  },
  methods: {
    copy(){
      this.$copyText(this.https).then(res => {
        this.$message({
          message: '复制成功',
          showClose: true,
          type: "success",
        });
      }).catch(err => {
        this.$message({
          message: '复制失败',
          showClose: true,
          type: "error",
        });
      })
    },
    Topage(i) {
      this.tag = i;
      this.getlist(i);
    },
    getlist(page) {
      let data = {
        token: localStorage.getItem("token"),
        page: page?page:1,
        span: '10'
      };
      let self = this;
      self.$ajax
        .post(
          "/index.php/api/user/recommend?ajax=true",
          self.$qs.stringify(data),
          {}
        )
        .then(res => {
          self.totalPage = res.data.totalPage;
          self.list = res.data.list;
          // console.log(res.data.list);
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
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
}
.shop_right {
  width: 100%;
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
.shop_right div h5 {
  font-weight: normal;
  font-size: 15px;
  margin-bottom: 10px;
}
.shop_right div:nth-of-type(1) p {
  font-size: 12px;
  margin-bottom: 20px;
}
.shop_right div:nth-of-type(1) input {
  width: 320px;
  height: 30px;
  border: 1px #ececec solid;
  padding: 0 12px;
  box-sizing: border-box;
}
.shop_right div:nth-of-type(1) button {
  width: 45px;
  height: 30px;
  color: #fff;
  background: #74171b;
}
.shop_right div:nth-of-type(2) p {
  width: 100%;
  background: #f6f6f6;
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  box-sizing: border-box;
}
.shop_right div:nth-of-type(2) p span:nth-child(2) {
  color: #de0812;
  font-size: 8px;
  margin-left: 8px;
}
.shop_right div:nth-of-type(2) p span:nth-child(2) i {
  font-size: 12px;
}
.shop_right div:nth-of-type(3) table {
  width: 100%;
  border: 1px #e9e9e9 solid;
}
.shop_right div:nth-of-type(3) table tr:nth-child(1) {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  font-weight: normal;
  background: #f7f7f7;
  text-align: center;
  color: #000;
}
.shop_right div:nth-of-type(3) table tr {
  height: 45px;
  text-align: center;
  color: #666;
}
.shop_list ul .changeColor {
  color: #74171b;
}
.pages {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 120px;
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
