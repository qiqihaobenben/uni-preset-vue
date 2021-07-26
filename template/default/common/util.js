
/**
 * $setStorage
 * @param {res}
 *
 */
const set_storage = (key, res) => {
	try {
		wx.setStorageSync(key, res);
	} catch (e) {

	}
};

/**
 * $getStorage
 * @param {res}
 *
 */
const get_storage = (key) => {
	try {
		return wx.getStorageSync(key);
	} catch (e) {

	}
};

/**
 * $removestorage
 * @param {key}
 *
 */
const remove_storage = (key) => {
	try {
		wx.removeStorageSync(key);
	} catch (e) {

	}
};

function compareVersion(v1, v2) {
	v1 = v1.split('.');
	v2 = v2.split('.');
	const len = Math.max(v1.length, v2.length);
	while (v1.length < len) {
		v1.push('0');
	}
	while (v2.length < len) {
		v2.push('0');
	}
	for (let i = 0; i < len; i++) {
		const num1 = parseInt(v1[i], 10);
		const num2 = parseInt(v2[i], 10);
		if (num1 > num2) {
			return 1;
		}
		if (num1 < num2) {
			return -1;
		}
	}
	return 0;
}

function autoUpdate() {
	// 小程序是否兼容更新机制
	if(wx.canIUse('getUpdateManager')) {
		const updateManager = wx.getUpdateManager()
		updateManager.onCheckForUpdate(function (res) {
			if(res.hasUpdate) {
				updateManager.onUpdateReady(function () {
					wx.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用？',
						success(res) {
							if(res.confirm) {
								updateManager.applyUpdate()
							}
						}
					})
				})
				updateManager.onUpdateFailed(function () {
					console.log('新版本下载失败')
				})
			}
		})
	}
}

module.exports = {
	set_storage,
	get_storage,
	remove_storage,
	compareVersion,
	autoUpdate
}
