import Layout from '@/layout'

export const operateMenu = [
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
                meta: {title: '游戏管理', activeMenu: '/platform/game-manage', icon: 'star1'}
            },
            {
                path: 'order-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'orderManage',
                meta: {title: '订单管理', activeMenu: '/platform/order-manage', icon: 'star1'}
            },
            {
                path: 'user-search',
                component: () => import('@/views/platform/gameManage'),
                name: 'userSearch',
                meta: {title: '用户查询', activeMenu: '/platform/user-search', icon: 'star1'}
            },
            {
                path: 'wechat-app',
                component: () => import('@/views/platform/gameManage'),
                name: 'wechatApp',
                meta: {title: '微信 APP', activeMenu: '/platform/wechat-app', icon: 'star1'}
            },
            {
                path: 'gift-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'giftManage',
                meta: {title: '礼包管理', activeMenu: '/platform/gift-manage', icon: 'star1'}
            },
            {
                path: 'clear-limit',
                component: () => import('@/views/platform/gameManage'),
                name: 'clearLimit',
                meta: {title: '清除限制', activeMenu: '/platform/clear-limit', icon: 'star1'}
            },
            {
                path: 'login-search',
                component: () => import('@/views/platform/gameManage'),
                name: 'loginSearch',
                meta: {title: '登录查询', activeMenu: '/platform/login-search', icon: 'star1'}
            },
            {
                path: 'user-ban',
                component: () => import('@/views/platform/gameManage'),
                name: 'userBan',
                meta: {title: '用户封禁', activeMenu: '/platform/user-ban', icon: 'star1'}
            },
            {
                path: 'user-info-store',
                component: () => import('@/views/platform/gameManage'),
                name: 'userInfoStore',
                meta: {title: '大户信息库', activeMenu: '/platform/user-info-store', icon: 'star1'}
            },
            {
                path: 'huawei-cloud-msg',
                component: () => import('@/views/platform/gameManage'),
                name: 'huaweiCloudMsg',
                meta: {title: '华为云短信', activeMenu: '/platform/huawei-cloud-msg', icon: 'star1'}
            },
            {
                path: 'server-belong-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'serverBelongManage',
                meta: {title: '区服归属管理', activeMenu: '/platform/server-belong-manage', icon: 'star1'}
            },
            {
                path: 'user-loss-list',
                component: () => import('@/views/platform/gameManage'),
                name: 'userLossList',
                meta: {title: '用户流失列表', activeMenu: '/platform/user-loss-list', icon: 'star1'}
            },
            {
                path: 'user-regress-list',
                component: () => import('@/views/platform/gameManage'),
                name: 'userRegressList',
                meta: {title: '用户回归列表', activeMenu: '/platform/user-regress-list', icon: 'star1'}
            },
            {
                path: 'msg-marketing-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'msgMarketingManage',
                meta: {title: '短信营销管理', activeMenu: '/platform/msg-marketing-manage', icon: 'star1'}
            },
            {
                path: 'ip-imei-handle',
                component: () => import('@/views/platform/gameManage'),
                name: 'ipImeiHandle',
                meta: {title: 'IP/IMEI 批量操作', activeMenu: '/platform/ip-imei-handle', icon: 'star1'}
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
                meta: {title: '数据调用', activeMenu: '/content/data-calling', icon: 'education1'}
            },
            {
                path: 'sub-content-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'subContentManage',
                meta: {title: '内容管理', activeMenu: '/content/sub-content-manage', icon: 'education1'}
            },
            {
                path: 'content-classify',
                component: () => import('@/views/platform/gameManage'),
                name: 'contentClassify',
                meta: {title: '内容分类', activeMenu: '/content/content-classify', icon: 'education1'}
            },
            {
                path: 'model-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'modelManage',
                meta: {title: '模型管理', activeMenu: '/content/model-manage', icon: 'education1'}
            },
            {
                path: 'form-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'formManage',
                meta: {title: '表单管理', activeMenu: '/content/form-manage', icon: 'education1'}
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
                meta: {title: '用户管理', activeMenu: '/system/user-manage', icon: 'system1'}
            },
            {
                path: 'role-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'roleManage',
                meta: {title: '角色管理', activeMenu: '/system/role-manage', icon: 'system1'}
            },
            {
                path: 'menu-manage',
                component: () => import('@/views/platform/gameManage'),
                name: 'menuManage',
                meta: {title: '菜单管理', activeMenu: '/system/menu-manage', icon: 'system1'}
            },
            {
                path: 'recharge-interface',
                component: () => import('@/views/platform/gameManage'),
                name: 'rechargeInterface',
                meta: {title: '充值接口', activeMenu: '/system/recharge-interface', icon: 'system1'}
            },
            {
                path: 'recharge-interface-config',
                component: () => import('@/views/platform/gameManage'),
                name: 'rechargeInterfaceConfig',
                meta: {title: '充值接口配置', activeMenu: '/system/recharge-interface-config', icon: 'system1'}
            },
            {
                path: 'msg-config',
                component: () => import('@/views/platform/gameManage'),
                name: 'msgConfig',
                meta: {title: '短信配置', activeMenu: '/system/msg-config', icon: 'system1'}
            },
            {
                path: 'sdk-config',
                component: () => import('@/views/platform/gameManage'),
                name: 'sdkConfig',
                meta: {title: '聚合SDK配置', activeMenu: '/system/sdk-config', icon: 'system1'}
            },
            {
                path: 'advertisement-config',
                component: () => import('@/views/platform/gameManage'),
                name: 'advertisementConfig',
                meta: {title: '广告回调配置', activeMenu: '/system/advertisement-config', icon: 'system1'}
            },
            {
                path: 'system-config',
                component: () => import('@/views/platform/gameManage'),
                name: 'systemConfig',
                meta: {title: '系统配置', activeMenu: '/system/system-config', icon: 'system1'}
            },
            {
                path: 'redis-handle',
                component: () => import('@/views/platform/gameManage'),
                name: 'redisHandle',
                meta: {title: 'Redis操作', activeMenu: '/system/redis-handle', icon: 'system1'}
            },
            {
                path: 'anti-brushing-config',
                component: () => import('@/views/platform/gameManage'),
                name: 'antiBrushingConfig',
                meta: {title: '防刷设置', activeMenu: '/system/anti-brushing-config', icon: 'system1'}
            },
            {
                path: 'rsa-tool',
                component: () => import('@/views/platform/gameManage'),
                name: 'rsaTool',
                meta: {title: 'RSA工具', activeMenu: '/system/rsa-tool', icon: 'system1'}
            },
            {
                path: 'cdn-config',
                component: () => import('@/views/platform/gameManage'),
                name: 'cdnConfig',
                meta: {title: 'CDN设置', activeMenu: '/system/cdn-config', icon: 'system1'}
            },
            {
                path: 'upload-config',
                component: () => import('@/views/platform/gameManage'),
                name: 'uploadConfig',
                meta: {title: '上传配置', activeMenu: '/system/upload-config', icon: 'system1'}
            },
            {
                path: 'log',
                component: () => import('@/views/platform/gameManage'),
                name: 'Log',
                meta: {title: '日志', activeMenu: '/system/log', icon: 'system1'}
            },
            {
                path: 'anti-addiction-config',
                component: () => import('@/views/platform/gameManage'),
                name: 'antiAddictionConfig',
                meta: {title: '防沉迷设置', activeMenu: '/system/anti-addiction-config', icon: 'system1'}
            },
            {
                path: 'test',
                component: () => import('@/views/platform/gameManage'),
                name: 'test',
                meta: {title: '测试', activeMenu: '/system/test', icon: 'system1'}
            },
            {
                path: 'oaid-certificate',
                component: () => import('@/views/platform/gameManage'),
                name: 'oaidCertificate',
                meta: {title: 'OAID证书', activeMenu: '/system/oaid-certificate', icon: 'system1'}
            },
        ]
    },
]