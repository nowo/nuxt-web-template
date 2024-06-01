<script setup lang="ts">
// import 'vue-cropper/dist/index.css'
// import { VueCropper } from 'vue-cropper'
// import { ElMessage } from 'element-plus'
// import { importNewImg } from '@/api/back/home.js'

// const props = defineProps({
//     dialogVisible: {
//         type: Boolean,
//         default: () => {
//             return false
//         },
//     },
//     title: {
//         type: String,
//         default: '',
//     },
//     cWidth: {
//         type: [Number, String],
//         default: '',
//     },
//     cHeight: {
//         type: [Number, String],
//         default: '',
//     },
//     // 图片数量限制
//     limit: {
//         type: Number,
//         default: 5,
//     },
//     // 大小限制(MB)
//     fileSize: {
//         type: Number,
//         default: 5,
//     },
//     // 文件类型
//     fileType: {
//         type: Array,
//         default: () => ['png', 'jpg', 'jpeg'],
//     },
//     accpetType: {
//         type: String,
//         default: () => '.png,.jpg,.jpeg',
//     },
// })

// const emits = defineEmits<{
//     change: []
//     update: [value: string] // named tuple syntax
// }>()

// const { proxy } = getCurrentInstance()
// const cropper = ref()
// const uploadBtn = ref()
// const elUpload = ref()
// const options = reactive({
//     img: '', // 原图文件
//     autoCrop: true, // 默认生成截图框
//     fixedBox: false, // 固定截图框大小
//     canMoveBox: true, // 截图框可以拖动
//     autoCropWidth: props.cWidth, // 截图框宽度
//     autoCropHeight: props.cHeight, // 截图框高度
//     maxImgSize: 200,
//     fixed: true, // 截图框宽高固定比例
//     fixedNumber: [1, 1], // 截图框的宽高比例
//     centerBox: true, // 截图框被限制在图片里面
//     canMove: false, // 上传图片不允许拖动
//     canScale: true, // 上传图片不允许滚轮缩放
//     previews: {} as any, // 预览数据
// })
// // vueCropper组件 裁剪配置信息

// // 实时预览
// const realTime = (data) => {
//     // options.previews = data;
//     const previews = data
//     const h = 0.5
//     const w = 0.2

//     options.previews = {
//         width: `${previews.w}px`,
//         height: `${previews.h}px`,
//         url: previews.url,
//         img: previews.img,
//         overflow: 'hidden',
//         margin: '0',
//         zoom: h,
//     }
// }
// // 文件个数超出
// const handleExceed = () => {
//     ElMessage.error(`上传数量不能超过 ${props.limit} 个!`)
// }
// // 读取原图
// const upload = (file, uploadFiles) => {
//     // console.log(file);
//     let isImg = false
//     let fileExtension = ''
//     if (props.fileType.length) {
//         if (file.name.lastIndexOf('.') > -1) {
//             fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
//         }
//         isImg = props.fileType.some((type) => {
//             if (file.raw.type.includes(type)) return true
//             if (fileExtension && fileExtension.includes(type)) return true
//             return false
//         })
//     } else {
//         isImg = file.type.includes('image')
//     }
//     if (!isImg) {
//         ElMessage.error(`格式不正确, 请上传${props.fileType.join('/')}图片格式文件!`)
//         return false
//     } else {
//         isImg = true
//     }
//     if (props.fileSize) {
//         const isLt = file.size / 1024 / 1024 < props.fileSize
//         if (!isLt) {
//             proxy.$modal.msgError(`上传大小不能超过 ${props.fileSize} MB!`)
//             fileList.value = []
//             return false
//         }
//     }

//     /*
//           const isIMAGE = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
//           const isLt5M = file.raw.size / 1024 / 1024 < 5
//           if (!isIMAGE) {
//             ElMessage.warning("请选择 jpg、png 格式的图片" );
//             return false
//           }
//           if (!isLt5M) {
//             ElMessage.warning("图片大小不能超过 5MB" );
//             return false
//           }
//         */
//     const reader = new FileReader()

//     reader.readAsDataURL(file.raw)
//     // console.log(reader);

