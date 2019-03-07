
export default {
	toHomePage($router){
	   $router.push({path:'/',name:'Home'});
	},
	toLogin($router){
	   $router.push({path:'/login',name:'Login'});
	}
    
}
