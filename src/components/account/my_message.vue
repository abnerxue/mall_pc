<template>
  <div class="content_box">
    <div class="content">
      <div class="shop_right">
        <h1>我的消息</h1>
        <div class="noInfo">暂无信息</div>
        <!-- <div class="message">
          <div>
            <img src="../../../static/img/goods.jpg" alt />
            <div>
              <p>拼单成功通知</p>
              <p>恭喜您与1*******7、1********8拼单成功。</p>
              <p>2019-10-26&nbsp;&nbsp;12:20</p>
            </div>
            <button
              @click="$router.push({ name: 'orderDetail', query: { id: 1 } })"
            >
              查看拼单详情
            </button>
          </div>
          <div v-if="list.totalPage > 1" class="pages">
            <p>&lt;</p>
            <p
              v-for="i in list.totalPage"
              :key="i"
              :class="{ changebg: tag == i }"
              @click="Topage(i)"
            >
              1
            </p>
            <p>&gt;</p>
            <p>尾页</p>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: "",
      token: null
    };
  },
  created() {},
  mounted() {
    // this.getlist();
  },
  methods: {
   
    Topage(i) {
      let data = {
        token: this.c.getCookie(),
        page: i
      };
      let self = this;
      self.$ajax
        .post(
          "/index.php/api/news/get_list?ajax=true",
          self.$qs.stringify(data),
          {}
        )
        .then(res => {
          self.list = res.data;
          console.log(res);
          // console.log(res.data);
          // self.list
        });
    },
    getlist() {
      let data = {
        token: this.c.getCookie(),
      };
      let self = this;
      self.$ajax
        .post(
          "/index.php/api/news/get_list?ajax=true",
          self.$qs.stringify(data),
          {}
        )
        .then(res => {
          self.list = res.data;
          console.log(res);
          // console.log(res.data);
          // self.list
        });
    }
  }
};
</script>

<style scoped>
.noInfo {
  font-size: 20px;
  margin: 60px;
  text-align: center;
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
.message {
  padding-left: 20px;
}
.message > div {
  height: 132px;
  margin-bottom: 16px;
  background: #f6f6f6;
  padding: 16px 80px 16px 24px;
  box-sizing: border-box;
  color: #666666;
}
.message div img {
  height: 100px;
  width: 100px;
  border: 1px #edecea solid;
  box-sizing: border-box;
  float: left;
}
.message > div > div {
  margin-left: 38px;
  float: left;
  padding-top: 5px;
  box-sizing: border-box;
  height: 100px;
}
.message > div > div p:nth-child(1) {
  font-size: 18px;
  line-height: 18px;
  height: 18px;
  margin-bottom: 20px;
}
.message > div > div p:nth-child(2) {
  font-size: 12px;
  height: 12px;
  line-height: 12px;
  margin-bottom: 32px;
}
.message > div > div p:nth-child(3) {
  font-size: 8px;
}
.message div > button {
  width: 185px;
  height: 50px;
  font-size: 20px;
  color: #74171b;
  border: 1px #74171b solid;
  background: #f6f6f6;
  float: right;
  margin-top: 25px;
}
.message div > button:hover {
  background: #74171b;
  color: #fff;
}
.shop_list ul .changeColor {
  color: #74171b;
}
</style>
