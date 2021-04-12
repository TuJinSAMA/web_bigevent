$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    if (options.url.includes('/my/')) {
        options.headers = {
            Authorization: localStorage.token || ''
        };
        options.complete = function ({ responseJSON: { status } }) {
            // console.log(res.responseJSON);
            if (status !== 0) {
                localStorage.removeItem('token');
                location.href = './../../login.html';
            }
        }
    }
})