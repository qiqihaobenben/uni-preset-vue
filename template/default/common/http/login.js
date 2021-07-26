/*
 用户登录相关
 */

import API from './api'
import {checkStatus} from './index'
import utils from '../util'
import store from '../../store/index'

const { set_storage } = utils

function getUnionid() {
  return new Promise((resolve) => {
    uni.login({
      provider: 'weixin',
      success(res) {
        if(res.code) {
          uni.request({
            method: 'GET',
            url: API.auth,
            data: {js_code: res.code},
            header: {
              'X-Requested-With': 'XMLHttpRequest',
            },
          }).then((response) => {
            let [error, res] = response;
            return checkStatus(res, {js_code: res.code}, true);
          })
          .then((response) => {
            resolve(response)
          })

        }else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  })
}

export const login = async () => {
  let {unionid, openid} = store.state.userInfo
  if(!unionid || !openid) {
    const response = await getUnionid()
    if(response.success) {
      unionid = response.data.unionId
      openid = response.data.openId
      // 主要用于打点统计
      set_storage('unionid', unionid)
      store.commit('setUserInfo', {unionid, openid})
    }
  }
  return {unionid, openid}
}


export const reloadCurrentPage = () => {
  const pageList = getCurrentPages()
  const currentPage = pageList[pageList.length - 1]
  wx.showModal({
    title: '提示',
    content: '网络错误导致未获取到登录信息，是否刷新页面？',
    success(res) {
      if(res.confirm) {
        wx.reLaunch({
          url: currentPage.$page.fullPath
        })
      }
    }
  })
}
