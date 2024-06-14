<script lang="ts" setup>
import type { Admin } from '@prisma/client'
import type { CheckboxValueType, FormInstance } from 'element-plus'

const emits = defineEmits<{
    update: []
}>()

const { adminRoutes } = useAdminMenuState()

const visible = ref(false)

const radio1 = ref('Option 1')
const operate = ref<DialogOperate>()
const comData = computed(() => {
    if (operate.value === 'add') return { title: '新增用户' }
    return { title: '修改用户' }
})
const formRef = ref<FormInstance>()
const form = reactive({
    data: {
        id: 0,
        account: '',
        password: '',
        name: '',
        email: '',
        // password_confirmation:'',
        role: 1,
        phone: '',
        status: 1, // 1:启用 0:禁用
    },
})

const rules = reactive({
    name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    email: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    password_confirmation: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
})

interface IPermissionRouteData {
    title: string // 菜单名称
    name: string // 路由名
    path: string // 菜单路径
    permissionList?: {
        // Record<PermissionType,string>
        [K in PermissionType]?: string
    }// 页面所有权限功能数据
    permissionCode?: PermissionType[] // 允许的权限码
    checkAll?: boolean // 全选
    checkHalf?: boolean // 半选
    checkPage?: boolean // 页面权限
}
const tableData = reactive<CoTableProps<IPermissionRouteData>>({
    data: [],
    tableHeader: [
        { property: 'title', label: '页面名称', width: '130' },
        { property: 'permissionCode', label: '权限设置', minWidth: '150' },
    ],
    pagination: {
        ...paginationConfig,
        total: 0,
    },
    isTool: false,
})

// 全选事件
const permissionCheckAllChange = (value: CheckboxValueType, row: IPermissionRouteData) => {
    const keys = Object.keys(row.permissionList || {}) as PermissionType[]
    row.permissionCode = value ? keys : []
    row.checkHalf = false
}

// 半选事件
const permissionCheckChange = (value: CheckboxValueType[], row: IPermissionRouteData) => {
    const checkedCount = value.length
    const keys = Object.keys(row.permissionList || {}) as PermissionType[]
    row.checkAll = checkedCount === keys.length
    row.checkHalf = checkedCount > 0 && checkedCount < keys.length

}
const tableRowClassName = ({
    row,
    rowIndex,
}: {
    row: IPermissionRouteData
    rowIndex: number
}) => {
    if (row.checkPage) return 'bg-[--el-color-primary-light-9]!'

    return 'opacity-70'
}

const openModal = (type: DialogOperate, row?: Admin) => {
    operate.value = type
    if (type === 'edit') {
        console.log(row)
        form.data.account = row?.account || ''
        form.data.password = ''
        form.data.name = row?.username || ''
        form.data.status = row?.status ? 1 : 0
        form.data.id = row?.id || 0
        const permission = JSON.parse(row?.permission || '{}')
        tableData.data = adminRoutes.value.map((item) => {
            // console.log(item)
            const key = item.name as string
            const permissionList = item.meta.permissionList || {}
            const permissionListKeys = Object.keys(permissionList)
            const permissionCode = permission[key] ?? []
            const dat: IPermissionRouteData = {
                title: item.meta.title || '',
                name: key,
                path: item.path,
                permissionList,
                permissionCode,
                checkPage: key in permission,
                checkAll: permissionListKeys.length > 0 && permissionListKeys.length === permissionCode.length,
                checkHalf: permissionListKeys.length > permissionCode.length,
            }
            return dat
        })
        console.log(tableData.data)
    } else {
        console.log(111)
        tableData.data = adminRoutes.value.map((item) => {
            const key = item.name as string
            const dat: IPermissionRouteData = {
                title: item.meta.title || '',
                name: key,
                path: item.path,
                permissionList: item.meta.permissionList || {},
                permissionCode: [],
            }
            return dat
        })
        console.log(tableData.data)
    }
    visible.value = true
}

const closeModal = () => {
    visible.value = false
}

// 取消
const onCancel = () => {
    visible.value = false
}

