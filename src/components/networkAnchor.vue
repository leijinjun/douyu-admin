<template>
	<div>
		<el-form :inline="true" :model="selectForm" class="demo-form-inline" style="font-size: 26px;">
		  <el-form-item label="房间Id">
		    <el-input v-model="selectForm.roomId" placeholder="房间Id"></el-input>
		  </el-form-item>
		  <el-form-item label="房间名称">
		  	<el-input v-model="selectForm.roomName" placeholder="房间名称"></el-input>
		  </el-form-item>
		  <el-form-item label="主播昵称">
		  	<el-input v-model="selectForm.nickname" placeholder="主播昵称"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="sumbitSelect">查询</el-button>
		  </el-form-item>
		</el-form>
		<el-table id="networkAnchor-table"
		    :data="roomList"
		    style="width: 100%"
		    max-height="650"
		    v-loading="tableLoading"
		    :row-class-name="tableRowClassName">
		    <el-table-column
		      prop="roomId"
		      label="房间ID">
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
		          size="medium">断开连接
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
		        <span v-else style="color: #CD5555;">未连接</span>
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
		      prop="nickname"
		      label="主播昵称">
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
  
  name:'NetworkAnchor',
  data(){
    return{
		roomList:[],
		tableLoading:false,
		selectForm:{
			roomId:null,
			roomName:null,
			nickname:null,
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
	},
	methods:{
		tableRowClassName({row, rowIndex}) {
			if(row.connected){
				return 'connected-row';
			}
	        return '';
        },
		getRoomList(){
			const $this=this;
			this.$http.getRoomList({limit:100}).then(function(data){
				$this.$set($this,'tableLoading',false)
				$this.$set($this,'roomList',data.body);
			});
		},
		connect(row,index){
			var room=row.roomId;
			var $this=this;
			this.$set(this,'tableLoading',true)
			this.$http.connect(room).then(data=>{
				$this.$set($this,'tableLoading',false);
				var connected=true;
				row.connected = connected;
				$this.$set($this.roomList,index,row);
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
		sumbitSelect(){
			
		}
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
</style>