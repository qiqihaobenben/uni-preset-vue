<script>
	import util from '@/common/util.js'
	export default {
		onLaunch: async function() {
				console.log('App Launch');
				util.autoUpdate()
		},
		onShow: function() {
				console.log('App Show')
		},
		onHide: function() {
				console.log('App Hide')
		},
		globalData: {
		},
		methods:{
		}
	}
</script>
<style lang="scss">
    page {
		background: $uni-bg-color-grey;
		font-family: PingFangSC-Regular, PingFang SC;
		--safe-area-inset-top: 0;
		--safe-area-inset-right: 0;
		--safe-area-inset-bottom: 0;
		--safe-area-inset-left: 0;
	}

	button::after {
		border: none;
	}

	@supports (top: constant(safe-area-inset-top)) {
		page {
			--safe-area-inset-top: constant(safe-area-inset-top);
			--safe-area-inset-right: constant(safe-area-inset-right);
			--safe-area-inset-bottom: constant(safe-area-inset-bottom);
			--safe-area-inset-left: constant(safe-area-inset-left);
		}
	}

	@supports (top: env(safe-area-inset-top)) {
		page {
			--safe-area-inset-top: env(safe-area-inset-top);
			--safe-area-inset-right: env(safe-area-inset-right);
			--safe-area-inset-bottom: env(safe-area-inset-bottom);
			--safe-area-inset-left: env(safe-area-inset-left);
		}
	}

	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
</style>
