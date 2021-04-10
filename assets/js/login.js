$(function () {
    // const baseUrl = 'http://ajax.frontend.itheima.net';
    const baseUrl = 'http://api-breakingnews-web.itheima.net';
    $('#link_reg').on('click', function () {
        $('.login_box').hide();
        $('.reg_box').show();
    });

    $('#link_login').on('click', function () {
        $('.reg_box').hide();
        $('.login_box').show();
    });

    // 结构赋值 将layui对象中的form抽离出来
    const { form } = layui;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格!'],
        repwd: function (value) {
            const pwd = $('.reg_box [name=password]').val();
            if (value !== pwd) {
                return '两次输入的密码不一致！';
            }
        }
    });
})