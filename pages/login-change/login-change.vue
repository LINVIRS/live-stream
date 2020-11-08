<template>
	<view class="container">
		<view class="flex align-center justify-center" style="height:350rpx ;">
			<text style="font-size: 50rpx;" class="text-light">
				{{ type === 'account' ? '账号密码登录' : '手机验证码登录' }}
			</text>
		</view>
		<view v-if="type == 'account'" class="px-3">
			<input
				type="text"
				v-model="form.username"
				class="bg-light px-3 mb-4 font"
				placeholder="昵称/手机号/邮箱"
				style="height: 100rpx;"
			/>
			<view class="flex">
				<input
					type="text"
					v-model="form.password"
					class="bg-light px-3 mb-4 font "
					placeholder="请输入密码"
					style="height: 100rpx;width: 460rpx; border: none;"
				/>
				<text
					style="background-color: #ffffff; border: none; height: 100rpx;width: 170rpx; border-radius: unset; margin-left: 0rpx;"
					class="font-sm text-light-muted flex align-center justify-center"
				>
					忘记密码
				</text>
			</view>
		</view>
		<view class="px-3" v-else>
			<view class="flex">
				<view
					class="font-weight-bold flex align-center justify-center"
					style="height: 100rpx;width: 100rpx; background-color: #FFFFFF;"
				>
					+86
				</view>
				<input
					type="number"
					v-model="form.phone"
					class="bg-light px-3 mb-4 font"
					placeholder="手机号"
					style="height: 100rpx;width: 550rpx;"
				/>
			</view>
			<view class="flex">
				<input
					type="number"
					v-model="form.code"
					class="bg-light px-3 mb-4 font "
					placeholder="请输入验证码"
					style="height: 100rpx;width: 420rpx; border: none;"
				/>
				<button
					style="background-color: #ffffff; border: none; height: 100rpx;width: 210rpx; border-radius: unset; margin-left: 0rpx;"
					class="font-sm text-light-muted flex align-center justify-center"
					@click="getCode"
				>
					{{ codeBtn.text }}
				</button>
			</view>
		</view>
		<view class="p-3 flex align-center justify-center">
			<view
				class="bg-main rounded p-3 flex align-center justify-center flex-1"
				hover-class="bg-main-hover"
				@click="submit"
			>
				<text class="text-white font-md">登录</text>
			</view>
		</view>
		<view class="flex align-center justify-center">
			<text class="text-light-muted font p-2" @click="changeType">
				{{ type === 'account' ? '手机验证码登录' : '账号密码登录' }}
			</text>
			<text class="text-light-muted font p-2">|</text>
			<text class="text-light-muted font p-2">登录遇到问题</text>
		</view>
		<view class="flex align-center justify-center">
			<text class="text-light-muted font p-2">————————</text>
			<text class="text-light-muted font p-2">社交帐号登录</text>
			<text class="text-light-muted font p-2">————————</text>
		</view>
		<view class="flex align-center justify-around">
			<image src="../../static/icon/QQ.png" style="width: 80rpx;height: 80rpx;"></image>
			<image src="../../static/icon/weixin.png" style="width: 80rpx;height: 80rpx;" @click="weixin"></image>
			<image src="../../static/icon/weibo.png" style="width: 80rpx;height: 80rpx;"></image>
		</view>
		<view class="flex align-center justify-center">
			<text class="text-light-muted font-md p-2">注册即代表您同意《LIVE VIEW社区协议》</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			type: 'account',
			seconds: 60,
			codeBtn: {
				text: '获取验证码',
				count: this.seconds
			},
			form: {
				username: '',
				password: '',
				phone: '',
				code:''
			}
		};
	},
	methods: {
		changeType() {
			this.type = this.type === 'account' ? 'phone' : 'account';
		},
		submit() {
			let result = this.type === 'account' ? 'login' : 'phoneLogin';
			console.log(this.form);
			this.$H.post('/' + result, this.form).then(res => {
				uni.showToast({
					title: '登录成功',
					icon: 'none'
				});
				this.$store.dispatch('login', res);
				uni.navigateBack({
					delta: 1
				});
			});
		},
		weixin() {
					var that = this
					//判断手机是否安装微信
					uni.getProvider({
						service: 'oauth',
						success: function(res) {
							//进行微信授权
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									 console.log(JSON.stringify(loginRes));
									//获取微信信息
									uni.getUserInfo({
										provider: 'weixin',
										success: function(info) {
											var user = info.userInfo;
											var param = {"avatar": user.avatarUrl, "openId": user.openId};
											that.$H.post('/api/wxLogin', param).then(res => {
												uni.showToast({
													title: "登录成功",
													icon: 'none'
												});
												that.$store.dispatch('login', res)
												uni.navigateBack({
													delta: 2
												})
											});
											
										}
									})
								}
							})
						}
					})
				},
		userLogin(loginDTO) {
			console.log(loginDTO);
			this.$H.post('/wxLogin', loginDTO).then(res => {
				uni.showToast({
					title: '登录成功',
					icon: 'none'
				});
				this.$store.dispatch('login', res);
				uni.navigateBack({
					delta: 1
				});
			});
		},
		getCode() {
			this.$H.post('/sendcode', { phone: this.form.phone }).then(res => {
				// 倒计时
				this.codeBtn.waitingCode = true;
				this.codeBtn.count = this.seconds;
				this.codeBtn.text = this.codeBtn.count + 's';
				let countdown = setInterval(() => {
					this.codeBtn.count--;
					this.codeBtn.text = this.codeBtn.count + 's';
					this.status = true;
					if (this.codeBtn.count < 0) {
						clearInterval(countdown);
						this.codeBtn.text = '重新发送';
						this.status = false;
					}
				}, 1000);
			});
		},
		// 表单验证
		validate() {
			var mPattern = /^1[34578]\d{9}$/;
			if (!mPattern.test(this.phone)) {
				uni.showToast({
					title: '手机号码格式不正确',
					icon: 'none'
				});
				return false;
			}
			return true;
		}
	}
};
</script>

<style>
.container {
	width: 750rpx;
	height: 100vh;
	margin: 0;
	padding: 100rpx 0 0 0;
	background-size: cover;
	background-image: linear-gradient(to bottom, #8ca6db 0%, #9733ee 100%);
}
</style>
