<template>
	<div id="navbar">
		<el-scrollbar>
			<el-menu :router="true" @open="handleOpen" @close="handleClose" select="selected(index,path)" default-active="1" :collapse="collapse" class="el-menu-vertical-demo" background-color="#393D49" text-color="#fff" active-text-color="#409eff">
		      	<el-menu-item index="1" route="/">
			        <i class="el-icon-menu"></i>
			        <span slot="title">首页</span>
		      	</el-menu-item>
		      	<el-menu-item index="2" route="/liver">
			        <i class="iconfont icon-qun" style="font-size: 29px;"></i>
			        <span slot="title">主播管理</span>
		      	</el-menu-item>
						<el-menu-item index="3" route="/liver/logged">
			        <i class="iconfont icon-qun" style="font-size: 29px;"></i>
			        <span slot="title">已连接主播</span>
		      	</el-menu-item>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script>
	export default {
		name:"Navbar",
		props:['collapse'],
		data(){
			return{
			}
		},
	    methods: {
	      handleOpen(key, keyPath) {
	        console.log(key, keyPath);
	      },
	      handleClose(key, keyPath) {
	        console.log(key, keyPath);
	      },
	      selected(index,path){
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
	    width: 100%;
	}
	#navbar .el-menu-vertical-demo.el-menu{
		background-color: #1D1B14!important;
   		text-align: left;
	}
</style>