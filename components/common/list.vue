<template>
	<view style="width: 370rpx;" @click="openLive">
		<view class="p-1 m-1 " :style="{ backgroundImage: 'url(' + item.image + ')' }" style=" height: 340rpx;   background-size: cover; ">
			<view class="flex justify-between">
				<view class="flex justify-center align-center" style="width: 100rpx; height: 40rpx; border-radius: 20rpx; background-color:#272822 ; opacity: 0.9; ">
					<image src="../../static/xiaohua.png" style="width: 30rpx; height: 30rpx;"></image>
					<text class="ml-1" style="font-size: 28rpx; color: white;">{{ item.money }}</text>
				</view>

				<view class="flex  align-center" style="width: 150rpx; height: 40rpx; border-radius: 20rpx; background-color:#272822 ; opacity: 0.7; ">
					<text style=" font-size: 28rpx; color: white;" class="m-1">人气:</text>
					<text class="ml-1" style="font-size: 28rpx; color: white;">{{ item.moods }}</text>
				</view>
			</view>

			<view class="flex justify-between align-end" style="height: 290rpx;">
				<text class="ml-1 flex" style="font-size: 28rpx; color: white;">{{ item.title }}</text>

				<view class="flex  align-center" style="width: 150rpx; height: 40rpx; border-radius: 20rpx; background-color:#272822 ; opacity: 0.7; ">
					<view style="border-radius: 50%; width: 20rpx; height: 20rpx; " :style="{ backgroundColor: color[item.colorIndex] }" class="ml-2"></view>
					<text class="ml-1" style="font-size: 20rpx; color: white;">{{ item.status }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		item: Object,
		index: [Number, String]
	},
	methods: {
		openLive() {
			this.$emit('openLive', this.item.id);
		}
	},
	data() {
		return {
			color: ['red', 'green']
		};
	}
};
</script>

<style></style>
