import request from '@/utils/request'

/**
 * 获取综合充值列表
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
