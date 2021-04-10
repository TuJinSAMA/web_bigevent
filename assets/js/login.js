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

    const { form } = layui;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码应在6-12位之间!']
    });
})