<template>
	<view class="goods_list">
		<goods-List :goods='goods' @goodsItemClick="goGoodsDetail"></goods-List>
		<view class="isOver" v-if="isOver">---我是有底线的---</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	export default {
		components:{"goods-List": goodsList},
		data() {
			return {
				pageindex: 1,
				goods: [],
				isOver: false
			}
		},
		onLoad() {
			this.getGoodsList()
		},
		methods: {
			async getGoodsList(callBack){
				const res = await this.$myRequest({
					url: '/api/getgoods?pageindex=' + this.pageindex
				})
				this.goods = [...this.goods,...res.data.message]
				callBack && callBack()
			},
			goGoodsDetail(id){
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?id=' + id
				})
			}
		},
		onReachBottom() {
			if(this.goods.length < this.pageindex*10) return this.isOver = true
			this.pageindex ++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.pageindex = 1;
			this.goods = []
			this.isOver = false
			setTimeout(()=>{
				this.getGoodsList(()=>{
					uni.stopPullDownRefresh()
				})
			},300)
		}
	}
</script>

<style lang="scss">
.goods_list{
	background-color: #eee;
}
.isOver{
	width: 100%;
	height: 50px;
	line-height: 50px;
	text-align: center;
	font-size: 28rpx;
}
</style>