//     reader.onload = (e) => {
//         options.img = e.target.result // base64
//     }
//     elUpload.value.clearFiles() // 这里处理重新上传时，upload组件change事件错误问题
// }
// // 获取截图信息
// const getCrop = () => {
//     // 获取截图的 base64 数据
//     cropper.value.getCropData((data) => {

//     })
//     // 获取截图的 blob 数据
//     cropper.value.getCropBlob((data) => {
//         const formData = new FormData()
//         // 第三个参数是规定以什么为后缀，接口是根据后缀来返回地址格式的
//         formData.append('file', data, 'chris.jpg')
//         // 上传接口
//         // importNewImg(formData).then((res) => {
//         //     console.log('222-res', res)
//         //     emit('cropperImgMethod', res.fileName)

//         //     closeDialog()
//         // })
//         // emit('closeCropperDialog')
//         // closeDialog()
//     })
// }
// // 重新上传
// const reupload = () => {
//     uploadBtn.value.ref.click()
// }
// // 关闭弹框
// const closeDialog = () => {
//     emit('closeCropperDialog')
//     options.img = ''
// }
// /** 向左旋转 */
// const rotateLeft = () => {
//     proxy.$refs.cropper.rotateLeft()
// }
// /** 向右旋转 */
// const rotateRight = () => {
//     proxy.$refs.cropper.rotateRight()
// }
// /** 图片缩放 */
// const changeScale = (num) => {
//     num = num || 1
//     proxy.$refs.cropper.changeScale(num)
// }
</script>

<template>
    <div>
        <ul class="el-upload-list el-upload-list--picture-card">
            <li class="is-success el-upload-list__item" tabindex="0" style="">
                <img class="el-upload-list__item-thumbnail"
                    src="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                    alt=""><!-- v-if -->
                <label class="el-upload-list__item-status-label">
                    <i class="el-icon el-icon--upload-success el-icon--check">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                            <path fill="currentColor"
                                d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z" />
                        </svg></i>
                </label>
                <i class="el-icon el-icon--close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                        <path fill="currentColor"
                            d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" />
                    </svg></i><!-- Due to close btn only appears when li gets focused disappears after li gets blurred, thus keyboard navigation can never reach close btn --><!-- This is a bug which needs to be fixed --><!-- TODO: Fix the incorrect navigation interaction -->
                <i class="el-icon--close-tip">press delete to remove</i>
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview">
                        <el-icon class="i-ep-zoom-in" />
                        <!-- <i class="el-icon el-icon--zoom-in"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                            <path fill="currentColor"
                                d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704m-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64z" />
                        </svg></i> -->
                    </span>
                    <span class="el-upload-list__item-delete">
                        <el-icon class="i-ep-delete" />
                        <!-- <i class="el-icon el-icon--delete"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                            <path fill="currentColor"
                                d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32" />
                        </svg></i> -->
                    </span>
                </span>
            </li>
            <li class="el-upload-list__item is-success" tabindex="0" style="">
                <img class="el-upload-list__item-thumbnail"
                    src="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                    alt=""><!-- v-if --><label class="el-upload-list__item-status-label"><i
                    class="el-icon el-icon--upload-success el-icon--check"><svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                        d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z" />
                </svg></i></label><i class="el-icon el-icon--close"><svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                        d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" />
                </svg></i><!-- Due to close btn only appears when li gets focused disappears after li gets blurred, thus keyboard navigation can never reach close btn --><!-- This is a bug which needs to be fixed --><!-- TODO: Fix the incorrect navigation interaction --><i
                    class="el-icon--close-tip">press delete to remove</i><span
                    class="el-upload-list__item-actions"><span class="el-upload-list__item-preview"><i
                    class="el-icon el-icon--zoom-in"><svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                        d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704m-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64z" />
                </svg></i></span><span class="el-upload-list__item-delete"><i
                    class="el-icon el-icon--delete"><svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                        d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32" />
                </svg></i></span></span>
            </li>
            <div class="el-upload el-upload--picture-card">
                <el-icon class="i-ep-plus" />
            </div>
        </ul>
        <!-- <el-upload ref="elUpload" class="upload" action="#" :on-change="upload" :accept="accpetType"
                            :limit="limit" :on-exceed="handleExceed" :show-file-list="false" :auto-upload="false">
                            <template #trigger>
                                <el-button ref="uploadBtn" type="primary">
                                    选择图片
                                </el-button>
                            </template>
