$(function () {
    // 初始化富文本编辑器
    initEditor();
    // 1. 初始化图片裁剪器
    const $image = $('#image');
    // 2. 裁剪选项
    const options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    };
    let state = ''; //初始化一个状态参数 发布文章时表示文章的状态
    // 3. 初始化裁剪区域
    $image.cropper(options);
    renderCates(); //调用渲染文章类别函数
    //给选择封面按钮添加点击事件
    $('#chooseCover').on('click', function () {
        $('#chooseImg').click(); //触发input:file的点击事件
    });
    //监听input:file的change事件 当用户选择文件后触发
    $('#chooseImg').on('change', function (e) {
        // 判断用户有没有选择文件
        if (e.target.files.length <= 0) return layui.layer.msg('您未选择任何图片！');
        const [imgObj] = e.target.files; //解构赋值 将用户选择的文件提取出来
        const imgUrl = URL.createObjectURL(imgObj); //使用URL对象的creatObjectURL方法创建一个可显示的url
        // 'destroy' 销毁当前裁剪区域
        //  attr('src',imgUrl) 将image的src替换为选择的图片
        //  再次应用设置项
        $image.cropper('destroy').attr('src', imgUrl).cropper(options);
    });
    // 监听"发布"和"存为草稿"按钮的点击事件
    $('.submitBtn').on('click', function () {
        state = $(this).attr('data-state');// 给表示文章状态的变量赋值
    });
    //监听发布文章表单的提交事件
    $('#addArt').on('submit', function (e) {
        e.preventDefault();
        const fd = new FormData($(this)[0]); //创建此表单的FormData对象
        fd.append('state', state); //将文章的状态追加到FormData对象中
        //将裁剪好的封面图片 使用toBlob方法转化为文件对象
        $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 400,
            height: 280
        }).toBlob(function (blob) {
            // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作
            // 5. 将文件对象，存储到 fd 中
            fd.append('cover_img', blob);
            // 6. 发起 ajax 数据请求 调用发布文章函数
            addArt(fd);
        })
    })
});
//渲染文章类别函数
function renderCates() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: res => {
            if (res.status) return layui.layer.msg(res.message);
            const htmlStr = template('catesOption', res);
            $('[name=cate_id]').html(htmlStr);
            layui.form.render();
        }
    })
}
//发布文章函数
function addArt(data) {
    $.ajax({
        method: 'POST',
        url: '/my/article/add',
        data: data,
        contentType: false,
        processData: false,
        success: res => {
            if (res.status) return layui.layer.msg(res.message);
            layui.layer.msg(res.message);
            //发布成功后跳转到文章列表页面
            location.href = './../../../article/art_list.html';
        }
    });
}