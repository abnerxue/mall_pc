<template>
  <div class="content_box">
    <div class="content">
      <div class="shop_right">
        <h1>配送地址</h1>
        <div class="increased">
          <el-button class="button" @click="inscreased">新增地址</el-button>
          <p>您已创建一个收货地址，最多创建20个</p>
        </div>
        <table cellspacing="0">
          <tr>
            <th>收货人</th>
            <th>所在地区</th>
            <th>详细地址</th>
            <th>手机</th>
            <th>操作</th>
          </tr>
          <tr>
            <td>qqq</td>
            <td>qwedsda</td>
            <td>qwerefdf</td>
            <td>11888888888</td>
            <td>
              <span @click="changepp()">修改</span>&nbsp;&nbsp;|&nbsp;
              <span @click="defaulta" class='defaultadd'>默认地址</span>&nbsp;&nbsp;|&nbsp;
              <span @click="del">删除</span>
            </td>
          </tr>
          <tr v-for='(item,k) in list' :key='k'>
            <td>{{item.name}}</td>
            <td>{{item.province+item.city+item.county}}</td>
            <td>{{item.county}}</td>
            <td>{{item.phone}}</td>
            <td>
              <span @click="changepp(item.id)">修改</span>&nbsp;&nbsp;|&nbsp;
              <span @click="defaulta(item.id)" >默认地址</span>&nbsp;&nbsp;|&nbsp;
              <span @click="dela(item.id)">删除</span>
            </td>
          </tr>
        </table>
        
        <el-dialog
          title="确认要删除么"
          :visible.sync="dialogVisiblef"
          width="250px"
          :before-close="handleClose"
        >
          <div style="text-align:center;">
            <el-button @click="dialogVisiblef = false">取 消</el-button>
            <el-button type="primary" @click="del(item.id)">确 定</el-button>
          </div>
        </el-dialog>
         <el-dialog
          left
          class="msg"
          :title='title'
          :visible.sync="dialogVisiblefc"
          width="500px"
          :before-close="handleClose"
        >
          <el-form >
            <el-form-item label="所属省份" :label-width="formLabelWidth">
              <el-select
                @change="provinceChange"
                v-model="formc.province_act"
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
            <el-form-item label="所属城市" :label-width="formLabelWidth">
              <el-select
                v-model="form.city_act"
                value-key="code"
                placeholder="请选择城市"
                @change="citysChange"
              >
                <el-option v-for="item in citys" :key="item.code" :label="item.name" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="区/县" :label-width="formLabelWidth">
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
            <el-form-item label="详细地址" :label-width="formLabelWidth">
              <el-input v-model="listc.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="收货人姓名" :label-width="formLabelWidth">
              <el-input v-model="listc.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" :label-width="formLabelWidth">
              <el-input v-model="listc.phone" autocomplete="off"></el-input>
            </el-form-item>
           
          </el-form>
               <div>{{listc.name}}</div>
          <div class="sss">
            <el-button class="buttonf" @click="confirm">确定</el-button>
          </div>
        </el-dialog>
        <el-dialog
          left
          class="msg"
          :title='title'
          :visible.sync="dialogVisible"
          width="500px"
          :before-close="handleClose"
        >
          <el-form :model="form">
            <el-form-item label="所属省份" :label-width="formLabelWidth">
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
            <el-form-item label="所属城市" :label-width="formLabelWidth">
              <el-select
                v-model="form.city_act"
                value-key="code"
                placeholder="请选择城市"
                @change="citysChange"
              >
                <el-option v-for="item in citys" :key="item.code" :label="item.name" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="区/县" :label-width="formLabelWidth">
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
            <el-form-item label="详细地址" :label-width="formLabelWidth">
              <el-input v-model="form.add" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="收货人姓名" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" :label-width="formLabelWidth">
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
<script src='../../../base/addressdata.js'></script>
<script>
import { getProvince, getCity, getCounty } from "../../../base/address.js"; //
export default {
  data() {
    return {
      listc:[],
      list:[],
      title:'添加收货地址',
      citys:1,
      countys:'',
     formc: {
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
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      
      cascader_val: [], // 级联选中值
      dialogVisible: false,
      dialogVisiblef: false,
      dialogVisiblefc: false,
      dialogFormVisible: false,
      form: {
        tel:'',
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
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      dialogVisibles: false,
      redText: 1,
      https: "https://www.huainanhui.com/?presenter=10010",
      rules:{
       tel:{required:true,pattern:/^[0-9]+(.[0-9]{2})?$/,message:'请输入正确的电话号码',trigger:'blur'},
       name:{required:true,message:'请输入姓名',trigger:'blur'},
       add:{required:true,message:'请输入详细地址',trigger:'blur'},
       
}
  }
  },
  watch: {
 
  },
  computed: {
  
  },
  created() {
 
    this.getlist()
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
    dela(){
         this.dialogVisiblef = true;
    },
    del(id) {
     
        let data = {
       token:this.token,
       id:id
      };
      console.log(data)
      let self = this;
      self.$ajax
        .post("/index.php/user/address/del ", self.$qs.stringify(data), {})
        .then(res => {
            if(res.data.code===1){
               this.$message({
        message: "删除成功",
        type: "success",
        center: "true",
        offset: "300",
        duration: "800"
      })}else{
              this.$message({
        message: res.data.message,
        type: "warning",
        center: "true",
        offset: "300",
        duration: "800"
      })
      }
        
          
        });
        this.getProvince()
    },
    defaulta(id) {
        this.dialogVisiblef = false;
        let data = {
       token:this.token,
       id:id
      };
      console.log(data)
      let self = this;
      self.$ajax
        .post("/index.php/user/address/set_default", self.$qs.stringify(data), {})
        .then(res => {
          console.log('555')
          $('.defaultadd').css('color','rgb(116, 24, 27)')
           this.$message({
        message: "设置成功",
        type: "success",
        center: "true",
        offset: "300",
        duration: "800"
      });
        });
    
     
    },

    changepp(id) {
           this.title='修改收货地址'
      this.dialogVisiblefc = true;
       let data = {
         id:id,
       token:this.token
      };
        console.log(data)
      let self = this;
     let list=[]
      self.$ajax
        .post("/index.php/api/address/get_list?ajax=true", self.$qs.stringify(data), {})
        .then(res => {
         this.listc=res.data.list[0]
           
          console.log(this.listc)
        });
 
    
  
   
    },
    handleClose() {
      this.dialogVisible = false;
      this.dialogVisiblefc = false;
      this.dialogVisibles = false;
    },
    confirms() {
      console.log("111");
      this.dialogVisibles = false;
      this.$message({
        message: "恭喜你，修改地址成功",
        type: "success",
        center: "true",
        offset: "300",
        duration: "800"
      });
    },
    confirm() {
      console.log(this.form)
      this.dialogVisible = false;
        let data = {
       token:this.token,
       name:this.form.name,
       phone:this.form.tel,
       proviceId:this.form.province_act.code,
       cityId:this.form.city_act.code,
       countyId:this.form.county_act.code,
       address:this.form.add
      };
       console.log(data)
      let self = this;
     let list=[]
      self.$ajax
        .post("/index.php/user/address/add_edit", self.$qs.stringify(data), {})
        .then(res => {
          if(res.data.code===1){
                      this.$message({
        message: "恭喜你，新增地址成功",
        type: "success",
        center: "true",
        offset: "300",
        duration: "800"
      });
          }

         
          // self.list
        });
      
     
    },
    //   load() {
    //   let data = {
    //     name: "guwei",
    //     password: this.$md5("123456")
    //   };
    //   console.log(data)
    //   let self = this;
    //   self.$ajax
    //     .post("/index.php/login/login?ajax=true", self.$qs.stringify(data), {})
    //     .then(res => {
    //       // self.list = res.datalist;
    //        console.log(res.data);
    //       self.token = res.data.token;

         
    //       // self.list
    //     });
    // },
     getlist() {
      let data = {
       token:this.token
      };
   
      let self = this;
     let list=[]
      self.$ajax
        .post("/index.php/api/address/get_list?ajax=true", self.$qs.stringify(data), {})
        .then(res => {
         
           console.log(res.data);
          self.list = res.data.list;

         
      
        });
    },
    inscreased() {
     
      this.dialogVisible = true;
    
      
    },

    go(a) {
      if (a === 1) {
        this.$router.push("/account_safety");
      } else if (a === 2) {
        this.$router.push("/address_manage");
      } else if (a === 3) {
        this.$router.push("/my_message");
      } else if (a === 4) {
        this.$router.push("/packet_records");
      }
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
}
.shop_right table th {
  height: 4.8rem;
  background: rgb(228, 223, 223);
  font-size: 16px;
  color: #74171b;
}
.el-select{
  width: 100% !important;
}

.shop_right table td {
  height: 2.8rem;
  font-size: 14px;
  border-bottom: 1px#ececec solid;
  margin-top: 1px;
}
.shop_right table tr:last-child td{
  border: 0
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
.el-button--primary{
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
