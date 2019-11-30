<template>
  <div class="content_box">
    <div class="content">
      <div class="shop_right">
        <h1>我的评论</h1>
        <div>
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td>评论截图</td>
              <td>评价分数</td>
              <td>评价内容</td>
              <td>评价时间</td>
              <td>评价人</td>
            </tr>
            <tr v-for="(item,i) in commentsList" :key="i">
              <td>
                <img v-for="(val,k) in item.images" :key="k" :src="val" />
              </td>
              <td>
                <el-rate
                  :value="Number(item.grade)"
                  disabled
                  :colors="['#74181b','#74181b','#74181b']"
                ></el-rate>
              </td>
              <td>{{item.content}}</td>
              <td>{{item.postTimeDate}}</td>
              <td>{{item.mobile}}</td>
            </tr>
            <tr v-if="!commentsList||commentsList.length==0">
              <td colspan="5">暂时没有评论</td>
            </tr>
          </table>
        </div>
        <div v-if="totalPage>1" class="pages">
          <p @click="Topage((--tag)==0?1:tag)">&lt;</p>
          <p v-for="i in totalPage" :key="i" :class="{changebg:tag==i}" @click="Topage(i)">{{i}}</p>
          <p @click="Topage((++tag)>=totalPage?totalPage:tag)">&gt;</p>
          <p @click="Topage(totalPage)">尾页</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      commentsList: null,
      data: null,
      tag: 1,
      value1: 1,
      grade: [],
      totalPage: null
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
        token: this.c.getCookie(),
        span: "10",
        page: page?page:1
      };
      let self = this;
      self.$ajax
        .post(
          "/index.php/comment/my_comment?ajax=true",
          self.$qs.stringify(data),
          {}
        )
        .then(res => {
          // self.list = res.datalist;
          console.log(res);
          self.data = res.data;
          self.totalPage = res.data.totalPage;
          self.commentsList = self.data.list;
          self.commentsList.map((val, i) => {
            self.grade.push(val.grade);
          });
          // console.log(res.data);
          // self.list
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
.shop_right div table tr td:nth-child(1) > img:nth-child(1) {
  margin-left: 16px;
}
.shop_right div table tr td:nth-child(1) > img {
  width: 46px;
  height: 46px;
  border: 1px #ececec solid;
  display: block;
  margin-right: 5px;
  float: left;
}
.shop_right div table tr td:last-child {
  color: #74171b;
}
.shop_right div table tr {
  height: 85px;
  text-align: center;
  color: #666;
  width: 100%;
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
