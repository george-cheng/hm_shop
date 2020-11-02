<template>
	<view class="pics">
		<scroll-view class="left" scroll-y>
			<view :class="active === index ? 'active' : ''" @click="cateEvent(index, item.id)" v-for="(item, index) in cates" :key="item.id">{{item.title}}</view>
		</scroll-view>
		<scroll-view class="right" scroll-y>
			<view class="item" v-for="(item, index) in secData" :key="item.id">
				<image :src="item.img_url" @click="imgEvent(item.img_url)"></image>
				<text>{{item.title}}</text>
			</view>
			<text v-if="secData.length === 0">暂无数据</text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cates: [],
				secData: [],
				active: 0
			}
		},
		onLoad() {
			this.getPicscate()
		},
		methods: {
			async getPicscate(){
				const res = await this.$myRequest({
					url: '/api/getimgcategory'
				})
				this.cates = res.data.message
				this.cateEvent(0, this.cates[0].id)
			},
			async cateEvent(index, id){
				this.active = index
				const res = await this.$myRequest({
					url: '/api/getimages/' + id
				})
				this.secData = res.data.message
			},
			imgEvent(img_url){
				const urls = this.secData.map(item => {
					return item.img_url
				})
				uni.previewImage({
					urls: urls,
					current: img_url
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.pics{
		height: 100%;
		display: flex;
		.left{
			width: 200rpx;
			height: 100%;
			border-right: 1px solid #eee;
			view{
				height: 60px;
				line-height: 60px;
				color: #333;
				text-align: center;
				font-size: 30rpx;
				border-top: 1px solid #eee;
			}
			.active{
				background-color: $shop-color;
				color: #fff;
			}
		}
	}
	.right{
		width: 520rpx;
		height: 100%;
		margin: 10rpx auto;
		.item{
			image{
				width: 520rpx;
				height: 520rpx;
				border-radius: 5px;
			}
			text{
				font-size: 30rpx;
				line-height: 60rpx;
			}
		}
	}
</style>
