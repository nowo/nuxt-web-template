<script lang="ts" setup>
import type { Admin, Prisma } from '@prisma/client'
import type { CheckboxValueType, FormInstance, FormRules } from 'element-plus'


const props = defineProps<{
    // type: number
    title: string
    list: any[]
}>()

const emits = defineEmits<{
    update: []
}>()

const { adminRoutes } = useAdminMenuState()
const { userInfo, setUserInfo } = useUserState()

const lang = ref<LanguageType>('cn')
const visible = ref(false)

const operate = ref<DialogOperate>()
const comData = computed(() => {
    if (operate.value === 'add') return { title: '新增用户' }
    return { title: '修改用户' }
})
const formRef = ref<FormInstance>()
const form = reactive({
    data: {
        id: 0,
        title: '',
        title_en: '',
        name: '',
        email: '',
        // password_confirmation:'',
        role: 1,
        phone: '',
        status: 1, // 1:启用 0:禁用
        type: '',
        describe: '',
        describe_en: '',
        content: '',
        content_en: '',
        img: [] as string[],
        sort: 1
    },
})

const rules = reactive<FormRules>({
    account: [
        { required: true, message: '必填项不能为空' },
        { pattern: /^[0-9a-z]+$/i, message: '只能输入数字和英文' },
        { min: 2, max: 16, message: '最少2个,最多16个字符' },
    ],
    name: [
        { required: true, message: '必填项不能为空', whitespace: true },

    ],
    // email: [
    //     { required: true, message: 'Please input Activity name' },
    //     { min: 3, max: 5, message: 'Length should be 3 to 5' },
    // ],
    password: [
        { required: true, message: '必填项不能为空', whitespace: true },
        { pattern: /^[^\u4E00-\u9FA5 ]{6,16}$/, message: '不含有中文和空格,至少6位,最多16位' },
    ],
    role: [
        { required: true, message: '必填项不能为空' },

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
    // if (type === 'edit') {
    //     // console.log(row)
    //     form.data.account = row?.account || ''
    //     form.data.password = ''
    //     form.data.name = row?.username || ''
    //     form.data.status = row?.status ? 1 : 0
    //     form.data.role = row?.role || 3
    //     form.data.id = row?.id || 0
    //     const permission = JSON.parse(row?.permission || '[]') as { name: string, permission: PermissionType[] }[]
    //     // console.log(permission)
    //     tableData.data = adminRoutes.value.map((item) => {
    //         // console.log(item)
    //         const key = item.name as string
    //         const permissionList = item.meta.permissionList || {}
    //         const permissionListKeys = Object.keys(permissionList)
    //         const permissionNode = permission.find(i => i.name === key)
    //         const permissionCode = permissionNode?.permission ?? []

    //         const dat: IPermissionRouteData = {
    //             title: item.meta.title || '',
    //             name: key,
    //             path: item.path,
    //             permissionList,
    //             permissionCode,
    //             checkPage: !!permissionNode,
    //             checkAll: permissionListKeys.length > 0 && permissionListKeys.length === permissionCode.length,
    //             checkHalf: permissionListKeys.length > permissionCode.length,
    //         }
    //         return dat
    //     })
    // } else {
    //     form.data.account = ''
    //     form.data.password = ''
    //     form.data.name = ''
    //     form.data.status = 1
    //     form.data.role = 3
    //     form.data.id = 0
    //     tableData.data = adminRoutes.value.map((item) => {
    //         const key = item.name as string
    //         const dat: IPermissionRouteData = {
    //             title: item.meta.title || '',
    //             name: key,
    //             path: item.path,
    //             permissionList: item.meta.permissionList || {},
    //             permissionCode: [],
    //         }
    //         return dat
    //     })
    //     // console.log(tableData.data)
    // }
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

    // const list = tableData.data.filter(item => item.checkPage).map((item) => {
    //     return {
    //         name: item.name,
    //         permission: item.permissionCode || [],
    //     }
    // })

    // const data: Prisma.ProductUncheckedCreateInput = {
    //     account: form.data.account?.trim() ?? '',
    //     username: form.data.name?.trim() ?? '',
    //     password: form.data.password?.trim() ?? '',
    //     role: form.data.role || 3,
    //     permission: JSON.stringify(list),
    //     status: form.data.status || 1,
    // }

    // // // console.log(data)
    // if (operate.value === 'add') {
    //     const res = await ApiFunc(useServerFetch('/api/v1/product/add', {
    //         method: 'POST',
    //         body: data,
    //     }))
    //     if (res.code !== 200) return ElMessage.error(res.msg)
    //     ElMessage.success('添加成功')
    // } else if (operate.value === 'edit') {
    //     const param = {
    //         ...data,
    //         id: form.data.id,
    //     }
    //     const res = await ApiFunc(useServerFetch('/api/v1/admin/edit', {
    //         method: 'POST',
    //         body: param,
    //     }))
    //     if (res.code !== 200) return ElMessage.error(res.msg)
    //     ElMessage.success('修改成功')
    //     // 修改的用户是自己本身时，重新获取用户信息
    //     if (userInfo.value.id === form.data.id) await setUserInfo()
    // }

    emits('update') // 更新列表
    onCancel()
}, 800)

defineExpose({
    openModal,
    closeModal,
})
</script>

<template>
    <CoDrawer v-model="visible" :title="comData.title" :loading="btnLoading" :width="{ lg: 50, md: 75, sm: 80 }"
        @cancel="onCancel" @confirm="onConfirm">
        <el-form ref="formRef" :model="form.data" :rules="rules" label-width="110px">
            <el-tabs v-model="lang" class="-mt10px">
                <el-tab-pane label="中文" name="cn" />
                <el-tab-pane label="英文" name="en" />
            </el-tabs>

            <el-form-item v-if="lang === 'cn'" label="标题" prop="title">
                <el-input v-model="form.data.title" maxlength="20" placeholder="请输入标题" clearable />
            </el-form-item>
            <el-form-item v-else-if="lang === 'en'" label="英文标题" prop="title_en">
                <el-input v-model="form.data.title_en" maxlength="50" placeholder="请输入英文标题" clearable />
            </el-form-item>

            <!-- <el-form-item v-if="lang === 'cn'" label="副标题" prop="sub_title">
                <el-input v-model="form.data.sub_title" maxlength="20" placeholder="请输入副标题" clearable />
            </el-form-item>
            <el-form-item v-else-if="lang === 'en'" label="英文副标题" prop="sub_title_en">
                <el-input v-model="form.data.sub_title_en" maxlength="50" placeholder="请输入英文副标题" clearable />
            </el-form-item> -->

            <!-- <el-form-item label="发布者" prop="author">
                <el-input v-model="form.data.author" maxlength="30" placeholder="请输入名称" clearable />
            </el-form-item> -->
            <el-form-item label="商品分类" prop="type">
                <!-- <el-select v-model="form.data.type" clearable filterable>
                    <el-option v-for="item in props.list" :key="item.id" :label="item.title" :value="item.id" />
                </el-select> -->
                <CoCascader v-model="form.data.type" :options="props.list"
                    :props="{ label: 'title', value: 'id', checkStrictly: true, emitPath: false }" filterable clearable
                    class="w100%" />
            </el-form-item>
            <el-form-item :label="`${props.title}图片`" prop="img">
                <!-- <UploadFile v-model="form.data.img" /> -->
                <CoUploadPhoto v-model="form.data.img" :limit="9" />
            </el-form-item>

            <template v-if="lang === 'cn'">
                <el-form-item label="简介" prop="describe">
                    <CoEditor v-model="form.data.describe" />
                </el-form-item>
                <el-form-item label="详细内容" prop="content">
                    <CoEditor v-model="form.data.content" />
                </el-form-item>
            </template>
            <template v-else-if="lang === 'en'">
                <el-form-item label="英文简介" prop="describe_en">
                    <CoEditor v-model="form.data.describe_en" />
                </el-form-item>
                <el-form-item label="英文详细内容" prop="content_en">
                    <CoEditor v-model="form.data.content_en" />
                </el-form-item>
            </template>
            <!-- <el-form-item label="热门产品" prop="isHot">
                <el-radio-group v-model="form.data.isHot">
                    <el-radio :value="true">
                        是
                    </el-radio>
                    <el-radio :value="false">
                        否
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否隐藏" prop="isHide">
                <el-radio-group v-model="form.data.isHide">
                    <el-radio :value="true">
                        是
                    </el-radio>
                    <el-radio :value="false">
                        否
                    </el-radio>
                </el-radio-group>
            </el-form-item> -->
            <el-form-item label="排序" prop="sort">
                <el-input-number v-model="form.data.sort" :min="0" :max="10000" controls-position="right" placeholder=""
                    class="w100%" />
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
