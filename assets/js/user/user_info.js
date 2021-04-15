$(function () {
    //使用layui的verify方法定义表单中昵称的校验规则
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) return '昵称长度必须在 1 ~ 6 个字符之间！';
        }
    });
    getUserInfo(); //调用获取用户基本信息函数
    // 给"提交修改"按钮添加点击事件
    $('.changeInfo').on('submit', function (e) {
        e.preventDefault();
        updateUserInfo(); //调用更改用户信息函数
    });
    // 给"重置"按钮添加点击事件
    $('#resetBtn').on('click', function (e) {
        e.preventDefault();
        getUserInfo(); //调用获取用户基本信息函数
    });
});

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: '/my/userinfo',
        success: res => {
            if (res.status !== 0) return layui.layer.msg(res.message);
            //使用layui表单中的val方法快速给表单赋值
            layui.form.val('formUserInfo', res.data);
        }
    });
}
//更改用户基本信息函数
function updateUserInfo() {
    $.ajax({
        type: "POST",
        url: '/my/userinfo',
        data: $('.changeInfo').serialize(),
        success: res => {
            if (res.status !== 0) return layui.layer.msg(res.message);
            layui.layer.msg(res.message);
            window.parent.initPage();//调用父页面的initPage函数  更新主页中的个人信息
        }
    });
}