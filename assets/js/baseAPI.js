$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    if (options.url.includes('/my/')) {
        options.headers = {
            Authorization: localStorage.token || ''
        };
        options.complete = function ({ responseJSON: { status, message } }) {
            // console.log(res.responseJSON);
            if (status === 1 && message === '身份认证失败！') {
                localStorage.removeItem('token');
                location.href = './../../login.html';
            }
        }
    }
})