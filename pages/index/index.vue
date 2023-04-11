<template>
	<view>
		<scroll-view scroll-x class="navscroll">
			<view class="item" :class="index == navIndex ? 'active' : '' " v-for="(item,index) in navArr"
				@click="clicksss(index,item.id)" :key="item.id">
				{{item.classname}}
			</view>
		</scroll-view>
		<view class="content">
			<view class="row" v-for="item in newsArr" :key="item.id">
				<newsbox :item="item" @click.native="goDetail(item)"> </newsbox>
			</view>
		</view>
		<view class="nodata" v-if="!newsArr.length">
			<image src="../../static/logo.png" mode="widthfix"></image>
		</view>
		<view class="loading" v-if="newsArr.length">
			<view></view>
			<view v-if="loading==1">数据加载中</view>
			<view v-if="loading==2">没有更多数据了</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navIndex: 0,
				navArr: [],
				newsArr: [],
				currentPage: 1,
				loading: 0 //0：默认 ，1：加载中  2：没有更多
				// cid: 50
			}
		},

		onLoad() {
			this.getNavData();
			this.getNewsData();
		},
		onReachBottom() {
			console.log("到底部了");
			if (this.loading == 2) {
				return;
			}

			this.currentPage++;
			this.loading = 1;
			this.getNewsData(this.cid);

		},
		methods: {
			clicksss(index, cid) {
				this.navIndex = index;
				this.cid = cid;
				this.currentPage = 1;
				this.newsArr = [];
				this.getNewsData(cid);
				this.loading = 0;
			},

			goDetail(item) {
				uni.navigateTo({
					url: `/pages/detail/detail?cid=${item.classid}&id=${item.id}`
				})
			},
			getNavData() {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/navlist.php",
					success: res => {
						console.log(res);
						this.navArr = res.data;
					}
				})
			},
			getNewsData(cid = 50) {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/newslist.php",
					data: {
						cid: cid,
						page: this.currentPage
					},
					success: res => {
						console.log(res);
						if (res.data.length == 0) {
							this.loading = 2;
						}
						this.newsArr = [...this.newsArr, ...res.data];
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navscroll {
		height: 100rpx;
		background: #f7f8fa;
		white-space: nowrap;
		position: fixed;
		top: var(--window-top);
		;
		left: 0;
		z-index: 10;

		/deep/ ::-webkit-scrollbar {
			width: 4px !important;
			height: 1px !important;
			overflow: auto !important;
			background: transparent !important;
			-webkit-appearance: auto !important;
			display: block;
		}

		.item {
			font-size: 40rpx;
			display: inline-block;
			line-height: 100rpx;
			padding: 0 30rpx;
			color: #333;
		}

		.active {
			color: red
		}


	}

	.content {
		padding: 30rpx;
		padding-top: 130rpx;

		.row {
			border-bottom: 1px dotted #efefef;
			padding: 20rpx 0;
		}
	}

	.nodata {
		display: flex;
		justify-content: center;

		image: {
			width: 360rpx
		}
	}

	.loading {
		text-align: center;
		font-size: 26rpx;
		color: #888;
		line-height: 2em;
	}
</style>
