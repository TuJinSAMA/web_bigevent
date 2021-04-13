$(function () {
    // 初始化富文本编辑器
    initEditor();
    // 1. 初始化图片裁剪器
    const $image = $('#image')

    // 2. 裁剪选项
    const options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
})