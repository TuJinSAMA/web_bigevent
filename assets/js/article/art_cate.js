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