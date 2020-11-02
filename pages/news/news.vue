<template>
	<view class="news">
		<news-item :list="newList" @itemClick="goDetail"></news-item>
	</view>
</template>

<script>
	import newsItem from '../../components/news-item/news-item.vue'
	export default {
		data() {
			return {
				newList: []
			}
		},
		components: {"news-item": newsItem},
		onLoad() {
			this.getNewsEvent()
		},
		methods: {
			async getNewsEvent(){
				const res = await this.$myRequest({
					url: '/api/getnewslist'
				})
				this.newList = res.data.message
			},
			goDetail(id){
				console.log(id)
				uni.navigateTo({
					url: '/pages/news-detail/news-detail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.news{
		
	}
</style>
