<template>
    <div>
        <el-table id="liver-logged-table"
		    :data="liverLoggedTable"
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
		        <span style="color: #71C671;cursor: pointer;" @click="disConnect(scope.row.roomId)">断开</span>
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
    </div>
</template>

<script>
import * as $util from '@/utils/index.js'
export default {
    name:'LiverLogged',
    data(){
        return{
            liverLoggedTable:[],
            tableLoading:false,
        }
    },
    filters:{
        numberFormatter:function(value){
            return $util.numTransform(value);
        }
    },
    created(){
        this.getRoomLogged();
    },
    methods:{
        getRoomLogged(){
            const $this=this;
            this.$set(this,'tableLoading',true);
			this.$http.getAllRoomLogged().then(function(data){
				$this.$set($this,'tableLoading',false)
				$this.$set($this,'liverLoggedTable',data.body);
			});
        },
        disConnect(roomId){
			var $this=this;
			this.$set(this,'tableLoading',true)
			this.$http.disConnect(roomId).then((data)=>{
				$this.$set($this,'tableLoading',false);
				$this.getRoomLogged();
			});
        },
    }
}
</script>
<style scoped>
#liver-logged-table{
  	font-size: 16px;
}
</style>


