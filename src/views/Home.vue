<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <el-container>
		  <el-aside>
		  	<Navbar/>
		  </el-aside>
		  <el-container class="header-main">
		    <el-header>Header</el-header>
		    <el-main>
		    </el-main>
		  </el-container>
		</el-container>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from './Navbar.vue';

export default {
  name: 'home',
	components:{
		Navbar
	}
}
</script>
<style scoped="scoped">
	.home{
    position: relative;
    height: 100%;
    width: 100%;
    overflow-y: hidden;
	}
  .el-aside {
    background-color: #D3DCE6;
    transition: width .28s;
    width: 180px!important;
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
  }
  
  .el-header {
    height: 50px;
    line-height: 50px;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  }
  .el-main {
    background-color: #E9EEF3;
    min-height: calc(100vh - 50px);
    position: relative;
  }
  
  .header-main{
    min-height: 100%;
    transition: margin-left .28s;
    /*margin-left: 180px;*/
    position: relative;
  }
</style>