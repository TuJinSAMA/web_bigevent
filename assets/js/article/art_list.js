$(function () {
    const queryObj = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    };
    template.defaults.imports.dataFormat = function (date) {
        return date.slice(0, 19);
    }
    // template.defaults.imports.dataFormat = function (date) {
    //     const time = new Date(date);
    //     const y = time.getFullYear();
    //     const m = padZero(time.getMonth() + 1);
    //     const d = padZero(time.getDate());
    //     const hh = padZero(time.getHours());
    //     const mm = padZero(time.getMinutes());
    //     const ss = padZero(time.getSeconds());
    //     return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    // }
    initPage(queryObj);
    getCates();
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        queryObj.cate_id = $('[name=cate_id]').val();
        queryObj.state = $('[name=state').val();
        initPage(queryObj);
    });
    $('#artList').on('click', '.delArt', function () {
        const artId = $(this).attr('data-id');
        delArt(artId);
    });
    $('#artList').on('click', '.editArt', function () {
        const artId = $(this).attr('data-id');
        location.href = './../../../article/art_edit.html?' + artId;
        // getArtForId(artId);
    });

    function initPage(data) {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: data,
            success: res => {
                if (res.status) return layui.layer.msg(res.message);
                const htmlStr = template('tpl-table', res);
                $('#artList').html(htmlStr);
                renderPage(res.total);
            }
        })
    }
    function getCates() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: res => {
                if (res.status) return layui.layer.msg(res.message);
                const htmlStr = template('catesOption', res);
                $('[name=cate_id]').html(htmlStr);
                layui.form.render();
            }
        })
    }
    function renderPage(page) {
        // 调用 laypage.render() 方法来渲染分页的结构
        layui.laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: page, // 总数据条数
            limit: queryObj.pagesize, // 每页显示几条数据
            curr: queryObj.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            //当点击了页码 则触发jump事件
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                queryObj.pagesize = obj.limit;
                queryObj.pagenum = obj.curr;
                //首次不执行
                if (!first) {
                    initPage(queryObj);
                }
            }
        })
    }
    function delArt(id) {
        $.ajax({
            method: 'GET',
            url: '/my/article/delete/' + id,
            success: res => {
                if (res.status) return layui.layer.msg(res.message);
                layui.layer.msg(res.message);
                if ($('.delArt').length === 1) {
                    queryObj.pagenum = queryObj.pagenum === 1 ? 1 : queryObj.pagenum - 1;
                }
                initPage(queryObj);
            }
        });
    }
    function getArtForId(id) {
        $.ajax({
            method: 'GET',
            url: '/my/article/' + id,
            success: res => {
                if (res.status) return layui.layer.msg(res.message);
            }
        })
    }
});
function padZero(num) {
    return num < 10 ? '0' + num : num;
}