import { createRouter, defineEventHandler, useBase } from 'h3'
import { setDeleteFile, setSaveFile } from '../../controller/common'
import { setLoginSign } from '../../controller/admin'
import { getSystemInfo, setSystemInfo } from '../../controller/system'

const router = createRouter()

router.use('/file/upload', setSaveFile) // 文件上传保存
router.use('/file/delete', setDeleteFile) // 文件删除

router.use('/login', setLoginSign) // 用户登录
router.use('/logon', setLoginSign) // 用户注册
router.use('/password', setLoginSign) // 修改密码

router.use('/system/info', getSystemInfo) // 获取系统信息
router.use('/system/edit', setSystemInfo) // 修改系统信息

/**
 * 获取所有菜单信息
 */
router.use('/list', defineEventHandler(async (event) => {
    const list = [
        {
            // id: 1,
            name: 'home',
            path: '/home',
            // icon: 'home',
            children: [
                {
                    id: 11,
                    name: '首页',
                    path: '/home',
                    icon: 'home',
                },
            ],
        },
        {
            path: '/system',
            name: 'system',
            meta: {
                layout: 'classic',
                title: '系统设置',
            },
            props: {
                default: false,
            },
            children: [
                {
                    path: '/system/info',
                    name: 'info',
                    meta: {
                        title: '系统信息',
                    },
                    props: {
                        default: false,
                    },
                },
            ],
            instances: {},
            leaveGuards: {},
            updateGuards: {},
            enterCallbacks: {},
            components: {},
        },
    ]

    return list
}))

/**
 * 获取用户权限菜单
 */
router.use('/auth', defineEventHandler(async (event) => {
    const list = [
        {
            // id: 1,
            name: 'index',
            path: '/',
            // icon: 'home',
            redirect: '/home',
            meta: {
                title: '首页',
                icon: 'i-ep-home-filled',
            },
            children: [
                {
                    name: '首页',
                    path: '/home',
                    meta: {
                        title: '首页',
                        icon: 'i-ep-home-filled',
                    },
                },
            ],
        },
        {
            path: '/system',
            name: 'system',
            meta: {
                layout: 'classic',
                title: '系统设置',
            },
            props: {
                default: false,
            },
            children: [
                {
                    path: '/system/info',
                    name: 'info',
                    meta: {
                        title: '系统信息',
                    },
                    props: {
                        default: false,
                    },
                },
            ],
            instances: {},
            leaveGuards: {},
            updateGuards: {},
            enterCallbacks: {},
            components: {},
        },
    ]

    return list
}))

const startAt = Date.now()
let count = 0

router.use('/pageview', defineEventHandler(async (event) => {
    return {
        pageview: count++,
        startAt,
    }
}))

export default useBase('/api/v1', router.handler)
