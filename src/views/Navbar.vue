<template>
	<div id="navbar">
		<el-scrollbar>
			<el-menu default-active="2" :unique-opened="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#393D49" text-color="#fff" active-text-color="#409eff">
				<el-submenu index="1">
					<template slot="title">
						<!--<i class="el-icon-location"></i>-->
						<span>主播管理</span>
					</template>
					<el-menu-item index="1-1">主播列表</el-menu-item>
					<!--<el-submenu index="1-4">
			          <template slot="title">选项4</template>
			          <el-menu-item index="1-4-1">选项1</el-menu-item>
			        </el-submenu>-->
				</el-submenu>
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
	
	#navbar{
		height: 100%;
	}
	#navbar .el-scrollbar{
		height: 100%;
	}
	.el-menu-vertical-demo{
	    border: none;
	    height: 100%;
	    width: 100%!important;
	}
	.el-submenu .el-menu-item{
		min-width: 180px;
	}
	#navbar .el-menu-vertical-demo.el-menu{
		background-color: #1D1B14!important;
		display: inline-block;
   		text-align: left;
	}
	
</style>
<style>
	#navbar .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view{
		height: 100%;
	}
	#navbar .el-scrollbar .el-scrollbar__wrap{
		overflow-x: hidden;
	}
	/*#navbar .el-submenu .el-submenu__title{
	    background-color: #393D49!important;
	}
	#navbar .el-menu-item{
		background-color: #393D49!important;
	}*/
	#navbar .el-submenu .el-menu-item{
		padding-left: 0;
	}
</style>