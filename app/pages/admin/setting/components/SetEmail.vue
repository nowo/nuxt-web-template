<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const { systemInfo } = await useSystemState()


const formRef = ref<FormInstance>()
const form = reactive({
    data: {
        service: '', // 邮件服务商
        port: undefined as undefined | number,   // 端口号
        email: '', // 发送方邮箱
        pass: '',    // 授权码
        name: '',   // 发送方姓名
        status: 1,   // 状态 1：启用，0：禁用
        toEmail: '', // 收件人邮箱
    },
})

const rules = reactive<FormRules>({
    service: [{ required: true, whitespace: true, message: '请输入SMTP服务器地址', trigger: 'blur' }],
    port: [{ required: true,  message: '请输入端口号', trigger: 'blur' }],
    email: [{ required: true, whitespace: true, message: '请输入授权码', trigger: 'blur' }],
    pass: [{ required: true, whitespace: true, message: '请输入发送方邮箱', trigger: 'blur' }],
})

// 初始化数据
const initDefaultData = async () => {
    const res = await useServerFetch<IConfigInfoUpdate>('/api/v1/config/info', {
        method: 'post',
        body: { type: 'email' },
    })

    // console.log('res :>> ', res)
    if (res.code !== 200) return ElMessage.error('网络错误')
    const propsData = res.data

    form.data.service = propsData?.title || ''
    form.data.port = propsData?.port || undefined

    form.data.email = propsData?.email || ''
    form.data.pass = propsData?.password || ''
    form.data.name = propsData?.name || ''
    form.data.status = propsData?.status || 0
    form.data.toEmail = propsData?.href || systemInfo.value?.company||''
}

const [ApiFunc, btnLoading] = useLoadingSubmit()
// 确定
const onSubmit = async () => {
    const isVerify = await useFormVerify(formRef.value)
    if (!isVerify) return

    const param: IConfigInfoUpdate = {
        title: form.data.service?.trim() ?? '',
        port: form.data.port||0,
        password: form.data.pass?.trim() ?? '',
        name: form.data.name?.trim() ?? '',
        status: form.data.status || 0,
        email: form.data.email?.trim() ?? '',
        href: form.data.toEmail?.trim() ?? '',
        type:'email',
        img:'',
        content:'',

    }

    const res = await ApiFunc(useServerFetch('/api/v1/config/update', {
        method: 'POST',
        body: param,
    }))

    if (res) ElMessage.success('设置成功')
}
// 重置
const onReset = async () => {
    formRef.value?.resetFields()
    initDefaultData()
}

onMounted(() => {
    initDefaultData()
})
</script>

<template>
    <el-form ref="formRef" :model="form.data" :rules="rules" label-width="130px" label-position="right">
        <div class="pr20px pt20px">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item label="是否启用：" prop="status">
                        <el-radio-group v-model="form.data.status">
                            <el-radio :value="1">
                                启用
                            </el-radio>
                            <el-radio :value="0">
                                禁用
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <template v-if="form.data.status === 1">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item prop="service" label="SMTP服务器：">
                            <el-input v-model="form.data.service" maxlength="100" clearable
                                placeholder="邮件服务器地址，如http://smtp.163.com、http://smtp.qq.com" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" />
                    <el-col :xs="24" :sm="12" :md="10" :lg="10" :xl="10">
                        <el-form-item prop="port" label="端口：">
                            <el-input-number v-model="form.data.port" :min="0" :precision="0" controls-position="right"
                                clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" />
                    <el-col :xs="24" :sm="16" :md="12" :lg="10" :xl="10">
                        <el-form-item prop="pass" label="授权码：">
                            <el-input v-model="form.data.pass" maxlength="100" clearable placeholder="SMTP授权码" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" />
                    <el-col :xs="24" :sm="16" :md="12" :lg="10" :xl="10">
                        <el-form-item prop="email" label="发送方邮箱：">
                            <el-input v-model="form.data.email" maxlength="100" clearable placeholder="发件人邮箱地址" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" />
                    <el-col :xs="24" :sm="16" :md="12" :lg="10" :xl="10">
                        <el-form-item prop="name" label="发件人名称：">
                            <el-input v-model="form.data.name" maxlength="100" clearable placeholder="发件人名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" />
                    <el-col :xs="24" :sm="16" :md="12" :lg="10" :xl="10">
                        <el-form-item prop="toEmail" label="收件人邮箱：">
                            <el-input v-model="form.data.toEmail" maxlength="100" clearable placeholder="收件人邮箱" />
                        </el-form-item>
                    </el-col>
                </template>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mt15px">
                    <el-form-item>
                        <el-button type="primary" :loading="btnLoading" @click="onSubmit">
                            确定
                        </el-button>
                        <el-button @click="onReset">
                            重置
                        </el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
    </el-form>
</template>

<style lang="scss" scoped></style>
