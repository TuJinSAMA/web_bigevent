$(function () {
    //"去注册"链接的点击事件
    $('#link_reg').on('click', function () {
        $('.login_box').hide();
        $('.reg_box').show();
    });
    //"去登录"链接的点击事件
    $('#link_login').on('click', function () {
        $('.reg_box').hide();
        $('.login_box').show();
    });
    // 解构赋值 将layui对象中的form、layer抽离出来
    const { form, layer } = layui;
    //layui中 给layui表单添加校验规则的verify方法
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格!'],
        repwd: function (value) {
            const pwd = $('.reg_box [name=password]').val();
            if (value !== pwd) {
                return '两次输入的密码不一致！';
            }
        }
    });
    //监听注册表单的提交事件
    $('.regUser').on('submit', function (e) {
        e.preventDefault(); //阻止默认事件 防止页面刷新
        const data = $('.regUser').serialize(); //使用serialize方法快速收集表单数据 格式为查询字符串
        regUser(data); //调用注册的ajax请求函数
    });
    //监听登录表单的提交事件
    $('.userLogin').on('submit', function (e) {
        e.preventDefault();
        const data = $('.userLogin').serialize();
        login(data);
    });

    //注册的ajax请求函数
    function regUser(data) {
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
    }
    //登录的ajax请求函数
    function login(data) {
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
    }

})
