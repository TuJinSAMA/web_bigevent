$(function () {
    const $image = $('#image');
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options);


    $('.uploadImg').on('click', function () {
        $('#chooseImg').click();
    });
    $('#chooseImg').on('change', function (e) {
        if (e.target.files.length <= 0) return layui.layer.msg('请选择图片!');
        const imgObj = e.target.files[0];
        const imgUrl = URL.createObjectURL(imgObj);
        console.log(imgUrl);
        // 'destroy' 销毁当前裁剪区域
        //  attr('src',imgUrl) 将image的src替换为选择的图片
        //  再次应用设置项
        $image.cropper('destroy').attr('src', imgUrl).cropper(options);
    })
    $('.changeBtn').on('click', function () {
        console.log(1);
    });

})