<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { Action, FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'

// 绑定表单
const formRef = ref<FormInstance>()
const defData = reactive({
    visible: false, // 弹窗显示
})

const formData = reactive({
    now_pwd: '', // 原密码
    new_pwd: '', // 新密码
    confirm_pwd: '', // 确认
})

const rules = reactive<FormRules>({
    now_pwd: [
        { required: true, message: '必填项不能为空', trigger: 'blur' },
        // { pattern: /^[^\u4E00-\u9FA5 ]{6,16}$/, message: '不含有中文和空格,至少6位,最多16位', trigger: 'blur' },
    ],
    new_pwd: [
        { required: true, message: '必填项不能为空', trigger: 'blur' },
        { pattern: /^[^\u4E00-\u9FA5 ]{6,16}$/, message: '不含有中文和空格,至少6位,最多16位', trigger: 'blur' },
    ],
    confirm_pwd: [
        { required: true, message: '必填项不能为空', trigger: 'blur' },
        { pattern: /^[^\u4E00-\u9FA5 ]{6,16}$/, message: '不含有中文和空格,至少6位,最多16位', trigger: 'blur' },
    ],
})

// 初始化部门数据
const initDefaultData = async () => {

}

// 打开弹窗
const openDialog = () => {
    initDefaultData()
    defData.visible = true
}
// 关闭弹窗
const closeDialog = () => {
    defData.visible = false
    formRef.value?.resetFields()// 清空表单
}
// 取消
const onCancel = () => {
    closeDialog()
}

const [ApiFunc, loading] = useLoadingSubmit()

// 确定
const onSubmit = async () => {
    const isVerify = await useFormVerify(formRef.value)
    if (!isVerify) return

    if (formData.new_pwd !== formData.confirm_pwd) return ElMessage.error('两次输入的密码不一致！')

    const data: IAdminPasswordUpdate = {
        password: formData.now_pwd?.trim?.(),
        newPassword: formData.new_pwd?.trim?.(),
        // confirm_password: formData.confirm_pwd,
    }
    const res = await ApiFunc(useServerFetch('/api/v1/password', {
        method: 'post',
        body: data,
    }))
    if (res.code !== 200) return ElMessage.error(res.msg)
    ElMessage.success('修改成功')

    closeDialog()

    const token = useCookie('token')

    setTimeout(() => {
        token.value = ``
        window.location.reload() // 刷新页面
    }, 5000)
    ElMessageBox.alert('密码修改成功，当前账户登录失效, 请重新登录!', '提示', {
        confirmButtonText: '确定',
        callback: (action: Action) => {
            token.value = `` // 清除缓存/token等
            window.location.reload() // 刷新页面
        },
    })
}

// 抛出方法
defineExpose({
    openDialog,
})
</script>

<template>
    <el-dialog v-model="defData.visible" draggable title="修改密码" width="450px">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
            <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="23" :xl="23">
                    <el-form-item label="原密码" prop="now_pwd">
                        <el-input v-model="formData.now_pwd" class="w100%" placeholder="请输入原密码" type="password"
                            clearable show-password />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="23" :xl="23">
                    <el-form-item label="新密码" prop="new_pwd">
                        <el-input v-model="formData.new_pwd" class="w100%" placeholder="请输入新密码" type="password" show-password
                            clearable />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="23" :xl="23">
                    <el-form-item label="确认密码" prop="confirm_pwd">
                        <el-input v-model="formData.confirm_pwd" class="w100%" placeholder="请输入确认密码" type="password"
                            show-password clearable />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="onCancel">取 消</el-button>
                <el-button type="primary" :loading="loading" @click="onSubmit">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped></style>
