<script setup lang="ts">
const { files, open, reset, onChange } = useFileDialog({
    accept: 'image/*', // Set to accept only image files
    //   directory: true, // Select directories instead of files if set true
})

const submit = async () => {
    // console.log('files :>> ', files.value)
    // const response = await useServerFetch('/api/v1/upload', {
    //     method: 'POST',
    //     body: {
    //         file: files.value[0],
    //     },
    //     // headers: {
    //     //     "Content-Type" : "application/x-www-form-urlencoded"
    //     // }
    // })
    // console.log('response :>> ', response)

    const formData = new FormData()
    Array.from(files?.value || []).forEach((file) => {
        formData.append('files[]', file)
    })
    // for (let i = 0; i < files.value.length; i++) {
    //     formData.append('files[]', files.value[i])
    // }

    formData.append('type', 'img')
    // formData.append('data', JSON.stringify({ msg: 'hello', value: 1 }))
    // formData.append('data', new Blob([JSON.stringify({ msg: 'hello', value: 1 })], { type: 'application/json' }))
    const response = await useServerFetch('/api/v1/upload', {
        method: 'POST',
        body: formData,
        // headers: {
        //     "Content-Type" : "application/x-www-form-urlencoded"
        // }
    })
    console.log('response :>> ', response)
}
const text = ref('hello')
</script>

<template>
    <div class="flex gap-10px">
        <div>
            <CoEditor v-model="text" />
        </div>
        <button class="btn" @click="open()">
            open
        </button>
        <button class="btn" @click="reset">
            reset
        </button>
        <!-- <input type="file" @input="handleFileInput"> -->
        <button class="btn" @click="submit">
            submit
        </button>
    </div>
</template>
