<template>
  <div class="content_box">
    <div class="content">
      <div class="shop_right">
        <h1>修改验证码</h1>

        <div style="width:100%;">
          <div v-show="active == 1">
            <div class="success">
              <p></p>
            </div>
            <p class="sfs">为确认是您本人操作，请选择以下方式完成验证</p>
            <p class="mobile">
              <el-button type="primary" @click="nexts()"
                >使用&nbsp;&nbsp;手机短信验证码</el-button
              >
            </p>
          </div>
          <div v-show="show === 2">
            <div class="successs">
              <p></p>
            </div>

            <p class="sfs">登录密码修改成功</p>
            <p class="mobile">
              <el-button class="buttons" @click="logoff">请重新登录</el-button>
            </p>
          </div>

          <el-dialog
            center
            class="msg"
            title
            :visible.sync="dialogVisible"
            width="430px"
            :before-close="handleClose"
          >
            <img src="../../../static/img/phone.png" />
            <h3>使用手机短息验证码进行验证并重置密码</h3>
            <p>当前手机号码{{ uesrinfo.mobile }}</p>
            <div class="test_num">
              <input
                type="number"
                name="code"
                v-model="code"
                placeholder="请输入手机验证码"
              />
              <!-- <button @click='sendCode'>发送验证码</button> -->
              <button class="sendcode">
                <span class="word-time"></span>
                <a class="resend" @click="send()">获取验证码</a>
              </button>
            </div>
            <!-- <h3>设置新密码</h3> -->

            <div class="test_nums">
              <input name="code" v-model="inputf" placeholder="请输入新密码" />
              <input name="code" v-model="inputs" placeholder="请确认密码" />
              <!-- <button @click='sendCode'>发送验证码</button> -->
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button class="button" @click="confirms">提交</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      code: "",
      inputf: "",
      inputs: "",
      token: "",
      uesrinfo: "",
      show: 0,
      dialogVisible: false,
      dialogVisibles: false,
      active: 1, // 控制步骤条及填写条目的显示
      status: {
        step1: "finish",
        step2: "wait",
        step3: "wait"
      }
    };
  },
  mounted() {
    this.load();
    this.getlistf();
  },
  methods: {
    getlistf() {
      let data = {
        token: this.token
      };
      let self = this;
      self.$ajax
        .post(
          "/index.php/api/user/home_index?ajax=true",
          self.$qs.stringify(data),
          {}
        )
        .then(res => {
          self.uesrinfo = res.data.result;
          console.log(self.uesrinfo);
        });
    },
    load() {
      let data = {
        name: "guwei",
        password: this.$md5("123456")
      };
      console.log(data);
      let self = this;
      self.$ajax
        .post("/index.php/login/login?ajax=true", self.$qs.stringify(data), {})
        .then(res => {
          // self.list = res.datalist;
          console.log(res.data);
          self.token = res.data.token;

          // self.list
        });
    },
    logoff() {
      this.$router.push("/login");
    },
    confirms() {
      if (this.code === "") {
        this.$message({
          message: "手机验证码不能为空",
          type: "warning",
          center: true,
          offset: "300"
        });
        return;
      } else if (this.inputf == "" || this.inputf.length != 6) {
        this.$message({
          message: "请输入新密码，长度为六",
          type: "warning",
          center: true,
          offset: "300"
        });
        return;
      } else if (this.inputf != this.inputs) {
        this.$message({
          message: "两次密码输入不一致，请重新输入",
          type: "warning",
          center: true,
          offset: "300"
        });
        return;
      }

      let data = {
        token: this.token,
        password: this.$md5(this.inputf),
        captcha: this.code
      };
      console.log(data);
      let self = this;
      self.$ajax
        .post(
          "/index.php/user/password/alter_pwd",
          self.$qs.stringify(data),
          {}
        )
        .then(res => {
          this.dialogVisible = false;

          console.log(res);
          if (res.data.code === 1) {
            this.$message({
              message: "密码设置成功",
              type: "success",
              center: true,
              offset: "300"
            });
          }
        });
    },

    sendcode() {
      let data = {
        token: this.token
      };
      let self = this;
      self.$ajax
        .post(
          "/index.php/user/password/send_captcha?ajax=true",
          self.$qs.stringify(data),
          {}
        )
        .then(res => {});
    },
    send() {
      this.sendcode();
      var countdown = 60;
      function sendemail() {
        var obj = $(".sendcode");
        settime(obj);
        console.log("1");
      }
      function settime(obj) {
        //发送验证码倒计时

        if (countdown == 0) {
          obj.attr("disabled", false); //obj.removeattr("disabled");
          obj.text(" 重新发送 ");
          obj.css("border-color", "#00a2ff");
          obj.css("color", "#00a2ff");
          $(".resend").text("    重新发送");
          countdown = 60;
          return;
        } else {
          obj.attr("disabled", true);
          obj.css("border-color", "#bcbcbc");
          obj.css("color", "#bcbcbc");
          obj.text("重新发送    (" + countdown + ")");
          $(".resend").text("");

          countdown--;
        }
        setTimeout(function() {
          settime(obj);
        }, 1000);
      }
      sendemail();
      $(".next-btn").prop("disabled", true); //禁用
    },

    handleClose(done) {
      done();
    },
    nexts() {
      this.dialogVisible = true;
    },
    id() {}
  }
};
</script>

