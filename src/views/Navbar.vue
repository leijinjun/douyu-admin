<template>
	<div id="navbar">
		<el-scrollbar>
			<el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#393D49" text-color="#fff" active-text-color="#409eff">
			 	<el-menu-item index="1">
			        <i class="el-icon-menu"></i>
			        <span slot="title">主播管理</span>
		      	</el-menu-item>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script>
	export default {
		name:"Navbar",
	    methods: {
	      handleOpen(key, keyPath) {
	        console.log(key, keyPath);
	      },
	      handleClose(key, keyPath) {
	        console.log(key, keyPath);
	      }
	    }
  	}
</script>

<style scoped="scoped">
	@import url("../styles/css/navbar.css");
	#navbar{
		height: 100%;
	}
	#navbar .el-scrollbar{
		height: 100%;
	}
	.el-menu-vertical-demo{
	    border: none;
	    height: 100%;
	    /*width: 100%!important;*/
	   width: 100%;
	}
	#navbar .el-menu-vertical-demo.el-menu{
		background-color: #1D1B14!important;
		display: inline-block;
   		text-align: left;
	}
</style>