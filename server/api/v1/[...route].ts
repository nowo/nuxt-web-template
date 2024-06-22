import { createRouter, defineEventHandler, useBase } from 'h3'
import { setDeleteFile, setSaveFile } from '~~/server/controller/common'
import { getAdminInfo, getAdminList, setAdminCreate, setAdminDelete, setAdminUpdate, setLoginSign, setPasswordUpdate, setRegister } from '~~/server/controller/admin'
import { getSystemInfo, setSystemInfo } from '~~/server/controller/system'
import { getMenuList, setMenuCreate, setMenuDelete, setMenuUpdate } from '~~/server/controller/menu'
import { getProductList, setProductCreate, setProductDelete, setProductUpdate } from '~~/server/controller/product'

const router = createRouter()

router.use('/file/upload', setSaveFile) // 文件上传保存
router.use('/file/delete', setDeleteFile) // 文件删除

router.use('/login', setLoginSign) // 用户登录
router.use('/signup', setRegister) // 用户注册
router.use('/password', setPasswordUpdate) // 修改密码
router.use('/user/info', getAdminInfo) // 用户登录账户信息

router.use('/system/info', getSystemInfo) // 获取系统信息
router.use('/system/edit', setSystemInfo) // 修改系统信息

router.use('/admin/list', getAdminList) // 用户列表
router.use('/admin/add', setAdminCreate) // 添加用户
router.use('/admin/edit', setAdminUpdate) // 修改用户
router.use('/admin/delete', setAdminDelete) // 删除用户

router.use('/menu/list', getMenuList) // 菜单列表
router.use('/menu/add', setMenuCreate) // 添加菜单
router.use('/menu/edit', setMenuUpdate) // 修改菜单
router.use('/menu/delete', setMenuDelete) // 删除菜单


router.use('/product/list', getProductList) // 产品列表
router.use('/product/add', setProductCreate) // 添加产品
router.use('/product/edit', setProductUpdate) // 修改产品
router.use('/product/delete', setProductDelete) // 删除产品

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
