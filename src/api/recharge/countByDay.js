import request from '@/utils/request'

/**
 * 获取充值按日统计列表
 * @param data
 * @returns {*}
 */
export function getCountByDayList(data) {
    return request({
        url: '/comprehensive/day_pay_list',
        method: 'post',
        data
    })
}
