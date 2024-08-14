<script lang="ts" setup>
import type { Container, ParticlesOptions } from '@tsparticles/engine'
import type { FormInstance, FormRules } from 'element-plus'

definePageMeta({
    layout: 'blank',
    title: '登录页面',
    isHide: true,
})

const { systemInfo } = await useSystemState()

// 可以在https://codepen.io/collection/DPOage, 这个网站上面选择喜欢的,把这个配置换了就可以
const option: Partial<ParticlesOptions> = {
    fps_limit: 60,
    background: {
        color: {
            value: '#fff',
        },
        image: '',
        position: '50% 50%',
        repeat: 'no-repeat',
        size: 'cover',
        opacity: 1,
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onClick: { enable: true, mode: 'push' },
            onHover: {
                enable: true,
                mode: 'attract',
                parallax: { enable: false, force: 60, smooth: 10 },
            },
            resize: { enable: true },
        },
        modes: {
            push: { quantity: 4 },
            attract: { distance: 200, duration: 0.4, factor: 5 },
        },
    },
    particles: {
        color: { value: '#e1e7ee' },
        line_linked: {
            color: '#e1e7ee',
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
        },
        move: {
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
            bounce: false,
            direction: 'none',
            enable: true,
            out_mode: 'out',
            random: false,
            speed: 2,
            straight: false,
        },
        number: { density: { enable: true, value_area: 800 }, value: 80 },
        opacity: {
            anim: { enable: false, opacity_min: 0.1, speed: 1, sync: false },
            random: false,
            value: 0.5,
        },
        shape: {
            character: {
                fill: false,
                font: 'Verdana',
                style: '',
                value: '*',
                weight: '400',
            },
            image: {
                height: 100,
                replace_color: true,
                src: 'images/github.svg',
                width: 100,
            },
            polygon: { nb_sides: 5 },
            stroke: { color: '#000000', width: 0 },
            type: 'circle',
        },
        size: {
            anim: { enable: false, size_min: 0.1, speed: 40, sync: false },
            random: true,
            value: 5,
        },
    },
    polygon: {
        draw: { enable: false, lineColor: '#e1e7ee', lineWidth: 0.5 },
        move: { radius: 10 },
        scale: 1,
        type: 'none',
        url: '',
    },
    retina_detect: true,
}

const options: Partial<ParticlesOptions> = {
    // const option: ISourceOptions = {
    fps_limit: 60,
    interactivity: {
        detect_on: 'canvas',
        events: {
            onClick: { enable: true, mode: 'push' },
            onHover: {
                enable: true,
                mode: 'attract',
                parallax: { enable: false, force: 60, smooth: 10 },
            },
            resize: {
                enable: true,
            },
        },
        modes: {
            push: { quantity: 4 },
            attract: { distance: 200, duration: 0.4, factor: 5 },
        },
    },
    particles: {
        color: { value: '#eee' },
        line_linked: {
            color: '#ddd',
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
        },
        move: {
            attract: { enable: false, rotate: { x: 600, y: 1200 } },
            bounce: false,
            direction: 'none',
            enable: true,
            out_mode: 'out',
            random: false,
            speed: 2,
            straight: false,
        },
        number: { density: { enable: true, value_area: 800 }, value: 80 },
        opacity: {
            anim: { enable: false, opacity_min: 0.1, speed: 1, sync: false },
            random: false,
            value: 0.5,
        },
        shape: {
            character: {
                fill: false,
                font: 'Verdana',
                style: '',
                value: '*',
                weight: '400',
            },
            image: {
                height: 100,
                replace_color: true,
                src: 'images/github.svg',
                width: 100,
            },
            polygon: { nb_sides: 5 },
            stroke: { color: '#000000', width: 0 },
            type: 'circle',
        },
        size: {
            anim: { enable: false, size_min: 0.1, speed: 40, sync: false },
            random: true,
            value: 5,
        },
    },
    polygon: {
        draw: { enable: false, lineColor: '#ffffff', lineWidth: 0.5 },
        move: { radius: 10 },
        scale: 1,
        type: 'none',
        url: '',
    },
    retina_detect: true,
}

const onLoad = (container: Container) => {
    // Do something with the container
    container.pause()
    setTimeout(() => container.play(), 2000)
}

const stateData = reactive({
    verify: ''
})

const formRef = ref<FormInstance>()


const form = reactive({
    account: 'admin',
    password: '123456',
    code: '',
    key: '',
})

const rules = reactive<FormRules>({
    account: [
        { required: true, message: '必填项不能为空' },
    ],
    password: [
        { required: true, message: '必填项不能为空' },
    ],
    code: [
        { required: true, message: '必填项不能为空' },
    ],
})

const getVerifyCode = async () => {
    const res = await useServerFetch<{ key: string, code: string }>('/api/v1/common/code')
    if (res.code !== 200) return ElMessage.error(res.msg)
    // console.log(res)
    form.key = res.data.key
    stateData.verify = res.data.code

}


const [ApiFunc, loading] = useLoadingSubmit()
const onSignIn = async () => {
    const isVerify = await useFormVerify(formRef.value)
    if (!isVerify) return
    const params: IAdminLoginParams = {
        account: form.account?.trim(),
        password: form.password?.trim(),
        code: form.code?.trim(),
        key: form.key
    }
    const res = await ApiFunc(useServerFetch<{ token: string }>('/api/v1/login', {
        method: 'POST',
        body: params,
    }))
    if (res.code !== 200) return ElMessage.error(res.msg)

    const token = useCookie('token')
    token.value = `${res.data?.token}`
    navigateTo('/admin')
}
onBeforeMount(() => {
    getVerifyCode()
})
</script>

<template>
    <div class="h100vh w100%">
        <NuxtParticles id="tsparticles" :options="option" @load="onLoad" />
        <div class="relative z-10 h90% flex items-center justify-center">
            <div class="w400px">
                <h3 class="color-info mb20px text-center text-24px">
                    <img v-if="systemInfo?.logo" :src="systemInfo?.logo" alt="">
                    <br>
                    后台管理系统
                </h3>
                <el-form ref="formRef" :model="form" :rules="rules" size="large" class="login-content-form"
                    @submit.prevent="onSignIn">
                    <el-form-item prop="account">
                        <el-input v-model.trim="form.account" type="text" maxlength="20" placeholder="请输入账号" clearable
                            tabindex="1" @keyup.enter="onSignIn">
                            <template #prefix>
                                <i class="i-ep-user" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model.trim="form.password" type="password" maxlength="20" placeholder="请输入密码"
                            show-password tabindex="2" @keyup.enter="onSignIn">
                            <template #prefix>
                                <i class="i-ep-unlock" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-col :span="15">
                            <el-input v-model.trim="form.code" type="text" maxlength="4" placeholder="请输入验证码" clearable
                                tabindex="3" @keyup.enter="onSignIn">
                                <template #prefix>
                                    <i class="i-ep-position" />
                                </template>
                            </el-input>
                        </el-col>
                        <el-col :span="1" />
                        <el-col :span="8">
                            <el-button v-html="stateData.verify" class="login-content-code w100%"
                                @click="getVerifyCode">


                            </el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="login-animation4">
                        <el-button type="primary" size="large" class="w100%" round plain :loading="loading" tabindex="4"
                            @click="onSignIn">
                            登 录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login-content-code {
    padding: 0;

    :deep(>svg) {
        width: 100%;
        height: 100%;
    }
}
</style>
