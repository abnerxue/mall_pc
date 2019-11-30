<template>
  <div class="content_box">
    <div class="content">
      <div class="shop_right">
        <h1>配送地址</h1>
        <div class="increased">
          <el-button class="button" @click="inscreased">新增地址</el-button>
          <p>您已创建{{ list.length }}个收货地址，最多创建20个</p>
        </div>
        <table cellspacing="0">
          <tr>
            <th>收货人</th>
            <th>所在地区</th>
            <th>详细地址</th>
            <th>手机</th>
            <th>操作</th>
          </tr>

          <tr v-for="(item, k) in list" :key="k">
            <td>{{ item.name }}</td>
            <td>{{ item.province + item.city + item.county }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.phone }}</td>
            <td>
              <span @click="changepp(item)">修改</span>&nbsp;|&nbsp;
              <span v-if="item.default === '1'">
                <span @click="defaulta(item.id)" style="color:red"
                  >默认地址</span
                >
              </span>
              <span v-else>
                <span @click="defaulta(item.id)">设为默认</span>
              </span>
              &nbsp;|&nbsp;
              <span @click="dela(item.id)">删除</span>
            </td>
          </tr>
        </table>

        <!-- 删除弹框 -->
        <el-dialog
          title="确认要删除么"
          :visible.sync="dialogVisiblef"
          width="250px"
          :before-close="handleClose"
        >
          <div style="text-align:center;">
            <el-button @click="dialogVisiblef = false">取 消</el-button>
            <el-button type="primary" @click="del()">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog
          left
          class="msg"
          :title="title"
          :visible.sync="dialogVisible"
          width="500px"
          :before-close="handleClose"
        >
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item
              label="所属省份"
              :label-width="formLabelWidth"
              prop="province_act"
            >
              <el-select
                @change="provinceChange"
                v-model="form.province_act"
                placeholder="请选择省份"
                value-key="code"
              >
                <el-option
                  v-for="item in provinces"
                  :key="item.code"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="所属城市"
              :label-width="formLabelWidth"
              prop="city_act"
            >
              <el-select
                v-model="form.city_act"
                value-key="code"
                placeholder="请选择城市"
                @change="citysChange"
              >
                <el-option
                  v-for="item in citys"
                  :key="item.code"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="区/县"
              :label-width="formLabelWidth"
              prop="county_act"
            >
              <el-select
                v-model="form.county_act"
                value-key="code"
                placeholder="请选择区/县"
                @change="countysChange"
              >
                <el-option
                  v-for="item in countys"
                  :key="item.code"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="详细地址"
              :label-width="formLabelWidth"
              prop="add"
            >
              <el-input v-model="form.add" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="收货人姓名"
              :label-width="formLabelWidth"
              prop="name"
            >
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="手机号码"
              :label-width="formLabelWidth"
              prop="tel"
            >
              <el-input v-model="form.tel" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div class="sss">
            <el-button class="buttonf" @click="confirm">确定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import addressData_ from "../../../base/addressdata.js";
