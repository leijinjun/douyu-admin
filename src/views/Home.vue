<template>
  <div class="home" v-bind:class="{'open-bar':isOpen}">
    <el-container>
		  <el-aside>
		  	<Navbar :collapse="isCollapse"/>
		  </el-aside>
		  <el-container class="header-main">
		    <el-header>
					<Header @changeClass="changeHomeClass"/>
		    </el-header>
		    <el-main id="el-main-right">
		    	<router-view/>
		    </el-main>
		  </el-container>
		</el-container>
  </div>
</template>

<script>
import Navbar from '@/views/navbar.vue';
import Header from '@/views/header.vue';

export default {
  name: 'Home',
	components:{
		Navbar,
		Header,
	},
	data(){
		return {
			isOpen:true,
			isCollapse:false,
		}
	},
	methods:{
		changeHomeClass(){
		  var $this = this;
			this.isOpen = !this.isOpen;
			if(this.isOpen){
				setTimeout(function(){
					$this.isCollapse = !$this.isCollapse;
				},300);
			}else{
			    $this.isCollapse = !$this.isCollapse;
			}
		}
	},
}
</script>
<style scoped="scoped">
	.home{
    position: absolute;
    height: 100%;
    width: 100%;
    overflow-y: hidden;
	}
	.home.open-bar .el-aside{
		width: 240px!important;
	}
	.home .el-aside{
		width: 65px!important;
	}
  .el-aside {
    background-color: #D3DCE6;
    transition: width .28s;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    height: 100%;
    overflow: hidden;
  }
  
  .el-header {
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  }
  .el-main {
    background-color: #E9EEF3;
    min-height: calc(100vh - 50px);
    position: relative;
  }
  
  .home.open-bar .header-main{
    margin-left: 240px;
    min-height: 100%;
    transition: margin-left .28s;
    position: relative;
  }
  .home .header-main{
  	margin-left: 65px;
  }
</style>