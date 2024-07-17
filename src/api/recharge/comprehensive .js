import request from '@/utils/request'

/**
 * 获取综合充值列表
 * @param data
 * @returns {*}
 */
export function getComprehensiveList(data) {
    return request({
        url: '/comprehensive/pay_list',
        method: 'post',
        data
    })
}

/**
 * 获取渠道下拉列表
 * @param data
 * @returns {*}
 */
export function getChannelSelectList(data) {
    return request({
        url: '/channel/channelTypeSelectList',
        method: 'post',
        data
    })
}