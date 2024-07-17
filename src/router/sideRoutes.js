import Layout from '@/layout'

export const sideMenuRoutes = [
    {
        path: '/platform',
        component: Layout,
        hidden: false,
        permissions: ['platform:user:edit'],
        meta: {title: '平台管理', activeMenu: '/platform/game', icon: 'star'},
        children: [
            {
                path: 'game-manage',
                component: () => import('@/views/platform/gameManage/index.vue'),
                name: 'gameManage2',
                meta: {title: '游戏管理', activeMenu: '/platform/game', icon: 'star1'}
            },
            {
                path: 'order-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'orderManage',
                meta: {title: '订单管理', activeMenu: '/system/game', icon: 'star1'}
            },
            {
                path: 'user-search',
                component: () => import('@/views/platform/gameManage'),
                name: 'userSearch',
                meta: {title: '用户查询', activeMenu: '/system/game', icon: 'star1'}
            },
            {
                path: 'wechat-app',
                component: () => import('@/views/platform/gameManage'),
                name: 'wechatApp',
                meta: {title: '微信 APP', activeMenu: '/system/game', icon: 'star1'}
            },
            {
                path: 'gift-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'giftManage',
                meta: {title: '礼包管理', activeMenu: '/system/game', icon: 'star1'}
            },
            {
                path: 'clear-limit',
                component: () => import('@/views/platform/gameManage'),
                name: 'clearLimit',
                meta: {title: '清除限制', activeMenu: '/system/game', icon: 'star1'}
            },
            {
                path: 'login-search',
                component: () => import('@/views/platform/gameManage'),
                name: 'loginSearch',
                meta: {title: '登录查询', activeMenu: '/system/game', icon: 'star1'}
            },
            {
                path: 'user-ban',
                component: () => import('@/views/platform/gameManage'),
                name: 'userBan',
                meta: {title: '用户封禁', activeMenu: '/system/game', icon: 'star1'}
            },
            {
                path: 'user-info-store',
                component: () => import('@/views/platform/gameManage'),
                name: 'userInfoStore',
                meta: {title: '大户信息库', activeMenu: '/system/game', icon: 'star1'}
            },
            {
                path: 'huawei-cloud-msg',
                component: () => import('@/views/platform/gameManage'),
                name: 'huaweiCloudMsg',
                meta: {title: '华为云短信', activeMenu: '/system/game', icon: 'star1'}
            },
            {
                path: 'server-belong-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'serverBelongManage',
                meta: {title: '区服归属管理', activeMenu: '/system/game', icon: 'star1'}
            },
            {
                path: 'user-loss-list',
                component: () => import('@/views/platform/gameManage'),
                name: 'userLossList',
                meta: {title: '用户流失列表', activeMenu: '/system/game', icon: 'star1'}
            },
            {
                path: 'user-regress-list',
                component: () => import('@/views/platform/gameManage'),
                name: 'userRegressList',
                meta: {title: '用户回归列表', activeMenu: '/system/game', icon: 'star1'}
            },
            {
                path: 'msg-marketing-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'msgMarketingManage',
                meta: {title: '短信营销管理', activeMenu: '/system/game', icon: 'star1'}
            },
            {
                path: 'ip-imei-handle',
                component: () => import('@/views/platform/gameManage'),
                name: 'ipImeiHandle',
                meta: {title: 'IP/IMEI 批量操作', activeMenu: '/system/game', icon: 'star1'}
            },
        ]
    },
    {
        path: '/content',
        component: Layout,
        hidden: false,
        permissions: ['platform:user:edit'],
        meta: {title: '内容管理', activeMenu: '/platform/game', icon: 'education'},
        children: [
            {
                path: 'data-calling',
                component: () => import('@/views/platform/gameManage'),
                name: 'dataCalling',
                meta: {title: '数据调用', activeMenu: '/system/game', icon: 'education1'}
            },
            {
                path: 'sub-content-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'subContentManage',
                meta: {title: '内容管理', activeMenu: '/system/game', icon: 'education1'}
            },
            {
                path: 'content-classify',
                component: () => import('@/views/platform/gameManage'),
                name: 'contentClassify',
                meta: {title: '内容分类', activeMenu: '/system/game', icon: 'education1'}
            },
            {
                path: 'model-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'modelManage',
                meta: {title: '模型管理', activeMenu: '/system/game', icon: 'education1'}
            },
            {
                path: 'form-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'formManage',
                meta: {title: '表单管理', activeMenu: '/system/game', icon: 'education1'}
            },
        ]
    },
    {
        path: '/system',
        component: Layout,
        hidden: false,
        permissions: ['platform:user:edit'],
        meta: {title: '系统', activeMenu: '/platform/game', icon: 'system'},
        children: [
            {
                path: 'user-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'userManage',
                meta: {title: '用户管理', activeMenu: '/system/game', icon: 'system1'}
            },
            {
                path: 'role-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'roleManage',
                meta: {title: '角色管理', activeMenu: '/system/game', icon: 'system1'}
            },
            {
                path: 'menu-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'menuManage',
                meta: {title: '菜单管理', activeMenu: '/system/game', icon: 'system1'}
            },
            {
                path: 'recharge-interface',
                component: () => import('@/views/platform/gameManage'),
                name: 'rechargeInterface',
                meta: {title: '充值接口', activeMenu: '/system/game', icon: 'system1'}
            },
            {
                path: 'recharge-interface-config',
                component: () => import('@/views/platform/gameManage'),
                name: 'rechargeInterfaceConfig',
                meta: {title: '充值接口配置', activeMenu: '/system/game', icon: 'system1'}
            },
            {
                path: 'msg-config',
                component: () => import('@/views/platform/gameManage'),
                name: 'msgConfig',
                meta: {title: '短信配置', activeMenu: '/system/game', icon: 'system1'}
            },
            {
                path: 'sdk-config',
                component: () => import('@/views/platform/gameManage'),
                name: 'sdkConfig',
                meta: {title: '聚合SDK配置', activeMenu: '/system/game', icon: 'system1'}
            },
            {
                path: 'advertisement-config',
                component: () => import('@/views/platform/gameManage'),
                name: 'advertisementConfig',
                meta: {title: '广告回调配置', activeMenu: '/system/game', icon: 'system1'}
            },
            {
                path: 'system-config',
                component: () => import('@/views/platform/gameManage'),
                name: 'systemConfig',
                meta: {title: '系统配置', activeMenu: '/system/game', icon: 'system1'}
            },
            {
                path: 'redis-handle',
                component: () => import('@/views/platform/gameManage'),
                name: 'redisHandle',
                meta: {title: 'Redis操作', activeMenu: '/system/game', icon: 'system1'}
            },
            {
                path: 'anti-brushing-config',
                component: () => import('@/views/platform/gameManage'),
                name: 'antiBrushingConfig',
                meta: {title: '防刷设置', activeMenu: '/system/game', icon: 'system1'}
            },
            {
                path: 'rsa-tool',
                component: () => import('@/views/platform/gameManage'),
                name: 'rsaTool',
                meta: {title: 'RSA工具', activeMenu: '/system/game', icon: 'system1'}
            },
            {
                path: 'cdn-config',
                component: () => import('@/views/platform/gameManage'),
                name: 'cdnConfig',
                meta: {title: 'CDN设置', activeMenu: '/system/game', icon: 'system1'}
            },
            {
                path: 'upload-config',
                component: () => import('@/views/platform/gameManage'),
                name: 'uploadConfig',
                meta: {title: '上传配置', activeMenu: '/system/game', icon: 'system1'}
            },
            {
                path: 'log',
                component: () => import('@/views/platform/gameManage'),
                name: 'Log',
                meta: {title: '日志', activeMenu: '/system/game', icon: 'system1'}
            },
            {
                path: 'anti-addiction-config',
                component: () => import('@/views/platform/gameManage'),
                name: 'antiAddictionConfig',
                meta: {title: '防沉迷设置', activeMenu: '/system/game', icon: 'system1'}
            },
            {
                path: 'test',
                component: () => import('@/views/platform/gameManage'),
                name: 'test',
                meta: {title: '测试', activeMenu: '/system/game', icon: 'system1'}
            },
            {
                path: 'oaid-certificate',
                component: () => import('@/views/platform/gameManage'),
                name: 'oaidCertificate',
                meta: {title: 'OAID证书', activeMenu: '/system/game', icon: 'system1'}
            },
        ]
    },
    {
        path: '/recharge',
        component: Layout,
        hidden: false,
        permissions: ['recharge:user:edit'],
        meta: {title: '充值统计', activeMenu: '/recharge', icon: 'money'},
        children: [
            {
                path: 'comprehensive-recharge',
                component: () => import('@/views/recharge/comprehensiveRecharge'),
                name: 'comprehensiveRecharge',
                meta: {title: '综合充值', activeMenu: '/recharge/comprehensiveRecharge', icon: 'education1'}
            },
            {
                path: 'count-by-day',
                component: () => import('@/views/platform/gameManage'),
                name: 'countByDay',
                meta: {title: '数据按日统计', activeMenu: '/system/game', icon: 'education1'}
            },
            {
                path: 'count-by-server',
                component: () => import('@/views/recharge/countByServer'),
                name: 'countByServer',
                meta: {title: '充值按区服统计', activeMenu: '/recharge/countByServer', icon: 'education1'}
            },
        ]
    }
]