import { getProvince, getCity, getCounty } from "../../../base/address.js"; //
export default {
  data() {
    return {
      deleteid: "",
      detailid: "",
      token: "",
      provinces: null,
      addressData_: addressData_,
      listc: [],
      list: [],
      title: "添加收货地址",
      citys: 1,
      countys: "",
      sign: null,
      cascader_val: [], // 级联选中值
      dialogVisible: false,
      dialogVisiblef: false,
      dialogVisiblefc: false,
      dialogFormVisible: false,
      form: {
        tel: "",
        province_act: {
          code: "",
          name: ""
        }, // 当前省
        city_act: {
          code: "",
          name: ""
        }, // 当前省
        county_act: {
          code: "",
          name: ""
        }, // 当前省
        name: "",
        add: ""
      },
      formLabelWidth: "120px",
      dialogVisibles: false,
      rules: {
        county_act: [
          { required: true, message: "请选择所在区县", trigger: "blur" }
        ],
        city_act: [
          {
            required: true,
            message: "",
            message: "请选择所在市",
            trigger: "blur"
          }
        ],
        province_act: [
          { required: true, message: "请选择所在省", trigger: "blur" }
        ],
        tel: [
          {
            required: true,
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的电话号码",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            min: 10,
            max: 11,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        add: [{ required: true, message: "请输入详细地址", trigger: "blur" }]
      }
    };
  },

  watch: {
    address(val) {
      this.analysisDefaultAddress();
    }
  },
  computed: {
    selfType() {
      return this.type === "default";
    }
  },
  created() {
    this.provinces = getProvince();
    this.analysisDefaultAddress();
    this.getlist();
  },
  methods: {
    // 级联选择动态获取下级
    handleItemChange(val) {
      let [p_code, c_code] = val;
      if (c_code) {
        let act_city = this.citys.find(item => item.code === c_code);
        if (act_city.children.length > 0) return;
        this.countys = getCounty(act_city);
        act_city.children = this.countys;
      } else {
        let act_province = this.provinces.find(item => item.code === p_code);
        if (act_province.children.length > 0) return;
        this.citys = getCity(act_province, true);
        act_province.children = this.citys;
      }
    },
    // 选择完毕数据组装
    getCascaderVal(val) {
      let [pro, cit, con] = val;
      this.province_act = this.provinces.find(item => item.code === pro);
      if (con) {
        this.city_act = this.province_act.children.find(
          item => item.code === cit
        );
        this.county_act = this.city_act.children.find(
          item => item.code === con
        );
      } else {
        this.city_act = this.province_act;
        this.county_act = this.city_act.children.find(
          item => item.code === cit
        );
      }

      let { code: pro_code, name: pro_name } = this.province_act;
      let { code: cit_code, name: cit_name } = this.city_act;
      let { code: cou_code, name: cou_name } = this.county_act;
      let string_address = JSON.stringify([
        { code: pro_code, name: pro_name },
        { code: cit_code, name: cit_name },
        { code: cou_code, name: cou_name }
      ]);
      this.$emit("update:address", string_address);
    },
    // 省份更改
    provinceChange(val) {
      this.city_act = {
        code: "",
        name: ""
      };
      this.county_act = {
        code: "",
        name: ""
      };
      this.countys = [];
      this.citys = getCity(val);
    },
    // 城市更改
    citysChange(val) {
      this.county_act = {
        code: "",
        name: ""
      };
      this.countys = getCounty(val);
    },
    // 县更改
    countysChange(val) {
      let string_address = JSON.stringify([
        this.province_act,
        this.city_act,
        this.county_act
      ]);
      this.$emit("update:address", string_address);
    },
    // 解析默认地址
    analysisDefaultAddress() {
      if (!this.address) return;
      let address = "";
      try {
        address = JSON.parse(this.address) || [];
      } catch (error) {
        console.log("地址信息不合规范:" + error);
      }
      let data_format = address instanceof Array;
      if (!data_format) return;
      if (this.type === "default") {
        [
          this.province_act = {},
          this.city_act = {},
          this.county_act = {}
        ] = address;

        if (this.province_act.code) {
          this.citys = getCity(this.province_act);
        }

        if (this.city_act.code) {
          this.countys = getCounty(this.city_act);
        }
      } else {
        let [pro, cit, con] = address;
        this.cascader_val =
          pro.code !== cit.code
            ? address.map(item => item.code)
            : [pro.code, con.code];
        this.cascaderData(this.cascader_val);
      }
    },
    // 处理默认地址时级联数据
    cascaderData(val) {
      let [p_code, c_code, n_code] = val;
      let act_province = this.provinces.find(item => item.code === p_code);
      this.citys = getCity(act_province, true);
      act_province.children = this.citys;
      if (n_code) {
        let act_city = this.citys.find(item => item.code === c_code);
        this.countys = getCounty(act_city);
        act_city.children = this.countys;
      }
    },
    dela(id) {
      this.dialogVisiblef = true;
      this.deleteid = id;
    },
    del() {
      this.dialogVisiblef = false;
      let data = {
        token: this.c.getCookie(),
        id: this.deleteid
      };
      let self = this;
      self.$ajax
        .post("/index.php/user/address/del ", self.$qs.stringify(data), {})
        .then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: "删除成功",
              type: "success",
              center: "true",
              offset: "300",
              duration: "800"
            });
          } else {
            this.$message({
              message: res.data.message,
              type: "warning",
              center: "true",
              offset: "300",
              duration: "800"
            });
          }
          this.getlist();
        });
    },
    defaulta(id) {
      let data = {
        token: this.c.getCookie(),
        id: id
      };
      let self = this;
      self.$ajax
        .post(
          "/index.php/user/address/set_default",
          self.$qs.stringify(data),
          {}
        )
        .then(res => {
          this.$message({
            message: "设置成功",
            type: "success",
            center: "true",
            offset: "300",
            duration: "800"
          });
          this.getlist();
        });
    },
    changepp(item) {
      this.sign = 2;
      this.title = "修改收货地址";
      this.dialogVisible = true;
      (this.form = {
        tel: item.phone,
        province_act: {
          code: item.provinceId,
          name: item.province
        }, // 当前省
        city_act: {
          code: item.cityId,
          name: item.city
        }, // 当前省
        county_act: {
          code: item.countyId,
          name: item.county
        }, // 当前省
        name: item.name,
        add: item.address
      }),
        (this.detailid = item.id);
    },
    handleClose() {
      this.dialogVisible = false;
      this.dialogVisiblefc = false;
      this.dialogVisibles = false;
      this.dialogVisiblef = false;
    },
    confirm() {
      this.dialogVisible = false;
      let this_ = this;
      let p_id = null;
      let c_id = null;
      let con_id = null;
      this.addressData_.provinceList.forEach((v, i) => {
        let flag = false;
        let temp_p = null;
        if (this_.form.province_act.name.indexOf("市") > -1) {
          temp_p = this_.form.province_act.name.split("市").join("");
          flag = true;
        } else {
          temp_p = this_.form.province_act.name;
        }
        if (v.name === temp_p) {
          p_id = v.id;
          this_.addressData_.cityList[v.id].forEach((vs, i) => {
            if (vs.name === this_.form.city_act.name) {
              c_id = vs.id;
              this_.addressData_.countyList[vs.id].forEach((vd, i) => {
                if (vd.name === this_.form.county_act.name) {
                  con_id = vd.id;
                }
              });
            }
          });
        }
      });
      let data = {
        token: this.c.getCookie(),
        name: this.form.name,
        phone: this.form.tel,
        /*  proviceId:p_id,
       cityId:c_id, */
        countyId: con_id,
        address: this.form.add,
        addressid: this.detailid
      };
      if(this.list.length < 20 || this.sign == 2){
        let self = this;
        self.$ajax
          .post(
            "/index.php/user/address/add_edit",
            self.$qs.stringify(data),
            {}
          )
          .then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: res.data.message,
                type: "success",
                center: "true",
                offset: "300",
                duration: "800"
              });
            } else if (res.data.code === 0) {
              this.$message({
                message: res.data.message,
                type: "warning",
                center: "true",
                offset: "300",
                duration: "800"
              });
            }
            this.getlist();
            // self.list
          });
      } else {
        this.$message({
          message: "添加地址已到达上限，请删除后再添加！",
          type: "warning",
          center: "true",
          offset: "300",
          showClose: true
        });
      }
    },
    getlist() {
      let data = {
        token:this.c.getCookie(),
      };
      let self = this;
      let list = [];
      self.$ajax
        .post(
          "/index.php/api/address/get_list?ajax=true",
          self.$qs.stringify(data),
          {}
        )
        .then(res => {
          self.list = res.data.list;
        });
    },
    inscreased() {
      this.dialogVisible = true;
      this.form = {
        tel: "",
        province_act: {
          code: "",
          name: ""
        }, // 当前省
        city_act: {
          code: "",
          name: ""
        }, // 当前省
        county_act: {
          code: "",
          name: ""
        }, // 当前省
        name: "",
        add: ""
      };
      this.sign = 1;
    }
  }
};
</script>

