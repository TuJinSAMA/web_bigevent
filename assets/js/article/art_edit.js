$(function () {
    // 初始化富文本编辑器
    initEditor();
    //初始化类别选项
    renderCates();
    // 1. 初始化图片裁剪器
    const $image = $('#image');
    // 2. 裁剪选项
    const options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    };
    let state = '';//初始化一个状态参数 发布文章时表示文章的状态
    // 3. 初始化裁剪区域
    $image.cropper(options);
    // 自动填写表单的值
    initPage();
    //给选择封面按钮添加点击事件
    $('#chooseCover').on('click', function () {
        $('#chooseImg').click();//触发input:file的点击事件
    });
    //监听input:file的change事件 当用户选择文件后触发
    $('#chooseImg').on('change', function (e) {
        if (e.target.files.length <= 0) return layui.layer.msg('您未选择任何图片！');
        const [imgObj] = e.target.files;
        const imgUrl = URL.createObjectURL(imgObj);
        // 'destroy' 销毁当前裁剪区域
        //  attr('src',imgUrl) 将image的src替换为选择的图片
        //  再次应用设置项
        $image.cropper('destroy').attr('src', imgUrl).cropper(options);
    });
    $('.submitBtn').on('click', function () {
        state = $(this).attr('data-state');
    });
    $('#addArt').on('submit', function (e) {
        e.preventDefault();
        const fd = new FormData($(this)[0]);
        fd.append('state', state);
        $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 400,
            height: 280
        }).toBlob(function (blob) {
            // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作
            // 5. 将文件对象，存储到 fd 中
            fd.append('cover_img', blob)
            // 6. 发起 ajax 数据请求
            editArt(fd);
        })
    })
    //初始化页面 通过id获取要编辑的文章的内容
    function initPage() {
        const id = location.search.slice(1); //id通过url传递过来 
        $.ajax({
            method: 'GET',
            url: '/my/article/' + id,
            success: res => {
                if (res.status) return layui.layer.msg(res.message);
                layui.form.val('form-edit', res.data); //自动填充表单的内容 
                //返回值中封面的url必须拼接服务器地址才能正常显示
                const imgUrl = 'http://api-breakingnews-web.itheima.net' + res.data.cover_img;
                //将文章的封面应用在裁剪区域
                $image.cropper('destroy').attr('src', imgUrl).cropper(options);
            }
        })
    }
    //渲染文章类别
    function renderCates() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: res => {
                if (res.status) return layui.layer.msg(res.message);
                const htmlStr = template('catesOption', res);
                $('[name=cate_id]').html(htmlStr);
                layui.form.render();//更新渲染layui的表单
            }
        })
    }
    //通过id修改文章的函数
    function editArt(data) {
        $.ajax({
            method: 'POST',
            url: '/my/article/edit',
            data: data,
            contentType: false,
            processData: false,
            success: res => {
                console.log(res);
                if (res.status) return layui.layer.msg(res.message);
                layui.layer.msg(res.message);
                //修改成功后返回文章列表页面
                location.href = './../../../article/art_list.html';
            }
        })
    }
});
