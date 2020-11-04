import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import $H from '../common/request.js'
import $C from '../common/config.js'
import io from '../common/uni-socket.io.js'
export default new Vuex.Store({
	state: {
		user: null,
		token: null,
		socket: null
	},
	actions: {
		//连接Socket
		connectSocket({
			state,
			dispatch
		}) {
			const S = io($C.socketUrl, {
				query: {},
				transports: ['websocket'],
				timeout: 5000
			})
			//监听连接
			S.on('connect', () => {
				console.log('已连接')
			})
			//监听失败
			S.on('erro', () => {
				console.log('连接失败')
			})
			//监听断开
			S.on('disconnect', () => {
				console.log('连接断开')
			})
		},
		authMethod({
			state
		}, callback) {
			if (!state.token) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return uni.navigateTo({
					url: '/pages/login/login'
				});
			}
			callback()
		},
		//初始化用户登录状态
		initUser({
			state
		}) {
			let u = uni.getStorageSync('user')
			let t = uni.getStorageSync('$token')
			if (u) {
				state.user = JSON.parse(u)
				state.token = t
			}
		},
		login({
			state
		}, user) {
			state.user = user
			state.token = user.token

			uni.setStorageSync('user', JSON.stringify(user))
			uni.setStorageSync('token', user.token)
		},
		logout({
			state
		}) {
			$H.post('/api/logout', {}, {
				token: true,
				toast: false
			})
			state.user = null
			state.token = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
		},
		getUserInfo({
			state
		}) {
			$H.get('/api/user/info', {
				token: true,
				noJump: true,
				toast: false
			}).then(res => {
				state.user = res
				uni.setStorage({
					key: 'user',
					data: JSON.stringify(state.user)
				})
			})
		}
	}
})
