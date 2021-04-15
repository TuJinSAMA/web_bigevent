$(function () {
    const { layer } = layui;
    //调用初始化页面函数
    initPage();
    //绑定用户退出的点击事件
    $('#exit').on('click', function () {
        //layui中的弹出询问层方法confirm
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token');
            location.href = './../../login.html';
            layer.close(index);
        });
    });
});

//初始化页面函数
function initPage() {
    //获取用户基本信息
    $.ajax({
        type: "GET",
        url: '/my/userinfo',
        success: res => {
            if (res.status !== 0) return layui.layer.msg(res.message);
            initUserinfo(res.data); //初始化用户信息函数
        }
    });
}
//初始化用户信息函数
function initUserinfo(data) {
    //判断用户有没有昵称 如果有则显示昵称 反之显示用户名
    const username = data.nickname || data.username;
    //判断用户有没有设置头像 如果有则显示头像 反之显示用户名首字的大写
    if (data.user_pic) {
        $('.text-avatar').hide();
        $('.portrait').attr('src', data.user_pic);
    } else {
        $('.portrait').hide();
        $('.text-avatar').html(username[0].toUpperCase());
    }
    $('#welcome').html(`欢迎 ${username}`);
}