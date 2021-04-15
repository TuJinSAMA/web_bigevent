$(function () {
    //定义一个参数对象 作为获取文章列表请求的参数
    const queryObj = {
        pagenum: 1, //页码
        pagesize: 2, //每页显示几条数据 
        cate_id: '', //文章类别
        state: '' //文章的状态
    };
    //时间格式过滤器
    template.defaults.imports.dataFormat = function (date) {
        const time = new Date(date);
        const y = time.getFullYear();
        const m = padZero(time.getMonth() + 1);
        const d = padZero(time.getDate());
        const hh = padZero(time.getHours());
        const mm = padZero(time.getMinutes());
        const ss = padZero(time.getSeconds());
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    }
    initPage(queryObj); //调用初始化页面函数 获取文章列表
    getCates(); //调用获取文章类别函数 
    // 给筛选表单添加监听提交事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        //改变参数对象中的类别、状态的值
        queryObj.cate_id = $('[name=cate_id]').val();
        queryObj.state = $('[name=state').val();
        initPage(queryObj); //再次调用函数获取文章列表
    });
    // 使用事件委托监听删除按钮的点击事件
    $('#artList').on('click', '.delArt', function () {
        const artId = $(this).attr('data-id'); //获取被点击按钮的id值
        delArt(artId);//调用删除文章函数
    });
    // 使用事件委托监听编辑按钮的点击事件
    $('#artList').on('click', '.editArt', function () {
        const artId = $(this).attr('data-id'); //获取被点击按钮的id值
        location.href = './../../../article/art_edit.html?' + artId; //跳转到修改文章页面
    });
    //初始化页面//获取文章列表
    function initPage(data) {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: data,
            success: res => {
                if (res.status) return layui.layer.msg(res.message);
                const htmlStr = template('tpl-table', res);
                $('#artList').html(htmlStr);
                renderPage(res.total);//调用分页器渲染函数
            }
        })
    }
    //获取文章类别函数
    function getCates() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: res => {
                if (res.status) return layui.layer.msg(res.message);
                const htmlStr = template('catesOption', res);
                $('[name=cate_id]').html(htmlStr);
                layui.form.render();//更新渲染layui的所有表单
            }
        });
    }
    // 渲染分页器函数
    function renderPage(page) {
        // 调用 laypage.render() 方法来渲染分页的结构
        layui.laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: page, // 总数据条数
            limit: queryObj.pagesize, // 每页显示几条数据
            curr: queryObj.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'], //自定义排版分页器显示的内容
            limits: [2, 3, 5, 10], //每页条数的选择项
            //当点击了页码 则触发jump事件
            jump: function (obj, first) {
                queryObj.pagesize = obj.limit; //改变参数对象中每页显示的条数
                queryObj.pagenum = obj.curr; //改变参数对象中当前页的页码
                // 当触发jump的条件是通过layui.laypage.render()方法时 first的值为true
                // 当触发jump的条件是点击分页器或其他触发 first的值为undefined
                if (!first) {
                    initPage(queryObj);//调用获取文章列表函数
                }
            }
        });
    }
    //通过id删除文章函数
    function delArt(id) {
        $.ajax({
            method: 'GET',
            url: '/my/article/delete/' + id,
            success: res => {
                if (res.status) return layui.layer.msg(res.message);
                layui.layer.msg(res.message);
                //判断当前页面是否还有数据 如果没有数据则让页码-1再获取文章列表且页码最小为1
                if ($('.delArt').length === 1) {
                    queryObj.pagenum = queryObj.pagenum === 1 ? 1 : queryObj.pagenum - 1;
                }
                initPage(queryObj);//调用获取文章列表函数
            }
        });
    }
});
//补零函数
function padZero(num) {
    return num < 10 ? '0' + num : num;
}