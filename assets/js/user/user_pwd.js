$(function () {
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            const oldpwd = $('.changePwd [name=oldpwd]').val();
            if (value === oldpwd) {
                return '新旧密码不能相同！'
            }
        },
        repwd: function (value) {
            const newpwd = $('.changePwd [name=newpwd]').val();
            if (value !== newpwd) {
                return '两次输入的密码不一致！';
            }
        }
    });
    $('.changePwd').on('submit', function (e) {
        e.preventDefault();

    });
});