<template>
	<div class="admin-header">
		<div class="hamburger-container" @click="navbarHideOrShow">
		 <span class="iconfont icon-liebiaozhanshi"></span>
		</div>
		<div class="header-right-menu">
			<el-dropdown trigger="click" @command="handleUserinfo" class="userinfo">
			  <span class="el-dropdown-link">
			    admin<i class="el-icon-arrow-down el-icon--right"></i>
			  </span>
			  <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item command=1>修改密码</el-dropdown-item>
			    <el-dropdown-item command=2>登出</el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>
		</div>
    </div>
</template>

<script>
	export default {
	  name: 'Header',
	  methods:{
	  	handleUserinfo(command){
	  		if(command==1){
	  		}else if(command==2){//登出
	  		  this.toRoute.toLogin(this.$router);
	  		}
	  	},
	  	navbarHideOrShow(){
	  		this.$emit("changeClass");
	  	}
	  },
	}
</script>

<style scoped="scoped">
	.admin-header{
		height: 60px;
		width: 100%;
		box-sizing: inherit;
	}
	.hamburger-container{
		width: 30px;
		height: 100%;
		line-height: 56px;
	    cursor: pointer;
	    float: left;
	}
	.hamburger-container .iconfont{
		font-size: 20px;
	}
	.admin-header .el-dropdown{
		float: left;
	}
	.admin-header .header-right-menu{
		height: 100%;
		float: right;
	}
	.header-right-menu .el-dropdown{
		padding-top: 20px;
	}
	.admin-header .el-dropdown .el-dropdown-link {
	    cursor: pointer;
	    color: #409EFF;
    }
</style>