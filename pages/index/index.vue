<template>
	
		
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="200">
			<swiper-item>
			<image src="../../static/1.jpg" style="width: 750rpx; height: 280rpx;"></image>
			</swiper-item>
			<swiper-item>
					<image src="../../static/2.jpg" style="width: 750rpx; height: 280rpx;"></image>
			</swiper-item>
		</swiper>
		<view class=" flex-2 flex-wrap flex">
			
			<list v-for="(item, index) in list" :key="index" :item="item" :index="index" @openLive="openLive" >
				
			</list></view>
	</view>
	
</template>

<script>
import tab from '../../components/common/tab.vue';
import list from '../../components/common/list.vue';
export default {
	components: {
		tab,
		list
	},
	data() {
		return {
			title: 'Hello',
			list: [
				{
					id: 1,
					image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2247156841,1768518733&fm=11&gp=0.jpg',
					money: 0,
					colorIndex: 0,
					moods: 10,
					title: '标题1',
					status: '直播中'
				},
				{
					id: 2,
					image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2247156841,1768518733&fm=11&gp=0.jpg',
					money: 0,
					colorIndex: 0,
					moods: 10,
					title: '标题2',
					status: '直播中'
				},
				{
					id: 3,
					image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2247156841,1768518733&fm=11&gp=0.jpg',
					colorIndex: 1,
					money: 0,
					moods: 10,
					title: '标题3',
					status: '已结束'
				},
				{
					id: 4,
					image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2247156841,1768518733&fm=11&gp=0.jpg',
					colorIndex: 1,
					money: 0,
					moods: 10,
					title: '标题4',
					status: '直播中'
				},
				{
					id: 5,
					image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2247156841,1768518733&fm=11&gp=0.jpg',
					money: 0,
					colorIndex: 0,
					moods: 10,
					title: '标题5',
					status: '已结束'
				},
				{
					id: 6,
					image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2247156841,1768518733&fm=11&gp=0.jpg',
					money: 0,
					colorIndex: 0,
					moods: 10,
					title: '标题6',
					status: '已结束'
				},
				{
					id: 7,
					image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2247156841,1768518733&fm=11&gp=0.jpg',
					money: 0,
					colorIndex: 0,
					moods: 10,
					title: '标题7',
					status: '直播中'
				},
				{
					id: 8,
					image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2247156841,1768518733&fm=11&gp=0.jpg',
					money: 0,
					colorIndex: 0,
					moods: 10,
					title: '标题8',
					status: '已结束'
				},
				{
					id: 9,
					image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2247156841,1768518733&fm=11&gp=0.jpg',
					money: 0,
					colorIndex: 0,
					moods: 10,
					title: '标题9',
					status: '直播中'
				},
				{
					id: 10,
					image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2247156841,1768518733&fm=11&gp=0.jpg',

					colorIndex: 0,
					moods: 10,
					title: '标题10',
					status: '已结束'
				}
			]
		};
	},
	onLoad() {
		// uni.hideTabBar();
	},
	methods: {
		openLive(e){
		
			uni.navigateTo({
				url:'../live/live'
			})
		}
	}
};
</script>

<style>
.content {
	width: 100%;
	height: 100%;
}
</style>
