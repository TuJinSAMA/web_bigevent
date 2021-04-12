$(function () {
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            const oldPwd = $('.changePwd [name=oldPwd]').val();
            if (value === oldPwd) {
                return '新旧密码不能相同！'
            }
        },
        repwd: function (value) {
            const newPwd = $('.changePwd [name=newPwd]').val();
            if (value !== newPwd) {
                return '两次输入的密码不一致！';
            }
        }
    });
    $('.changePwd').on('submit', function (e) {
        e.preventDefault();
        changePwd();
    });
});

//修改密码函数
function changePwd() {
    $.ajax({
        type: 'POST',
        url: '/my/updatepwd',
        data: $('.changePwd').serialize(),
        success: res => {
            if (res.status !== 0) return layui.layer.msg(res.message);
            layui.layer.msg(res.message);
            $('.changePwd [type=password]').val('');
        }
    })
}