$(function () {
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！';
            }
        }
    })
    getUserInfo();
    $('.changeInfo').on('submit', function (e) {
        e.preventDefault();
        updateUserInfo();
    });
    $('#resetBtn').on('click', function (e) {
        e.preventDefault();
        getUserInfo();
    });
});

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: '/my/userinfo',
        success: res => {
            if (res.status !== 0) return layui.layer.msg(res.message);
            layui.form.val('formUserInfo', res.data);
        }
    });
}
//更改用户基本信息
function updateUserInfo() {
    $.ajax({
        type: "POST",
        url: '/my/userinfo',
        data: $('.changeInfo').serialize(),
        success: res => {
            if (res.status !== 0) return layui.layer.msg(res.message);
            layui.layer.msg(res.message);
            window.parent.initPage();
        }
    });
}