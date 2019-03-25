<template>
	<el-table id="networkAnchor-table"
    :data="roomList"
    style="width: 100%"
    max-height="650"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="roomId"
      label="房间ID">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button style="font-size:16px;" v-if="!scope.row.connected"
          @click.native.prevent="connect(scope.row.roomId)"
          type="text"
          size="medium">连接
        </el-button>
        <el-button style="font-size:16px;" v-else
          @click.native.prevent="disConnect(scope.row.roomId)"
          type="text"
          size="medium">断开连接
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
</template>

<script>
export default {
  name:'NetworkAnchor',
  data(){
    return{
		changeFlag:true,
		roomId:null,
		cates:[],
		keyword:null,
		selectedCate:null,
		roomList:[],
		roomConnecting:{},
	}
  },
  created(){
		/*var connected=this.$route.query.connected;
		if(connected===undefined){
			this.changeFlag=true;
			this.getRoomList();
		}else{
			this.changeFlag=false;
			this.getCacheRoomList();
		}
		this.getCates();*/
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
			this.$http.getRoomList({limit:100}).then(function(response){
				$this.$set($this,'roomList',response.body);
			});
		},
		getCacheRoomList(){
			var $this=this;
			this.$http.get('/room/info/logged')
				.then((response)=>{
					var res=response.data;
					$this.roomList=res.body;
				})
		},
		connect(room){
			var $this=this;
			this.$set(this.roomConnecting,room,true)
			this.$http.connect(room).then(response=>{
				$this.$set($this.roomConnecting,room,false)
			});
		},
		disConnect(room){
			var $this=this;
			this.$set(this.roomConnecting,room,true)
			var params=new URLSearchParams();
			params.append("room",room);
			this.$http.post('/room/client/logout',params)
				.then((response)=>{
					this.$set(this.roomConnecting,room,false)
					var res=response.data;
					$this.changeRoomList();
				})
				.catch((error)=>{
					this.$set(this.roomConnecting,room,false)
					$this.$message.error("连接错误");
				});
		},
		changeRoomListFlag(){
			var flag=this.changeFlag;
			this.changeFlag=!flag;
			this.changeRoomList();
		},
		changeRoomList(){
			if(!this.changeFlag){
				this.getCacheRoomList();
			}else{
				this.getRoomList();
			}
		},
		cateChange(){
			if(this.selectedCate==null){
				return;
			}
			this.getRoomList();
		},
		getCates(){
			var $this=this;
			this.$http.get('/room/info/cates')
				.then((response)=>{
					var res=response.data;
					if(res.code==200){
						$this.cates=res.body;
					}
				})
		},
		searchRoom(){
			var room=this.keyword;
			if(room==null||room==''){
				return;
			}
			var $this=this;
			this.$http.get(`/room/info/detail/${room}`)
				.then((response=>{
					var res=response.data;
					var arr=new Array();
					arr.push(res.body.room);
					$this.roomList=arr;
				}));
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