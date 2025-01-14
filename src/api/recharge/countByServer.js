import request from '@/utils/request'

/**
 * 获取充值按区服列表
 * @param data
 * @returns {*}
 */
export function getCountByServerList(data) {
    return request({
        url: '/comprehensive/server_pay_list',
        method: 'post',
        data
    })
}
