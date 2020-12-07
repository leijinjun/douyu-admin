<template>
    <div>
        <el-table id="liver-logged-table"
		    :data="pager.liverLoggedTable"
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
		    <el-table-column
		      label="连接状态">
		      <template slot-scope="scope">
						<el-button style="font-size:16px;" 
		          @click.native.prevent="disConnect(scope.row.roomId)"
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
		      label="热度" :sortable="true">
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
		<div class="block">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pager.currentPage"
				:page-sizes="[10, 15, 20, 30,100]"
				:page-size="pager.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="pager.total">
			</el-pagination>
		</div>
    </div>
</template>

<script>
import * as $util from '@/utils/index.js'
export default {
    name:'LiverLogged',
    data(){
        return{
            pager:{
							liverLoggedTable:[],
							currentPage:1,
							pageSize:10,
							total:0
						},
            tableLoading:false,
        }
    },
    filters:{
        numberFormatter:function(value){
            return $util.numTransform(value);
        }
    },
    created(){
				this.getRoomLogged(this.pager.currentPage,this.pager.pageSize);
    },
    methods:{
        getRoomLogged(currPage,pageSize){
            const $this=this;
						this.$set(this,'tableLoading',true);
						var params = new URLSearchParams();
						params.append("pn",currPage);
						params.append("ps",pageSize);
						this.$http.getAllRoomLogged(params).then(function(data){
							$this.$set($this,'tableLoading',false)
							$this.$set($this.pager,'liverLoggedTable',data.body.items);
							$this.$set($this.pager,'pageSize',data.body.limit);
							$this.$set($this.pager,'total',data.body.total);
						});
        },
        disConnect(roomId){
						var $this=this;
						this.$set(this,'tableLoading',true)
						this.$http.disConnect(roomId).then((data)=>{
							$this.$set($this,'tableLoading',false);
							$this.getRoomLogged($this.pager.currentPage,$this.pager.pageSize);
						});
				},
				handleSizeChange(pageSize) {
					this.getRoomLogged(this.pager.currentPage,pageSize);
				},
				handleCurrentChange(currentPage) {
					this.getRoomLogged(currentPage,this.pager.pageSize);
				},
				goRoomDetail(roomId){
					window.open(`https://danmu.lei2j.com/room/${roomId}`);
				},
    }
}
</script>
<style scoped>
#liver-logged-table{
  	font-size: 16px;
}
</style>


