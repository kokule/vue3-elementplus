import {
    gamePlatformList,
    gameTypeList,
    gameThemeList,
    dropTypeList,
    rechargeOpenList,
    gameOpenList
} from './dictionary.js'

/*
初始的form 空值
 */
export const basicForm = {
    parent: "", //游戏父id
    name: "", //游戏名
    type: "", //游戏类型
    domain: "chituhuyu.com", //域名
    alias: "", //游戏别名
    gameConfig: {
        extendServer: "", //继承父游戏
        platform: 0, //游戏平台
        gameSubject: "", //游戏题材
        putinType: "", //投放类型
        alias: "", //游戏别名
        appPack: "", //APP包名
        bizid: "", //备案码
        aliasName: "", //显示别名
        coinName: "", //游戏币名
        coinRatio: "", //游戏币汇率
        discountRate: "", //充值折扣
        incomeRatio: "", //游戏分成
        description: "", //游戏描述
        shotDescription: "", //游戏简短描述
        quitPrompt: "", //退出提示
        rank: 0, //排序
        domain: "chituhuyu.com", //域名
        status: "", //游戏开启状态
        payable: "", //充值开启状态
        payCallback: "", //充值回调
        payCallbackKey: "", //登录验证/充值回调密钥
        cp: "", //聚合CP名称
        cpKey: "", //CP密钥
        site: "", //网站地址
        mobileSite: "", //移动网址
        downloadUrl: "", //下载链接
        packSize: "", //下载包大小
        enterUrl: "", //游戏链接
        openidLoginType: "", //仅允许登录openid类型
        // gameTemplate: "", //游戏模板
        step: "", //游戏运营阶段
        whiteListUsername: "", //白名单账号
        payBanArea: "", //屏蔽充值地区
        replaceGameId: "", //替换游戏ID
        noServerMap: "", //取消服务器映射
        noCallbackExpression: "", //不上报表达式
        callbackPayPercent: "", //充值上报比例
        payCallbackExpression: "", //充值上报表达式
        payNoCallbackExpression: "", //充值不上报表达式
        fullMatch: "", //上报匹配全数据
        unionAccount: "", //账户互通(使用unionid)
        registerDisabled: "", //关闭注册
    }
}

