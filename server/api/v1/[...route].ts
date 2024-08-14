import { createRouter, defineEventHandler, useBase } from 'h3'
import { getVerifyCode, setDeleteFile, setSaveFile,setFileUpload } from '~~/server/controller/common'
import { getAdminInfo, getAdminList, setAdminCreate, setAdminDelete, setAdminUpdate, setLoginSign, setPasswordUpdate, setRegister } from '~~/server/controller/admin'
import { getSystemInfo, setSystemInfo } from '~~/server/controller/system'
import { getMenuList, setMenuCreate, setMenuDelete, setMenuUpdate } from '~~/server/controller/menu'
import { getProductList, setProductCreate, setProductDelete, setProductUpdate } from '~~/server/controller/product'
import { getNewsList, setNewsCreate, setNewsDelete, setNewsUpdate,getNewsInfo } from '~~/server/controller/news'
import { getModelList } from '~~/server/controller/model'
import { getOtherInfo, setOtherUpdate } from '~~/server/controller/other'
import { getMessageList, setMessageCreate, setMessageDelete, setMessageUpdate } from '~~/server/controller/message'
import { getLinkList, setLinkCreate, setLinkDelete, setLinkUpdate } from '~~/server/controller/link'
import { getConfigInfo, setConfigUpdate } from '~~/server/controller/config'

const router = createRouter()

router.use('/model/list', getModelList) // 获取模型列表

router.use('/file/upload', setSaveFile) // 文件上传保存
router.use('/file/delete', setDeleteFile) // 文件删除

router.use('/common/upload', setFileUpload) // 文件上传
router.use('/common/code', getVerifyCode) // 获取验证码

router.use('/login', setLoginSign) // 用户登录
router.use('/signup', setRegister) // 用户注册
router.use('/password', setPasswordUpdate) // 修改密码
router.use('/user/info', getAdminInfo) // 用户登录账户信息

router.use('/system/info', getSystemInfo) // 获取系统信息
router.use('/system/edit', setSystemInfo) // 修改系统信息

router.use('/config/info', getConfigInfo) // 获取配置信息
router.use('/config/update', setConfigUpdate) // 修改配置信息

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


router.use('/news/list', getNewsList) // 新闻列表
router.use('/news/add', setNewsCreate) // 添加新闻
router.use('/news/edit', setNewsUpdate) // 修改新闻
router.use('/news/delete', setNewsDelete) // 删除新闻

router.use('/other/info', getOtherInfo) // 获取其他信息
router.use('/other/update', setOtherUpdate) // 修改其他信息

router.use('/message/list', getMessageList) // 留言列表
router.use('/message/add', setMessageCreate) // 添加留言
router.use('/message/edit', setMessageUpdate) // 修改留言
router.use('/message/delete', setMessageDelete) // 删除留言

router.use('/link/list', getLinkList) // 链接列表
router.use('/link/add', setLinkCreate) // 添加链接
router.use('/link/edit', setLinkUpdate) // 修改链接
router.use('/link/delete', setLinkDelete) // 删除链接



export default useBase('/api/v1', router.handler)
