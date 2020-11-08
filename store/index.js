import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import $H from '../common/request.js'
import $C from '../common/config.js'
import io from '../common/uni-socket-io.js'
export default new Vuex.Store({
	state: {
		user: null,
		token: null,
		socket: null
	},
	actions: {
		// 连接socket
		connectSocket({
			state,
			dispatch
		}) {
			const S = io($C.socketUrl, {
				query: {},
				transports: ['websocket'],
				timeout: 5000
			})
			// 全局事件，用来监听在线人数
			let onlineEvent = (e) => {
				uni.$emit('live', {
					type: 'online',
					data: e
				})
			}
			// 全局事件，用来监听发送弹幕
			let commentEvent = (e) => {
				uni.$emit('live', {
					type: 'comment',
					data: e
				})
			}
			let giftEvent = (e) => {
				uni.$emit('live', {
					type: 'gift',
					data: e
				})
			}
			// 监听连接
			S.on('connect', () => {
				console.log('已连接')
				state.socket = S
				// socket.io唯一链接id, 可以监控这个id实现对点通讯
				const {
					id
				} = S
				S.on(id, (e) => {
					let d = e.data
					if (d.action === 'error') {
						let msg = d.payload
						return uni.showToast({
							title: msg,
							icon: 'none'
						})

					}
				})
				//监听在线人数
				S.on('online', onlineEvent)
				// 监听弹幕信息
				S.on('comment', commentEvent)
				// 监听礼物接收
				S.on('gift', giftEvent)

			})
			// 移除监听事件
			const removeListener = () => {
				if (S) {
					S.removeListener('online', onlineEvent)
					S.removeListener('comment', commentEvent)
					S.removeListener('gift', giftEvent)
				}
			}
			// 监听失败
			S.on('error', () => {
				removeListener()
				state.socket = null
				console.log('连接失败')
			})
			// 监听断开
			S.on('disconnect', () => {
				removeListener()
				state.socket = null
				console.log('已断开')
			})
		},
		// 需要登录才能访问的方法
		authMethod({
			state
		}, callback) {
			if (!state.token) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});

				return uni.navigateTo({
					url: '/pages/login-change/login-change'
				});

			}
			callback()
		},
		// 初始化用户登录信息
		initUser({
			state
		}) {
			let u = uni.getStorageSync('user')
			let t = uni.getStorageSync('token')
			if (u) {
				state.user = JSON.parse(u)
				state.token = t
			}
		},
		logout({
			state
		}) {
			$H.post('/logout', {}, {
				token: true
			})
			state.user = null
			state.token = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
		},
		login({
			state
		}, user) {
			state.user = user
			state.token = user.token
			uni.setStorageSync('user', JSON.stringify(user))
			uni.setStorageSync('token', user.token)
		},
		getUserInfo({
			state
		}) {
			$H.get('/user/info', {
				token: true,
				noJump: true,
				toast: false
			}).then(res => {
				state.user = res
				uni.setStorage({
					Key: 'user',
					data: JSON.stringify(state.user)
				})
			})
		}

	},
})
