$(function () {
    const token = localStorage.getItem('token');
    initPage();





    //初始化页面函数
    function initPage() {
        //获取用户基本信息
        $.ajax({
            type: "GET",
            url: '/my/userinfo',
            headers: {
                Authorization: token
            },
            success: res => {
                initUserinfo(res.data);
            }
        });
    }
    //初始化用户信息
    function initUserinfo(data) {
        if (data.user_pic) {
            $('.text-avatar').hide();
            $('.portrait').attr('src', data.user_pic);
        } else {
            $('.portrait').hide();

        }
        $('#welcome').html(`欢迎 ${data.username}`);
    }
});