<template>
    <section>


        <!-- 留言框 -->
        <div class="container ma px10px py50px">
            <div class="mb30px" v-html="$lang(comData?.content, comData?.content_en)" />
            <el-form class="form-box" ref="formRef" :model="form" :rules="rules" size="large" label-position="top">
                <div class="flex justify-between">
                    <div class="w48%">
                        <el-form-item label="" prop="name">
                            <el-input v-model="form.name" :placeholder="$lang('您的名字', 'Name') || ''">
                                <template #suffix>
                                    <i class="i-ep-user text-28px" />
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="" prop="phone">
                            <el-input v-model="form.phone" :placeholder="$lang('您的电话', 'Phone') || ''">
                                <template #suffix>
                                    <i class="i-ep-phone text-28px" />
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="" prop="email">
                            <el-input v-model="form.email" type="email" :placeholder="$lang('您的邮箱', 'Email') || ''">
                                <template #suffix>
                                    <i class="i-ep-message text-28px" />
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="" prop="address">
                            <el-input v-model="form.address" :placeholder="$lang('所在地区', 'Address') || ''">
                                <template #suffix>
                                    <i class="i-ep-location text-28px" />
                                </template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="w48% mb30px">
                        <img :src="comData?.img || ''" alt="" class="w100% h100% object-cover">
                    </div>
                </div>
                <el-form-item label="" prop="note">
                    <el-input v-model="form.note" type="textarea" :rows="10" :placeholder="$lang('备注', 'Remark') || ''">
                    </el-input>
                </el-form-item>

                <el-row :gutter="30">
                    <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="15">
                        <el-form-item label="" prop="verifyCode">
                            <el-input v-model="form.verifyCode" :placeholder="$lang('验证码', 'Code') || ''">
                                <template #suffix>
                                    <span
                                        class="select-none text-28px tracking-8px font-[fantasy] c-#000 cursor-pointer"
                                        @click="setVerifyCode">
                                        <ClientOnly>{{ code }}</ClientOnly>
                                    </span>
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="9">
                        <el-button class="w100%" type="primary" :loading="btnLoading" @click="onSubmit">
                            {{ $lang('提交申请', 'Submit') }}
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </section>
</template>

<script lang="ts" setup>
import type { FormRules, FormInstance } from 'element-plus'
import type { Other, Prisma } from '@prisma/client'


definePageMeta({
    layout: 'home',
})

const $lang=(a:any,b:any)=>{
    return a
}


// const { data } = await useCustomFetch<Other>('/api/v1/page/other', {
//     params: {
//         type: 'message',
//     },
// })
const comData = ref()

function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789'
    let result = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        result += characters.charAt(randomIndex)
    }

    return result
}

const code = ref(generateRandomString(4))
const formRef = ref<FormInstance>()
const form = reactive({
    name: '',
    phone: '',
    email: '',
    address: '',
    note: '',
    verifyCode: '',
})


const rules = reactive<FormRules>({
    name: [ // 菜单名称
        { required: true, whitespace: true, message: $lang('请输入姓名', 'Please enter your name'), trigger: 'blur' },
    ],
    phone: [ // 菜单名称
        { required: true, whitespace: true, message: $lang('请输入电话', 'Please enter your phone'), trigger: 'blur' },
    ],
    email: [
        { required: true, whitespace: true, message: $lang('请输入邮箱', 'Please enter your email'), trigger: 'blur' },
    ],
    address: [ // 图片
        { required: true, message: $lang('请输入所在地区', 'Please enter your address'), trigger: 'blur' },
    ],
    note: [ // 图片
        { required: true, message: $lang('请输入备注', 'Please enter your remark'), trigger: 'blur' },
    ],
    verifyCode: [ // 图片
        { required: true, message: $lang('请输入验证码', 'Verification code error'), trigger: 'blur' },
    ],
})

const setVerifyCode = () => {
    code.value = generateRandomString(4)
}


const msgCode = $lang('验证码错误', 'Verification code error') || ''
const msgSuccess = $lang('提交成功', 'Submit success') || ''


const [ApiFunc, btnLoading] = useLoadingSubmit()
const onSubmit = async () => {

    const isVerify = await useFormVerify(formRef.value)
    if (!isVerify) return

    if (form.verifyCode?.trim()?.toLowerCase() !== code.value.toLowerCase()) return ElMessage.error(msgCode)

    const param: Prisma.MessageCreateInput = {
        title: form.name?.trim() ?? '',
        phone: form.phone?.trim() ?? '',
        email: form.email?.trim() ?? '',
        address: form.address?.trim() ?? '',
        content: form.note?.trim() ?? '',
    }

    const res = await ApiFunc(useServerFetch<{ code: number }>('/api/v1/message/add', {
        method: 'POST',
        body: param,
    }))
    console.log('res :>> ', res);
    // if (res.code === 200) {
    //     ElMessage.success(msgSuccess)
    //     formRef.value?.resetFields()
    //     // form.name = ''
    //     // form.phone = ''
    //     // form.email = ''
    //     // form.address = ''
    //     // form.note = ''
    //     // form.verifyCode = ''
    //     setVerifyCode()
    // }
}
</script>

<style lang="scss" scoped>
.form-box {
    --el-component-size-large: 60px;

    :deep(.el-form-item--large) {
        margin-bottom: 30px;
    }

    :deep(.el-button--large) {
        --el-font-size-base: 20px;
        --el-button-size: var(--el-component-size-large);
    }
}
</style>
