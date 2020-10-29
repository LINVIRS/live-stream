<template>
	<view style="position: fixed; bottom: 120rpx; left: 0;right: 0;">
		<!-- 使用动画纵向滚动 将scrollInToview方法的返回值绑定到scroll-into-view 属性上熟悉scroll-view组件的常用熟悉 -->
		<scroll-view scroll-y="true" style="width: 520rpx; height: 300rpx; scroll-with-animation" class="pl-3" :scroll-into-view="scroll - into - view">
			<view
				:id="'danmu' + item.id"
				class="flex justify-start align-start rounded p-2 mb-2"
				style="background-color: rgba(255,255,255,0.125);"
				v-for="(item, index) in list"
				:key="index"
			>
				<text class="font-md text-light" >{{ item.name }}:</text>
				<text class="font-md text-white" >{{ item.content }}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollInToview: '', //滚动到那个元素的view视图
			list: [] //弹幕数组
		};
	},
	mounted() {
		let id = 1;
		setInterval(() => {
			this.list.push({
				id: id,
				name: '观众' + id,
				content: '发言_' + id
			});
			//至于底部
			this.toBottom();
			id++;
		}, 2000);
	},
	methods: {
		toBottom() {
			setTimeout(() => {
				let len = this.list.length;
				if (len > 0 && this.list[len - 1]) {
					this.scrollInToview = 'danmu' + this.list[len - 1].id;
				}
			}, 200);
		}
	}
};
</script>

<style></style>