const [ApiFunc, btnLoading] = useLoadingSubmit()
// 确定
const onConfirm = useThrottleFn(async () => {
    const isVerify = await useFormVerify(formRef.value)
    if (!isVerify) return

    // 获取上级菜单ID数组
    // const arr = cascaderRef.value?.cascaderRef?.getCheckedNodes(false)
    // const idsArr = arr?.[0]?.pathValues || []

    // const data: SystemMenuAdd = {
    //     menuType: form.data.menuType, // 菜单类型'menu' or 'btn'
    //     // menuPid: form.data.menuPid as number,
    //     menuPid: idsArr.join(','),
    //     // name: form.data.name,
    //     component: form.data.component,
    //     sort: form.data.sort,
    //     path: form.data.path,
    //     redirect: form.data.redirect,
    //     title: form.data.title,
    //     icon: form.data.icon,
    //     isHide: form.data.isHide,
    //     isKeepAlive: form.data.isKeepAlive,
    //     isAffix: form.data.isAffix,
    //     isLink: form.data.isLink,
    //     linkUrl: form.data.linkUrl,
    //     isIframe: form.data.isIframe,
    //     // roles: formData.roles,
    // }
    // // 类型为按钮时
    // if (form.data.menuType === 2) {
    //     data.component = ''
    //     data.path = ''
    // }

    // // console.log(data)
    // if (operate.value === 'add') {
    //     const res = await ApiFunc(ApiMenu.add(data))
    //     if (res.code !== 200) return ElMessage.error(res.msg)
    //     ElMessage.success('添加成功')
    // } else if (operate.value === 'edit') {
    //     const param: SystemMenuEdit = {
    //         ...data,
    //         id: form.data.id,
    //     }
    //     const res = await ApiFunc(ApiMenu.edit(param))
    //     if (res.code !== 200) return ElMessage.error(res.msg)
    //     ElMessage.success('修改成功')
    // }

    emits('update') // 更新列表
    onCancel()
}, 800)

watchEffect(() => {
    console.log(tableData)
})

defineExpose({
    openModal,
    closeModal,
})
</script>

<template>
    <CoDrawer v-model="visible" :title="comData.title" :loading="btnLoading" size="50%" @cancel="onCancel"
        @confirm="onConfirm">
        <el-form ref="formRef" :model="form.data" :rules="rules" label-width="100px">
            <el-form-item label="登录账号:" prop="account">
                <el-input v-model="form.data.account" placeholder="请输入登录账号" maxlength="20" clearable
                    :disabled="operate === 'edit'" />
            </el-form-item>

            <el-form-item label="登录密码:" prop="password">
                <el-input v-model="form.data.password" placeholder="" maxlength="20" type="password" clearable
                    show-password />
            </el-form-item>

            <el-form-item label="账户名称:" prop="name">
                <el-input v-model="form.data.name" placeholder="请输入账户名称" maxlength="30" clearable />
            </el-form-item>
            <el-form-item label="角色名称:" prop="role">
                <el-radio-group v-model="form.data.role">
                    <el-radio label="超级管理员" :value="1" />
                    <el-radio label="管理员" :value="2" />
                    <el-radio label="普通用户" :value="3" />
                </el-radio-group>
            </el-form-item>

            <el-form-item label="页面配置:">
                <CoTable v-model:option="tableData" class="w100%" :row-class-name="tableRowClassName" auto-height
                    border>
                    <template #title="{ row }">
                        <el-checkbox v-model="row.checkPage">
                            {{ row.title }}
                        </el-checkbox>
                    </template>
                    <template #permissionCode="{ row }">
                        <div v-if="Object.keys(row.permissionList || {}).length" class="check-box flex flex-wrap">
                            <el-checkbox v-model="row.checkAll" :indeterminate="row.checkHalf"
                                @change="e => permissionCheckAllChange(e, row)">
                                全选
                            </el-checkbox>
                            <el-checkbox-group v-model="row.permissionCode"
                                @change="e => permissionCheckChange(e, row)">
                                <el-checkbox v-for="(item, index) in row.permissionList" :key="index" :label="item"
                                    :value="index">
                                    {{ item }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </template>
                </CoTable>
            </el-form-item>

            <el-form-item label="员工状态:">
                <el-switch v-model="form.data.status" inline-prompt active-text="启" inactive-text="禁" :active-value="1"
                    :inactive-value="0" />
            </el-form-item>
        </el-form>
    </CoDrawer>
</template>

<style lang="scss" scoped>
.check-box {
    >.el-checkbox {
        margin-right: 15px;
    }

    :deep(.el-checkbox-group) {
        .el-checkbox {
            margin-right: 0;

            +.el-checkbox {
                margin-left: 15px;
            }
        }
    }
}
</style>
