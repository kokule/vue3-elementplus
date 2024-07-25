import Layout from "@/layout/index.vue";

export const investMenu = [
    {
        path: '/channel',
        component: Layout,
        hidden: false,
        permissions: ['channel:user:edit'],
        meta: {title: '渠道', activeMenu: '/channel', icon: 'star'},
        children: [
            {
                name: 'channelManage',
                path: 'channel-manage',
                component: () => import('@/views/platform/gameManage/index.vue'),
                meta: {title: '渠道管理', activeMenu: '/channel/channel-manage', icon: 'star1'}
            },
            {
                name: 'channelTypeManage',
                path: 'channel-type-manage',
                component: () => import('@/views/platform/gameManage/index.vue'),
                meta: {title: '渠道类型管理', activeMenu: '/channel/channel-type-manage', icon: 'star1'}
            }
        ]
    },

]