<style scoped>
.sss {
  text-align: center;
}
.shop_right table {
  text-align: center;
  margin-top: 0.5rem;
  width: 100%;
  border: 1px#ececec solid;
}
.shop_right table tr {
  width: 100%;
  height: 50px;
}
.shop_right table th {
  height: 4.8rem;
  background: rgb(228, 223, 223);
  font-size: 16px;
  color: #74171b;
}
.el-select {
  width: 100% !important;
}
.shop_right table td:last-of-type span {
  cursor: pointer;
}
.shop_right table td {
  height: 2.8rem;
  font-size: 14px;
  border-bottom: 1px#ececec solid;
  margin-top: 1px;
}
.shop_right table tr:last-child td {
  border: 0;
}
.shop_right table tr th:nth-child(1) {
  width: 10%;
}
.shop_right table tr th:nth-child(2) {
  width: 20%;
}
.shop_right table tr th:nth-child(3) {
  width: 20%;
}
.shop_right table tr th:nth-child(4) {
  width: 25%;
}
.shop_right table tr th:nth-child(5) {
  width: 15%;
}
.increased {
  display: flex;
  flex-direction: row;
}
.increased p {
  line-height: 40px;
  margin-left: 10px;
}

.button {
  background: rgb(116, 24, 27);
  width: 15%;
  color: #fff;
}
/* .el-button:hover{
  color: #74181b;
  border-color: rgb(255, 167, 170);
  background-color: rgb(255, 234, 235);
} */
.el-button--primary {
  background: rgb(116, 24, 27);
  border-color: #74181b;
}
.buttonf {
  background: rgb(116, 24, 27);
  color: #fff;
  margin: 0 auto;
  text-align: center;
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
  height: 1000px;
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
