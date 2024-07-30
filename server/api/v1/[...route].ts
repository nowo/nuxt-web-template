import { createRouter, defineEventHandler, useBase } from 'h3'
import { setDeleteFile, setSaveFile } from '~~/server/controller/common'
import { getAdminInfo, getAdminList, setAdminCreate, setAdminDelete, setAdminUpdate, setLoginSign, setPasswordUpdate, setRegister } from '~~/server/controller/admin'
import { getSystemInfo, setSystemInfo } from '~~/server/controller/system'
import { getMenuList, setMenuCreate, setMenuDelete, setMenuUpdate } from '~~/server/controller/menu'
import { getProductList, setProductCreate, setProductDelete, setProductUpdate } from '~~/server/controller/product'
import { getModelList } from '~~/server/controller/model'
import { getOtherInfo, setOtherUpdate } from '~~/server/controller/other'
import { getMessageList, setMessageCreate, setMessageDelete, setMessageUpdate } from '~~/server/controller/message'

const router = createRouter()

router.use('/model/list', getModelList) // 获取模型列表

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

router.use('/other/info', getOtherInfo) // 获取其他信息
router.use('/other/update', setOtherUpdate) // 修改其他信息

router.use('/message/list', getMessageList) // 留言列表
router.use('/message/add', setMessageCreate) // 添加留言
router.use('/message/edit', setMessageUpdate) // 修改留言
router.use('/message/delete', setMessageDelete) // 删除留言



export default useBase('/api/v1', router.handler)
