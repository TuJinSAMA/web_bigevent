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
    let state = '';
    // 3. 初始化裁剪区域
    $image.cropper(options);
    // 自动填写表单的值
    initPage();

    $('#chooseCover').on('click', function () {
        $('#chooseImg').click();
    });
    $('#chooseImg').on('change', function (e) {
        if (e.target.files.length <= 0) return layui.layer.msg('请选择图片！');
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


    function initPage() {
        const id = location.search.slice(1);
        $.ajax({
            method: 'GET',
            url: '/my/article/' + id,
            success: res => {
                if (res.status) return layui.layer.msg(res.message);
                layui.form.val('form-edit', res.data);
                const imgUrl = 'http://api-breakingnews-web.itheima.net' + res.data.cover_img;
                $image.cropper('destroy').attr('src', imgUrl).cropper(options);
            }
        })
    }
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
                location.href = './../../../article/art_list.html';
            }
        })
    }
});
