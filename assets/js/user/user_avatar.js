$(function () {
    // 初始化图片的裁剪区域
    // 1.获取到图片的DOM元素
    const $image = $('#image');
    // 2.初始化配置项 指定裁剪纵横比和预览区域
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    // 3. 应用配置项
    $image.cropper(options);
    //给上传按钮添加点击事件 触发input:file的点击事件以选择图片
    $('.uploadImg').on('click', function () {
        $('#chooseImg').click();
    });
    // 监听input:file的change事件 当用户选择文件后触发
    $('#chooseImg').on('change', function (e) {
        // 判断input:file的files中 用户有没有选择图片
        if (e.target.files.length <= 0) return layui.layer.msg('请选择图片!');
        // 解构赋值 将文件列表中用户选择的文件提取出来
        const [imgObj] = e.target.files;
        // 使用URL对象中的creatObjectURL方法创建一个可显示的url
        const imgUrl = URL.createObjectURL(imgObj);
        // 'destroy' 销毁当前裁剪区域
        //  attr('src',imgUrl) 将image的src替换为选择的图片
        //  再次应用设置项
        $image.cropper('destroy').attr('src', imgUrl).cropper(options);
    })
    //给"确定"按钮添加点击事件
    $('.changeBtn').on('click', function () {
        //使用cropper中的toDataURL方法生成一个可上传到服务器的数据
        const dataUrl = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png');
        //调用更换头像的函数
        changePortrait(dataUrl);
    });
})
//更换头像函数
function changePortrait(data) {
    $.ajax({
        type: 'POST',
        url: '/my/update/avatar',
        data: { avatar: data },
        success: res => {
            if (res.status !== 0) return layui.layer.msg(res.message);
            layui.layer.msg(res.message);
            window.parent.initPage();//调用父页面的initPage方法
        }
    })
}
