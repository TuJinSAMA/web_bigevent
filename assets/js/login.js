$(function () {
    $('#link_reg').on('click', function () {
        $('.login_box').hide();
        $('.reg_box').show();
    });

    $('#link_login').on('click', function () {
        $('.reg_box').hide();
        $('.login_box').show();
    });
})