</el-upload>
<el-dialog :title="title" :model-value="dialogVisible" :show-close="true" :close-on-click-modal="false"
    :close-on-press-escape="false" :before-close="closeDialog" destroy-on-close width="900px">
    <el-row>
        <el-col :xs="24" :md="12" :style="{ height: '350px' }">
            <div class="cropper-container">
                //!-- 待上传图片 --//
                <div v-show="!options.img">
                    <el-upload ref="elUpload" class="upload" action="#" :on-change="upload" :accept="accpetType"
                        :limit="limit" :on-exceed="handleExceed" :show-file-list="false" :auto-upload="false">
                        <template #trigger>
                                <el-button ref="uploadBtn" type="primary">
                                    选择图片
                                </el-button>
                            </template>
                    </el-upload>
                    <div>
                        请上传
                        <template v-if="fileSize">
                                大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
                            </template>
                        <template v-if="fileType">
                                格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
                            </template>
                        的文件
                    </div>
                </div>
                //!-- 已上传图片 --//
                <div v-show="options.img" class="cropper-crop">
                    <VueCropper ref="cropper" class="crop-box" :img="options.img" :info="true"
                        :auto-crop="options.autoCrop" :fixed-box="options.fixedBox" :can-move-box="options.canMoveBox"
                        :auto-crop-width="options.autoCropWidth" :auto-crop-height="options.autoCropHeight"
                        :center-box="options.centerBox" :fixed="options.fixed" :fixed-number="options.fixedNumber"
                        :can-move="options.canMove" :can-scale="options.canScale" @real-time="realTime" />
                </div>
            </div>
        </el-col>
        <el-col :xs="24" :md="12" :style="{ height: '350px' }">
            //!-- :style="`width:${cWidth}px;height:${cHeight}px;`" --//
            <div class="cropper-upload-preview"
                :style="`width:${options.previews.w}px;height:${options.previews.h}px;`">
                <img :src="options.previews.url" :style="options.previews.img">
            </div>
        </el-col>
    </el-row>
    <br>
    <el-row>
        <el-col :lg="2" :md="2">
            <div class="reupload" @click="reupload">
                <el-button v-show="options.img" type="primary">
                    重新上传<el-icon class="el-icon--right">
                        <Upload />
                    </el-icon>
                </el-button>
            </div>
        </el-col>
        <el-col :lg="{ span: 1, offset: 2 }" :md="2">
            <el-button icon="Plus" @click="changeScale(1)" />
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
            <el-button icon="Minus" @click="changeScale(-1)" />
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
            <el-button icon="RefreshLeft" @click="rotateLeft()" />
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
            <el-button icon="RefreshRight" @click="rotateRight()" />
        </el-col>
        <el-col :lg="{ span: 2, offset: 6 }" :md="2">
            <el-button type="primary" @click="getCrop()">
                提 交
            </el-button>
        </el-col>
    </el-row>

    <template #footer>
            <span class="dialog-footer">
                <div>
                    <el-button @click="closeDialog">取 消</el-button>
                    //!-- <el-button type="primary" @click="getCrop">确 定</el-button> --//
                </div>
            </span>
        </template>
</el-dialog> -->
    </div>
</template>

<style lang="scss" scoped>
.dialog-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;

    .reupload {
        color: #409eff;
        cursor: pointer;
    }
}

.cropper-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #f0f2f5;
    margin-right: 10px;
    border-radius: 4px;

    .upload {
        text-align: center;
        margin-bottom: 24px;
    }

    .cropper-crop {
        width: 560px;
        height: 350px;
        position: relative;

        .crop-box {
            width: 100%;
            height: 100%;
            border-radius: 4px;
            overflow: hidden;
        }
    }

    .cropper-upload-preview {
        position: absolute;
        top: 50%;
        transform: translate(50%, -50%);
        width: 200px;
        height: 200px;
        border-radius: 0;
        box-shadow: 0 0 4px #ccc;
        overflow: hidden;

        >img {
            width: 100% !important;
        }
    }
}
</style>
