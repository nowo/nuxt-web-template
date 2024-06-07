<script lang="ts" setup>
import type { Admin } from '@prisma/client'
import type { FormInstance } from 'element-plus'

const emits = defineEmits<{
    update: []
}>()

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
        // role:'',
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

const openModal = (type: DialogOperate, row?: Admin) => {
    operate.value = type
    if (type === 'edit') {
        form.data.account=row?.account||''
        form.data.password=''
        form.data.name=row?.username||''
        form.data.status=row?.status?1:0
        form.data.id=row?.id||0
    } else {
        // form.data=row
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

defineExpose({
    openModal,
    closeModal,
})
</script>

<template>
    <CoDrawer v-model="visible" :title="comData.title" :loading="btnLoading" @cancel="onCancel" @confirm="onConfirm">
        <el-form ref="formRef" :model="form.data" :rules="rules" label-width="80px">
            <el-form-item label="登录账号" prop="account">
                <el-input v-model="form.data.account" placeholder="请输入登录账号" maxlength="20" clearable
                    :disabled="operate === 'edit'" />
            </el-form-item>

            <el-form-item label="登录密码" prop="password">
                <el-input v-model="form.data.password" placeholder="" maxlength="20" type="password" clearable
                    show-password />
            </el-form-item>

            <el-form-item label="账户名称" prop="name">
                <el-input v-model="form.data.name" placeholder="请输入账户名称" maxlength="30" clearable />
            </el-form-item>
            <!-- TODO 做页面权限配置 -->
            <el-form-item label="页面配置" prop="name">
                <el-input v-model="form.data.name" placeholder="请输入账户名称" maxlength="30" clearable />
            </el-form-item>

            <el-form-item label="员工状态">
                <el-switch v-model="form.data.status" inline-prompt active-text="启" inactive-text="禁" :active-value="1"
                    :inactive-value="0" />
            </el-form-item>
        </el-form>
    </CoDrawer>
</template>
