<template>
	<view class="flex fixed-bottom bg-dark content-around align-stretch bg-hover-light" style="height: 70px;">
		<navigator style="width: 250rpx;" url="/pages/index/index" open-type="switchTab" class="flex align-center justify-center bg-dark">
			发现
		</navigator>
		<view class="flex align-center justify-center bg-danger" style="width: 250rpx;">
			<image src="../../static/tabbar/min.png" style="width: 60px; height: 60px;"></image>
			
		</view>
		<navigator url="../../pages/my/my" open-type="switchTab" style="width: 250rpx;" class="flex align-center justify-center bg-primary">
			我的
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>
</style>
