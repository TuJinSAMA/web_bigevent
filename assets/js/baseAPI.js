$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    if (options.url.includes('/my/')) {
        options.headers = {
            Authorization: localStorage.token || ''
        };
        options.complete = function (res) {
            // console.log(res.responseJSON);
            if (res.responseJSON.status !== 0) {
                localStorage.removeItem('token');
                location.href = './../../login.html';
            }
        }
    }
})