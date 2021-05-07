<template>
  <div>

    <head>
      <meta charset="UTF-8">
      <title>登录</title>
    </head>
    <body>
    <div id="app">
      <el-container>
        <el-header>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <span></span>
              </div>
            </el-col>
            <el-col :span="8">
              <el-alert
                  class="top"
                  title="欢迎登录个人任务管理系统"
                  type="success">
              </el-alert>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <span></span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <span></span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form :model="dataForm" :rules="rules" ref="dataForm">
                  <el-form-item label="用户名" prop="username" >
                    <el-input v-model="dataForm.username" placeholder="请输入用户名"
                              autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password" >
                    <el-input v-model="dataForm.password" type="password" placeholder="请输入密码"
                              autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item style="text-align: center">
                    <el-button type="primary" @click="login()" plain round>登 录</el-button>
                  </el-form-item>
                  <el-form-item style="text-align: center">
                    <el-button type="primary" @click="register()" plain round>前往注册</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <span></span>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
    </body>
  </div>
</template>

<script>
import {POST} from '@/api'
import router from '@/router/index.js'
export default {
  name: 'HelloWorld',
  data() {

    return {
      dataForm: {
        username: '',
        password: '',
      },
      rules: {
        // 要以数组形式展示
        username: [
          {required: true, message: "用户名不能为空", trigger: "blur"},
          {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
        ],
        password: [
          {required: true, message: "密码不能为空", trigger: "blur"},
          {min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur"}
        ],
      },
    }
  },

  methods: {
    register: function() {
      location.href = "/view/register.html";
    },
    login: function () {
      let _this = this;
      this.$refs['dataForm'].validate(valid => {

        if (valid) {
          console.log( this.dataForm)
          POST('/login', this.dataForm)
              .then(function (response) {
                if (response.data.code == 0) {
                  sessionStorage.setItem('user', JSON.stringify(response.data.data));
                 // location.href = "/view/index.html"
                  console.log(  _this.$router)
                  router.push({path:"/index"});
                } else {
                  this.$notify.error({
                    title: '登录失败',
                    message: response.data.errorMessage
                  });
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        } else {
          this.$notify.error({
            title: '登录失败',
            message: '字段填写有误'
          });
          return false;
        }
      });
    },
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  padding: 0px;
  margin: 0px;
  background-color: #ebeef5;
  background: url('/public/images/bj.jpg');
}

/*.el-row {*/
/*    margin-bottom: 20px;*/
/*    &:last-child {*/
/*     margin-bottom: 0;*/
/* }*/
/*}*/
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.bg-purple-light {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: #ffffff;
}

.el-alert--success.is-light {
  margin-top: 30px;
}

.el-button--primary {
  width: 100%;
}
</style>
