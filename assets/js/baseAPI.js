$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    if (options.url.includes('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        };
        options.complete = function (res) {
            // console.log(res.responseJSON);
            if (res.responseJSON.status !== 0) {
                const { layer } = layui;
                layer.msg(res.responseJSON.message);
                localStorage.removeItem('token');
                setTimeout(function () {
                    location.href = './../../login.html';
                }, 1000);
            }
        }
    }
})