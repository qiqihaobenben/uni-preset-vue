/*
 请求封装
 */

import { s_log } from '@/common/log'
import { login, reloadCurrentPage } from './login';

export function checkStatus(response, params, showErrorTip) {
	uni.hideLoading();
	// 如果http状态码正常，则直接返回数据
	if (response) {
		if (response.data.success) {
			return response.data;
		} else {
			s_log('request_fail', {
				response,
				params
			});

			if(showErrorTip) {
				uni.showToast({
					icon: 'none',
					title: response.data.info || '网络异常，请稍后重试~'
				})
			}

		}
		return response.data;
	}

	s_log('request_fail', {
		response: '无',
		params
	});

	// 异常状态下，把错误信息返回去
	return {
		statusCode: -404,
		msg: '网络异常',
	};
}

export default {
	post: async (url, data = {}, showLoading = false, showErrorTip = true, contentType) => {
		if (showLoading) {
			uni.showLoading({
				title: '加载中...',
			});
		}
		const {unionid, openid} = await login()
		if(!unionid) {
			reloadCurrentPage()
			return;
		}
		let newData = {
			url,
			unionid,
			openid,
			...data
		}
		return uni.request({
			method: 'POST',
			url,
			data: newData,
			header: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': contentType ? contentType : 'application/x-www-form-urlencoded',
			},
		}).then((response) => {
			let [error, res] = response;
			return checkStatus(res, newData, showErrorTip);
		});
	},
	get: async (url, data = {}, showLoading = false, showErrorTip = true) => {
		if (showLoading) {
			uni.showLoading({
				title: '加载中...',
			});
		}
		const {unionid,openid} = await login()
		if(!unionid) {
			reloadCurrentPage()
			return;
		}
		let newData = {
			url,
			unionid,
			openid,
			...data
		}
		return uni.request({
			method: 'GET',
			url,
			data: newData,
			header: {
				'X-Requested-With': 'XMLHttpRequest',
			},
		}).then((response) => {
			let [error, res] = response;
			return checkStatus(res, newData, showErrorTip);
		});
	},
	uploadFile(url, filePath, name, data) {
		return uni.uploadFile({
			url,
			filePath,
			name: name || 'file',
			formData: data || {},
		}).then((response) => {
			let [error, res] = response;
			return checkStatus(res);
		});
	},
};
