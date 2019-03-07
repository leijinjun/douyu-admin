<template>
  <div class="login-container">
   <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">
          Login
        </h3>
      </div>

      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="username"
          name="username"
          type="text"
        >
        <i class="iconfont icon-yonghu" slot="prefix"></i>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="password"
          name="password"
          :type="isShowPwd?'text':'password'"
        >
        <i class="iconfont icon-mima" slot="prefix" style="font-size: 19px;"></i>
        <i class="iconfont" v-bind:class="{'icon-yanjing1':!isShowPwd,'icon-yanjing':isShowPwd}" slot="suffix" @click="isShowPwd = !isShowPwd"></i>
        </el-input>
      </el-form-item>

      <el-button :loading="loginLoding" type="primary" style="width:100%;height: 40px;" @click="handleLogin('loginForm')">
                    登录
      </el-button>
      </el-form>
  </div>
</template>

<script>
 export default {
 	name:'Login',
 	data(){
 	  var validateUsername = (rule, value, callback) => {
 	      if(!value.trim()){
 	        callback(new Error("请输入用户名"));
 	      }else{
 	        callback();
 	      }
     };
     var validatePassword = (rule, value, callback) => {
        if(!value.trim()){
          callback(new Error("请输入密码"));
        }else{
          callback();
        }
     };
 	  return{
 	   loginLoding:false,
 	   isShowPwd:false,
 	   loginForm:{
 	   	username:'',
 	   	password:''
 	   },
 	   loginRules:{
 	    username:[
				{validator:validateUsername,trigger: 'blur' }
 	    ],
 	    password:[
 	    	{validator:validatePassword,trigger:'blur'}
 	    ]
 	   }
 	  }
 	},
 	methods:{
 	  handleLogin(formName){
 	    this.$refs[formName].validate((valid) => {
          if (valid) {
            this.toRoute.toHomePage(this.$router);
          } else {
            return false;
          }
      });
 	  },
 	}
 }
</script>

<style scoped="scoped">
@import url("../styles/css/login.css");
.login-container {
    min-height: 100%;
    width: 100%;
    background-color: #2d3a4b;
    overflow: hidden;
}
.login-container .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
}
.login-container .title-container{
    position: relative;
}
.login-container .title-container .title{
    font-size: 26px;
    color: #eee;
    margin: 0 auto 40px;
    text-align: center;
    font-weight: 700;
}
.login-container .el-form-item {
    border: 1px solid hsla(0,0%,100%,.1);
    background: rgba(0,0,0,.1);
    border-radius: 5px;
    color: #454545;
}
.login-container .el-input {
    display: inline-block;
    height: 47px;
}
.login-container .icon-container {
  padding: 5px 0 0 5px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
}
.icon-container i {
    width: 1em;
    height: 1em;
    vertical-align: -.15em;
    overflow: hidden;
}
</style>