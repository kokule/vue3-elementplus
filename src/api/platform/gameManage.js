import request from '@/utils/request'

/**
 * 获取游戏列表
 * @param data
 * @returns {*}
 */
export function getGameList(data) {
    return request({
        url: '/game/list',
        method: 'post',
        data
    })
}
/**
 * 获取游戏下拉列表
 * @param data
 * @returns {*}
 */
export function getGameSelectList() {
    return request({
        url: '/game/getGameList',
        method: 'get'
    })
}
/**
 * 游戏添加
 * @param data
 * @returns {*}
 */
export function addGame(data) {
    return request({
        url: '/game/add',
        method: 'post',
        data
    })
}
/**
 * 游戏更新
 * @param data
 * @returns {*}
 */
export function updateGame(data) {
    return request({
        url: '/game/update',
        method: 'post',
        data
    })
}

/**
 * 获取游戏详情
 * @param id 游戏id
 * @returns {*}
 */
export function getGameDetail(id) {
    return request({
        url: `/game/findById/${id}`,
        method: 'get',
    })
}