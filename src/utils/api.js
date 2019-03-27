import $request from '@/utils/request.js'
export default {
	getRoomList(param){
		return $request.get('/room/info/list',{params:param});
	},
	connect(roomId){
		return $request.post(`/room/client/login/${roomId}`);
	},
	disConnect(roomId){
		var params=new URLSearchParams();
		params.append("room",roomId);
		return $request.post('/room/client/logout',params);
	},
	getAllRoomCates(){
		return $request.get('/room/info/cates');
	}
}
