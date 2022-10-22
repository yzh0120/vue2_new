export const status = [


	// {
	// 	path: '/login',
	// 	name: 'login',
	// 	component: () => import(/* webpackChunkName: "login" */ "@/views/status/login.vue"),
	// 	meta: {
	// 		hidden: true,
	// 		title: '登录页',
	// 		icon: 'el-icon-location',
	// 	}
	// },
	{
		path: '/404',
		name: '404',
		component: () => import( /* webpackChunkName: "404" */ "@/views/status/404.vue"),
		meta: {
			hidden: true,
			title: '404',
			icon: 'el-icon-location',
		}
	},
	{
		path: '/401',
		name: '401',
		component: () => import( /* webpackChunkName: "401" */ "@/views/status/401.vue"),
		meta: {
			hidden: true,
			title: '401',
			icon: 'el-icon-location',
		}
	},

]
