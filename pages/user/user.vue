<template>
	<view class="user">
		<view class="top">
			<image src="../../static/logo.png"></image>
			<text class="text">浏览历史</text>
		</view>
		<view class="content">
			<view class="row" v-for="item in listArr">
				<newsbox :item=item @click.native="goDetail(item)">
				</newsbox>
			</view>
		</view>
		
		<view class="nocontent" v-if="!listArr.length">
			<image src="../../static/logo.png" mode="aspectFill"></image>
			<view class="text">暂无历史记录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listArr: []
			}
		},
		onShow() {
			this.getdata();
		},
		methods: {
			goDetail(item) {
				uni.navigateTo({
					// url: "/pages/detail/detail",
					url: `/pages/detail/detail?cid=${item.classid}&id=${item.id}`
				})
			},
			getdata() {
				let hisArr = uni.getStorageSync("historyArr") || [];
				this.listArr = hisArr;
			}
		}
	}
</script>

<style lang="scss">
	.user {
		.top {
			padding: 50rpx 0;
			background: #f8f8f8;
			color: #555;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 150rpx;
				height: 150rpx;
			}

			.text {
				font-size: 38rpx;
			}
		}
	}

	.content {
		padding: 30rpx;

		.row {
			border-bottom: 1px dotted #efefef;
			padding: 20rpx 0;
		}
	}
	.nocontent{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image{
			width: 450rpx;
		}
		.text{
			font-size: 26rpx;
			color: #888;
		}
	}
</style>