export const formArray = [
    {
        key: 'parent',
        width: '80%',
        type: 'treeSelect',
        label: '父游戏',
    },
    {
        key: 'platform',
        type: 'select',
        options: gamePlatformList,
        label: '游戏平台',
    },
    {
        key: 'name',
        label: '游戏名',
    },
    {
        key: 'type',
        type: 'select',
        options: gameTypeList,
        label: '游戏类型',
    },
    {
        key: 'gameSubject',
        type: 'select',
        options: gameThemeList,
        label: '游戏题材',
    },
    {
        key: 'putinType',
        type: 'select',
        label: '投放类型',
    },
    {
        key: 'alias',
        label: '游戏别名',
        tooltip: '英文, 如cq, 唯一标识'
    },
    {
        key: 'appPack',
        label: 'APP包名',
        tooltip: 'com.xx.cs'
    },
    {
        key: 'bizid',
        label: '备案码',
    },
    {
        key: 'aliasName',
        label: '显示别名',
    },
    {
        key: 'coinName',
        label: '游戏币名',
    },
    {
        key: 'coinRatio',
        label: '游戏币汇率',
    },
    {
        key: 'discountRate',
        label: '充值折扣',
    },
    {
        key: 'incomeRatio',
        label: '游戏分成',
        tooltip: '如 0.8, 不大于1'
    },
    {
        key: 'description',
        label: '游戏描述',
    },
    {
        key: 'shotDescription',
        type: 'textarea',
        label: '游戏简短描述',
    },
    {
        key: 'quitPrompt',
        type: 'textarea',
        label: '退出提示',
    },
    {
        key: 'rank',
        label: '排序',
        tooltip: '越大越排前'
    },
    {
        key: 'domain',
        label: '域名',
        type: 'select'
    },
    {
        key: 'status',
        label: '游戏开启状态',
        options: gameOpenList,
        type: 'radio'
    },
    {
        key: 'payable',
        label: '充值开启状态',
        options: rechargeOpenList,
        type: 'radio'
    },
    {
        key: 'payCallback',
        label: '充值回调',
        tooltip: '回调地址，半角字符不要有空格'
    },
    {
        key: 'payCallbackKey',
        labelLineHeight: '18px',
        label: '登录验证/充值回调密钥',
        type: 'buttonInput',
        buttonLabel: '随机生成'
    },
    {
        key: 'cp',
        label: '聚合CP名称',
        tooltip: '如oppo，vivo，一般用于h5聚合'
    },
    {
        key: 'cpKey',
        label: 'CP密钥',
        type: 'buttonInput',
        buttonLabel: '随机生成'
    },
    {
        key: 'site',
        label: '网站地址',
        tooltip: '末尾一定要 /',
        placeholder: 'http://...'
    },
    {
        key: 'mobileSite',
        label: '移动网址',
        tooltip: '末尾一定要 /',
        placeholder: 'http://...'
    },
    {
        key: 'downloadUrl',
        label: '下载链接',
        placeholder: 'http://...'
    },
    {
        key: 'packSize',
        label: '下载包大小',
        placeholder: '如 102M'
    },
    {
        key: 'enterUrl',
        label: '下载链接',
        placeholder: 'http://...'
    },
    {
        key: 'openidLoginType',
        labelLineHeight: '18px',
        label: '仅允许登录openid类型',
        placeholder: '如yyb oppo等'
    },
    {
        key: 'gameTemplate',
        label: '游戏模板',
        type: 'tree-select'
    },
    {
        key: 'step',
        label: '游戏运营阶段',
        type: 'radio'
    },
    {
        key: 'whiteListUsername',
        type: 'textarea',
        label: '白名单账号',
        tooltip: '每行一个'
    },
    {
        key: 'payBanArea',
        type: 'textarea',
        label: '屏蔽充值地区',
        tooltip: '每行一个'
    },
    {
        key: 'replaceGameId',
        type: 'textarea',
        label: '替换游戏ID',
        placeholder: '用于同一个包切换游戏'
    },
    {
        key: 'noServerMap',
        label: '取消服务器映射',
        type: 'radio'
    },
    {
        key: 'noCallbackExpression',
        type: 'textarea',
        label: '不上报表达式',
        placeholder: '可用变量: $rand=概率'
    },
    {
        key: 'callbackPayPercent',
        type: 'textarea',
        label: '充值上报比例',
        tooltip: '纯数字为比例, 也可以填列表: 648=600&328=300',
        placeholder: '纯数字为比例, 也可以填列表: 648=600&328=300'
    },
    {
        key: 'payCallbackExpression',
        type: 'textarea',
        col: 24,
        label: '充值上报表达式',
        tooltip: '可用变量: $pay_times=充值次数, $pay_sum=充值总额, $amount=单笔充值金额, $reg_date=注册日期, $pay_date=充值日期, $rand=概率'
    },
    {
        key: 'payNoCallbackExpression',
        col: 24,
        type: 'textarea',
        labelLineHeight: '18px',
        label: '充值不上报表达式',
        tooltip: '满足条件不上报, $reg_date == $pay_date || $rand < 31, 首日全上报, 后续30%几率上报'
    },
    {
        key: 'fullMatch',
        label: '上报匹配全数据',
        tooltip: '匹配该包所有渠道的用户数据'
    },
    {
        key: 'unionAccount',
        labelLineHeight: '18px',
        label: '账户互通（使用unionid）',
    },
    {
        key: 'registerDisabled',
        label: '关闭注册',
        tooltip: '禁止一键注册, 不禁第三方'
    },
]


export const drawerFormArr = []

