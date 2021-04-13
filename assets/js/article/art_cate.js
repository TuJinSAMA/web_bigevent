$(function () {
    getCates();
    $('#addCate').on('click', function () {
        layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    });
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        const queryString = $('#form-add').serialize();
        addCates(queryString);
    });
    $('#tb_cates').on('click', '.updateCate', function () {
        layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        const cateId = $(this).attr('data-id');
        getCateForId(cateId);
    });
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        const queryString = $('#form-edit').serialize();
        updateCate(queryString);
    });
    $('#tb_cates').on('click', '.delCate', function () {
        const cateId = $(this).attr('data-id');
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            delCate(cateId);
            layer.close(index);
        });
    });
})

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
function delCate(id) {
    $.ajax({
        type: 'GET',
        url: '/my/article/deletecate/' + id,
        success: res => {
            if (res.status) return layui.layer.msg(res.message);
            getCates();
            layui.layer.msg(res.message);
        }
    });
}