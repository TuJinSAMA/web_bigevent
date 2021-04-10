$(function () {
    // const baseUrl = 'http://ajax.frontend.itheima.net';
    const baseUrl = 'http://api-breakingnews-web.itheima.net';
    //去注册页面的点击事件
    $('#link_reg').on('click', function () {
        $('.login_box').hide();
        $('.reg_box').show();
    });
    //去登录页面的点击事件
    $('#link_login').on('click', function () {
        $('.reg_box').hide();
        $('.login_box').show();
    });
    // 解构赋值 将layui对象中的form抽离出来
    const { form } = layui;
    const { layer } = layui;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格!'],
        repwd: function (value) {
            const pwd = $('.reg_box [name=password]').val();
            if (value !== pwd) {
                return '两次输入的密码不一致！';
            }
        }
    });

    //注册
    $('.regUser').on('submit', function (e) {
        e.preventDefault();
        const data = $('.regUser').serialize();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: data,
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                } else {
                    layer.msg(res.message);
                    $('#link_login').click();
                }

            }
        });
    });
    //登录
    $('.userLogin').on('submit', function (e) {
        e.preventDefault();
        const data = $('.userLogin').serialize();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: data,
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                } else {
                    layer.msg(res.message);
                    localStorage.setItem('token', res.token);
                    location.href = './../../index.html';
                }
            }
        });
    });

})