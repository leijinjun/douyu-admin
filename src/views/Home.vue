<template>
  <div class="home">
    <el-container>
		  <el-aside>
		  	<Navbar/>
		  </el-aside>
		  <el-container class="header-main">
		    <el-header>
					<Header/>
		    </el-header>
		    <el-main>
		    </el-main>
		  </el-container>
		</el-container>
  </div>
</template>

<script>
import Navbar from '@/views/Navbar.vue';
import Header from '@/views/Header.vue';

export default {
  name: 'home',
	components:{
		Navbar,
		Header
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
    width: 240px!important;
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
  }
  
  .el-header {
    /*height: 50px;*/
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
    margin-left: 240px;
    position: relative;
  }
</style>