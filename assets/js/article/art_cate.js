$(function () {
    //初始化页面 调用获取分类列表函数
    getCates();
    // 给"添加类别"按钮添加点击事件
    $('#addCate').on('click', function () {
        // 使用layui中的弹出层
        layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html() //渲染弹出层中的内容
        });
    });
    // 使用事件委托监听页面中添加类别表单的提交事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        const queryString = $('#form-add').serialize();
        addCates(queryString); //调用添加类别的函数
    });
    // 使用事件委托监听页面中编辑按钮的点击事件
    $('#tb_cates').on('click', '.updateCate', function () {
        //弹出修改文章分类的弹出层
        layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        const cateId = $(this).attr('data-id'); //获取当前点击的按钮的id
        getCateForId(cateId);//调用通过id获取类别的函数
    });
    // 使用事件委托监听修改类别表单的提交事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        const queryString = $('#form-edit').serialize();
        updateCate(queryString); //调用通过id修改类别的函数
    });
    // 使用事件委托监听删除按钮的点击事件
    $('#tb_cates').on('click', '.delCate', function () {
        const cateId = $(this).attr('data-id');//获取当前点击的按钮的id
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            delCate(cateId); //调用通过id删除类别的函数
            getCates(); //重新渲染页面
            layer.close(index); //关闭弹出层
        });
    });
})
// 获取分类列表函数
function getCates() {
    $.ajax({
        type: "GET",
        url: "/my/article/cates",
        success: res => {
            if (res.status !== 0) return layui.layer.msg(res.message);
            const htmlStr = template('tpl_table', res);
            $('#tb_cates').html(htmlStr);
        }
    })
}
// 添加类别函数
function addCates(data) {
    $.ajax({
        type: 'POST',
        url: '/my/article/addcates',
        data: data,
        success: res => {
            if (res.status) return layui.layer.msg(res.message);
            getCates();
            layui.layer.close(layui.layer.index);
        }
    })
}
// 通过id获取类别的函数
function getCateForId(id) {
    $.ajax({
        type: 'GET',
        url: '/my/article/cates/' + id,
        success: res => {
            if (res.status) return layui.layer.msg(res.message);
            layui.form.val('form-edit', res.data);
        }
    })
}
// 通过id修改类别的函数
function updateCate(data) {
    $.ajax({
        type: 'POST',
        url: '/my/article/updatecate',
        data: data,
        success: res => {
            if (res.status) return layui.layer.msg(res.message);
            layui.layer.close(layui.layer.index);
            getCates();
            layui.layer.msg(res.message);
        }
    })
}
// 通过id删除类别函数
function delCate(id) {
    $.ajax({
        type: 'GET',
        url: '/my/article/deletecate/' + id,
        success: res => {
            if (res.status) return layui.layer.msg(res.message);
            layui.layer.msg(res.message);
        }
    });
}