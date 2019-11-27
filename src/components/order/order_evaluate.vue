<template>
  <div class="content_box">
    <div class="content">
      <div class="info">
        <h5>商品信息</h5>
        <img src="../../../static/img/goods.jpg" alt />
        <p>S925纯银饰品时尚女士竹节和田玉吊坠</p>
      </div>
      <div class="box">
        <h5>其他买家，需要您的建议哦！</h5>
        <table border="1" cellspacing="0" cellpadding="0">
          <tr>
            <td>评价商品</td>
            <td>
              <textarea placeholder="请输入内容" v-model="Egoods"></textarea>
            </td>
          </tr>
          <tr>
            <td>评价服务</td>
            <td>
              <textarea placeholder="请输入内容" v-model="Eservice"></textarea>
            </td>
          </tr>
          <tr class="upImg">
            <td>晒图片</td>
            <td class="img_box">
              <div
                class="img_size"
                v-for="(item,index) of imgList"
                :key="index"
                v-show="imgList.length!=0"
                @mouseover="item.delimg=true"
              >
                <img v-if="item.file.type.indexOf('image') !== -1" :src="item.file.src" />
                <div
                  v-if="item.delimg"
                  @mouseout="item.delimg=false"
                  class="remove_logo"
                  @click="fileDel(index)"
                >
                  <span>×</span>
                </div>
              </div>
              <div class="add_img" @click="fileClick()" v-show="addState">
                <span>+</span>
              </div>
              <!-- <div @click="uploadImage">提交</div> -->
              <input
                id="inpu"
                name="files"
                style="display: none;"
                @change="fileChange($event)"
                type="file"
                ref="file"
                accept="image/jpg"
              />
            </td>
          </tr>
        </table>
        <div class="rate">
          <div>
            <span>*</span>
            <p>描述相符</p>
            <el-rate v-model="value1" :colors="['#74181b','#74181b','#74181b']"></el-rate>
          </div>
          <div>
            <span>*</span>
            <p>物流服务</p>
            <el-rate v-model="value2" :colors="['#74181b','#74181b','#74181b']"></el-rate>
          </div>
        </div>
        <button @click="submitEvaluate()">提交</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: null,
      moneyStatu: true,
      Egoods: "",
      Eservice: "",
      imgList: [],
      addState: true,
      delimg: false,
      value1: null,
      value2: null
    };
  },
  watch: {
    imgList() {
      if (this.imgList.length == 9) {
        this.addState = false;
      } else {
        this.addState = true;
      }
    }
  },
  mounted() {
    this.id = this.$route.query.id;
  },
  methods: {
    uploadImage() {
      
    },
    submitEvaluate() {
      this.imgList.map((item, i) => {
        let data = {
          token: localStorage.getItem("token"),
          userfile: item.file.src
        };
        let self = this;
        self.$ajax
          .post(
            "/index.php/user/user/upload_image/comment",
            self.$qs.stringify(data),
            {}
          )
          .then(res => {
            self.$message({
              message: res.data.message,
              showClose: true,
              type: "warning",
            })
            self.list = res.datalist;
            self.submit();
          });
      });
    },
    submit(){
      let data = {
        id: this.id,
        token: localStorage.getItem("token"),
        content: this.Egoods + this.Eservice,
        grade: this.value1
      };
      this.$ajax.post("/index.php/user/order/comment?ajax=true", this.$qs.stringify(data), {})
      .then(res => {
        // self.list = res.datalist;
        // console.log(res);
        this.$message({
          showClose: true,
          message: res.data.message,
          type: 'warning'
        });
      });
    },
    fileClick() {
      document.getElementById("inpu").click();
    },
    fileChange(el) {
      const list = this.$refs.file.files;
      if (!el.target.files[0].size) return;
      this.fileList(el.target);
      el.target.value = "";
    },
    fileList(fileList) {
      let files = fileList.files;
      for (let i = 0; i < files.length; i++) {
        //判断是否为文件夹
        if (files[i].type != "") {
          this.fileAdd(files[i]);
        } else {
          //文件夹处理
          this.folders(fileList.items[i]);
        }
      }
    },
    //文件夹处理
    folders(files) {
      let _this = this;
      //判断是否为原生file
      if (files.kind) {
        files = files.webkitGetAsEntry();
      }
      files.createReader().readEntries(function(file) {
        for (let i = 0; i < file.length; i++) {
          if (file[i].isFile) {
            _this.foldersAdd(file[i]);
          } else {
            _this.folders(file[i]);
          }
        }
      });
    },
    foldersAdd(entry) {
      let _this = this;
      entry.file(function(file) {
        _this.fileAdd(file);
      });
    },
    fileAdd(file) {
      //总大小
      this.size = this.size + file.size;
      let reader = new FileReader();
      reader.vue = this;
      reader.readAsDataURL(file);
      reader.onload = function() {
        file.src = this.result;
        if (this.vue.imgList.length < 3) {
          this.vue.imgList.push({
            file,
            delimg: false
          });
        } else {
          this.vue.$message({
            showClose: true,
            message: "最多只能上传3张图片哦！",
            type: "error"
          });
        }
      };
    },
    fileDel(index) {
      this.imgList.splice(index, 1);
    },
    bytesToSize(bytes) {
      if (bytes === 0) return "0 B";
      let k = 1000, // or 1024
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
    }
  }
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
.info {
  width: 1000px;
  box-sizing: border-box;
  margin: 20px auto;
  padding: 20px;
  background: #f5f5f5;
  overflow: hidden;
}
.info h5 {
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  font-weight: normal;
  padding: 0 10px;
  margin-bottom: 20px;
  border-bottom: 1px #ececec solid;
}
.info img {
  width: 100px;
  height: 100px;
  float: left;
  margin-right: 10px;
}
.info p {
  float: left;
  line-height: 100px;
  height: 100px;
  color: #666;
}
.rate {
  width: 300px;
  height: 70px;
  position: absolute;
  top: 120px;
  right: 60px;
}
.rate div {
  overflow: hidden;
}
.rate div p {
  float: left;
  font-size: 15px;
  color: #999;
  height: 30px;
  line-height: 30px;
  margin-right: 5px;
  margin-bottom: 10px;
}
.rate div span {
  float: left;
  color: red;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  margin-right: 10px;
}
.rate > div > div {
  float: left;
  height: 30px;
}
.box button {
  width: 120px;
  height: 40px;
  background: #74181b;
  color: #fff;
  text-align: center;
  margin-bottom: 30px;
  margin-left: 440px;
  border-radius: 5px;
}
/* 表格 */
.box {
  overflow: hidden;
  width: 1000px;
  margin: 0 auto;
  padding: 0 40px;
  background: #f5f5f5;
  position: relative;
  box-sizing: border-box;
}
.box h5 {
  font-size: 18px;
  margin-bottom: 30px;
  margin-top: 25px;
}
.box table {
  width: 520px;
  border-collapse: collapse;
  border-color: #e7e7e7;
  border: 1px #e7e7e7 solid;
  box-sizing: border-box;
  margin-bottom: 30px;
}
.box table tr {
  height: 120px;
}
.box table tr td:first-child {
  width: 65px;
  text-align: center;
  background: #efefef;
}
.box table tr td {
  background: #fff;
}
.box table textarea {
  outline: none;
  border: 0;
  width: 100%;
  height: 120px;
  resize: none;
  padding: 5px;
  box-sizing: border-box;
}
.upImg td:nth-child(2) {
  padding-left: 10px;
}
/* 上传图片 */
.img_size {
  position: relative;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  margin-right: 10px;
  float: left;
}
.img_size img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.remove_logo {
  position: absolute;
  width: 100px;
  height: 100px;
  opacity: 0.8;
  background: #777777;
  top: 0;
  right: 0;
  line-height: 20px;
  color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  float: left;
}
.remove_logo span {
  display: block;
  font-size: 50px;
  width: 100px;
  line-height: 98px;
  text-align: center;
}
.add_img {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #777777;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