<style scoped>
.buttons {
  background: rgb(116, 24, 27);
  width: 20%;
  color: #fff;
}
.button {
  background: rgb(116, 24, 27);
  width: 100%;
  color: #fff;
}
.test_num input {
  border: 1px solid rgb(211, 193, 193);
  float: left;
  outline: none;
  width: 270px;
  height: 48px;
  line-height: 48px;
  font-size: 15px;
  padding: 0 18px;
  box-sizing: border-box;
}
.test_num button {
  width: 108px;
  height: 48px;
  font-size: 15px;
  text-align: center;
  line-height: 48px;
  background: #e9e9e9;
  color: rgb(123, 123, 123);
}
.test_nums input {
  display: block;
  border: 1px solid rgb(211, 193, 193);
  outline: none;
  width: 100%;
  height: 48px;
  line-height: 48px;
  font-size: 15px;
  padding: 0 18px;
  box-sizing: border-box;
  margin-top: 20px;
}
.el-button--primary {
  background-color: #74171b;
  border-color: #74171b;
}
.test_nums button {
  width: 108px;
  height: 48px;
  font-size: 15px;
  text-align: center;
  line-height: 48px;
  background: #e9e9e9;
  color: rgb(123, 123, 123);
}
.msg {
  position: relative;
  top: -550px;
}
.msgs {
  position: relative;
  top: -260px;
}
.msg img {
  position: absolute;
  top: 8%;
  left: 45%;
}
.msg h3 {
  text-align: center;
  margin-top: 12%;
}
.msg p {
  text-align: left;
  margin: 8% 0 4% 2%;
}
.mobile {
  margin: 30px auto;
  text-align: center;
}
.next {
  width: 12%;
  margin: 10px 0px 0px 100px;
}
.sfs {
  text-align: center;
}
.content .success {
  height: 82px;
  padding-left: 445px;
  box-sizing: border-box;
  margin: 130px 0px 65px 0px;
}
.content .successs {
  height: 92px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
}
.content .success p:nth-child(1) {
  width: 92px;
  height: 102px;
  background: url(../../../static/img/safety.png) no-repeat;
  background-size: 100% 100%;
  line-height: 82px;
  text-align: center;
  margin-right: 28px;
  color: white;
}
.content .success p:nth-child(2) {
  font-size: 35px;
  line-height: 82px;
  text-align: center;
}
.content .successs p:nth-child(1) {
  width: 92px;
  height: 92px;
  background: url(../../../static/img/success.png) no-repeat;
  background-size: 100% 100%;
  line-height: 82px;
  text-align: center;
  color: white;
}
.content .successs p:nth-child(2) {
  font-size: 35px;
  line-height: 82px;
  text-align: center;
}
.steps {
  width: 100%;
  height: auto;
  margin-top: 4rem;
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
  width: 100%;
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
