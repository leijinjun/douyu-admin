<template>
	<div>
		<div class="search-header">
			  <el-form :inline="true" :model="searchForm" class="demo-form-inline">
					<el-form-item label="分类">
						<el-select v-model="searchForm.selectedCate" clearable filterable placeholder="请选择分类" @change="cateChange()">
							<el-option
								v-for="item in cates"
								:key="item.cateId"
								:label="item.cateName"
								:value="item.cateId">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="关键字">
						<el-input placeholder="房间名或房间号" v-model="searchForm.roomKeyword" class="input-with-select">
							<el-button slot="append" icon="el-icon-search" @click="searchRoom()"></el-button>
						</el-input>
					</el-form-item>
				</el-form>
		</div>
		<el-table id="networkAnchor-table"
		    :data="roomList"
		    style="width: 100%"
		    max-height="650"
		    v-loading="tableLoading">
		    <el-table-column
		      prop="roomId"
		      label="房间ID">
		    </el-table-column>
				<el-table-column
		      prop="nickname"
		      label="主播昵称">
		    </el-table-column>
		    <el-table-column label="操作" :sortable="true" :sort-method="sortWithConnected">
		      <template slot-scope="scope">
		        <el-button style="font-size:16px;" v-if="!scope.row.connected"
		          @click.native.prevent="connect(scope.row,scope.$index)"
		          type="text"
		          size="medium">连接
		        </el-button>
		        <el-button style="font-size:16px;" v-else
		          @click.native.prevent="disConnect(scope.row,scope.$index)"
		          type="text"
		          size="medium">断开
		        </el-button>
		        <el-button style="font-size:16px;" 
		          @click.native.prevent="goRoomDetail(scope.row.roomId)"
		          type="text"
		          size="medium">查看
		        </el-button>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="连接状态">
		      <template slot-scope="scope">
		        <span v-if="scope.row.connected" style="color: #71C671;">已连接</span>
		        <span v-else style="color: rgb(250, 121, 121);">未连接</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="热度" :sortable="true" :sort-method="sortWithHn">
		      <template slot-scope="scope">
		        <span><i class="iconfont icon-redu" style="color:#ee5959;"></i>&nbsp;{{scope.row.hn|numberFormatter}}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="roomName"
		      label="房间名称">
		    </el-table-column>
		    <el-table-column
		      label="房间缩略图">
		      <template slot-scope="scope">
		        <span>
		        	<img :src="scope.row.roomSrc" height="38px;"/>
		        </span>
		      </template>
		    </el-table-column>
		</el-table>
	</div>
</template>

<script>
import * as $util from '@/utils/index.js'
export default {
  
  name:'Liver',
  data(){
    return{
		roomList:[],
		tableLoading:false,
		cates:[],
		searchForm:{
			selectedCate:null,
			roomKeyword:null
		}
	}
  },
  filters:{
  	numberFormatter:function(value){
  		return $util.numTransform(value);
  	}
  },
   created(){
		this.$set(this,'tableLoading',true)
		this.getRoomList();
		this.getCates();
	},
	methods:{
		getRoomList(cate){
			const $this=this;
			this.$http.getRoomList({limit:100,cate:cate}).then(function(data){
				$this.$set($this,'roomList',data.body);
			}).catch(function (error) {
			}).then(function () {
				$this.$set($this,'tableLoading',false)
			});
		},
		connect(row,index){
			var room=row.roomId;
			var $this=this;
			this.$set(this,'tableLoading',true)
			this.$http.connect(room).then(data=>{
				var connected=true;
				row.connected = connected;
				$this.$set($this.roomList,index,row);
			}).catch(function(error){
			}).then(function(){
				$this.$set($this,'tableLoading',false);
			});
		},
		disConnect(row,index){
			var room=row.roomId;
			var $this=this;
			this.$set(this,'tableLoading',true)
			this.$http.disConnect(room).then((data)=>{
				$this.$set($this,'tableLoading',false);
				var connected=false;
				row.connected = connected;
				$this.$set($this.roomList,index,row);
			});
		},
		goRoomDetail(roomId){
			window.open(`https://opendanmu.com/room/${roomId}`);
		},
		sortWithConnected(a,b){
			var a1=a.connected?1:0;
			var b1=b.connected?1:0;
			return a1-b1;
		},
		sortWithHn(a,b){
			return a.hn-b.hn;
		},
		cateChange(){
			if(!this.searchForm.selectedCate){
				return;
			}
			this.$set(this,'tableLoading',true);
			this.getRoomList(this.searchForm.selectedCate);
		},
		getCates(){
			var $this=this;
			this.$http.getAllRoomCates()
			.then((data)=>{
				$this.cates=data.body;
			})
		},
		searchRoom(){
			const $this=this;
			this.$http.getRoomList({keyword:this.searchForm.roomKeyword}).then(function(data){
				$this.$set($this,'roomList',data.body);
			}).catch(function (error) {
			}).then(function () {
				$this.$set($this,'tableLoading',false)
			});
		},
	},
	mounted () {
	}
}
</script>
<style scoped="scoped">
@import url("../styles/css/networkAnchor.css");
  #networkAnchor-table{
  	font-size: 16px;
  }
  .search-header{
  	margin-bottom: 15px;
  	float: left;
  }
</style>