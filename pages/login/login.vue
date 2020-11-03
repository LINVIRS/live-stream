<template>
	<view class="container bg-main">
		<view class="flex align-center justify-center" style="height: 350rpx;">
			<text style="font-size: 50rpx;" class="text-light">{{ type === 'login' ? '手机验证码登录' : '账号密码登录' }}</text>
		</view>
		<view class="px-3">
			<view class="flex border-bottom align-end pb-1">
				<text v-if="isPhoneLogin" style="line-height: 80rpx;" class="mr-2">+86</text>
				<view v-if="isPhoneLogin">
					<input
						type="text"
						v-model="form.username"
						class="px-3 font rounded"
						placeholder="手机号"
						style="height: 80rpx;width: 600rpx;"
						placeholder-style=" color: #E9E8E5;"
					/>
				</view>
				<view v-else>
					<input
						type="text"
						v-model="form.username"
						class="px-3 font rounded"
						placeholder="昵称/手机号/邮箱"
						style="height: 80rpx;width: 600rpx;"
						placeholder-style=" color: #E9E8E5;"
					/>
				</view>
			</view>
			<view class="flex border-bottom mt-4 align-center align-end pb-1">
				<view v-if="isPhoneLogin" style="width: 500rpx;">
					<input
						type="text"
						v-model="form.code"
						class="px-3 font rounded "
						placeholder="请输入验证码"
						style="height: 80rpx; width: 500rpx;"
						placeholder-style=" color: #E9E8E5;"
					/>
				</view>
				<view  v-else style="width: 500rpx;">
					<input
						type="text"
						v-model="form.password"
						class="px-3 font rounded "
						placeholder="请输入密码"
						style="height: 80rpx; width: 500rpx;"
						placeholder-style=" color: #E9E8E5;"
					/>
				</view>
				<view v-if="isPhoneLogin">
					<button :disabled="message > 0 && message < 60" 
					style=" height: 80rpx; width: 190rpx; line-height: 80rpx; background-color: #EFEFEF; color: #0E151D" 
					:class="{btnColor: !(message > 0 && message <= 60)}" 
					class="font-sm rounded" @click="getCode()">{{message}}</button>
				</view>
				<view v-else>
					<view style="width: 200rpx; height: 80rpx; line-height: 80rpx; color: #E9E8E5;" class="font-sm bg-main">忘记密码</view>
				</view>
			</view>
		</view>
		<view class="p-3 flex align-center justify-center" @click="submit" >
			<view class="rounded p-3 flex align-center justify-center flex-1" style="border-radius: 60rpx;" :class="{btnColor: isLogin}">
				<text class="text-white font-md">登录</text>
			</view>
		</view>
		<view class="flex align-center justify-center">
			<text class="font p-2" @click="changeType">
				{{ type === 'login' ? '账号密码登录' : '验证码登陆' }} | 登录遇到问题
			</text>
		</view>
		<view class="flex align-center justify-center mt-5"><text class="font font-smaller">———社交账号登录———</text></view>
		<view class="flex align-center justify-between mt-3" style="margin-left: 100rpx;margin-right: 100rpx;">
			<image class="mt-3" @click="otherSign('weixin')" style="width: 100rpx;height: 100rpx;" src="../../static/weixin.png" mode=""></image>
			<image class="mt-3" style="width: 100rpx;height: 100rpx;" src="../../static/qq.png"></image>
			<image class="mt-3" style="width: 100rpx;height: 100rpx;" src="../../static/weibo.png" mode=""></image>
		</view>
		<view class="flex align-center justify-center mt-5">
			<text class=" font p-2">
				注册即代表您同意
				<text style="color: #0056B3">
					《XXX社区协议》
				</text>
			</text>
			
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isPhoneLogin: true,
			type: 'login',
			form: {
				username: '',
				password: '',
				repassword: '',
				code: ''
			},
			message: "获取验证码"
		};
	},
	computed: {
		isLogin() {
			if((this.form.username != '' && this.form.password) != '' || (this.form.username != '' && this.form.code != '')) {
				return true;
			}
			return false;
		}
	},
	methods: {
		getCode() {
			this.$H.post('/api/sendcode', {"phone": this.form.username}).then(res => {
				console.log("进入回调")
				console.log(res)
				this.message = 60;
				var that = this
				var result = setInterval(function() {
					that.message = that.message - 1;
					if(that.message == 0) {
						that.message = '获取验证码';
						clearInterval(result)
					}
				}, 1000);
			})
			
		},
		changeType() {
			this.form.username = '',
			this.form.password = ''
			this.isPhoneLogin = !this.isPhoneLogin
			this.type = this.type === 'login' ? 'reg' : 'login'
		},
		otherSign(value) {
			switch(value) {
				case 'weixin':
					this.weixin();
			}
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
		submit() {
			let msg = this.type === 'login' ? '登录' : '注册'
			//用于判断是账号密码还是验证码登录
			this.type = this.isPhoneLogin ? 'phoneLogin' : 'login';
			this.$H.post('/api/' + this.type, this.form).then(res => {
				uni.showToast({
					title: msg + "成功",
					icon: 'none'
				});
				if(this.type == 'reg') {
					this.changeType()
					this.form = {
						username: '',
						passowrd: '',
						repassword: ''
					}
				} else {
					this.$store.dispatch('login', res)
					uni.navigateBack({
						delta: 1
					})
				}
			})
		}
	}
};
</script>

<style>
	.container{
	  width: 750rpx;
	  height: 100vh;
	  margin: 0;
	  padding: 100rpx 0 0 0;
	  background-size: cover;
	  /* background-image: linear-gradient(to bottom,#BA7ACE 0%,#8745FF 100%); */
	}
</style>