const gohttp = require('gohttp');
const wxkey = require('./wxkey');

var token_api = `https://api.weixin.qq.com/cgi-bin/token`
    +`?grant_type=client_credential`
    +`&appid=${wxkey.appid}&secret=${wxkey.secret}`;

// gohttp.get(token_api).then(d => {
//     console.log(d);
// });

var menu_data = {
    button : [
        {
            name : '发图',
            sub_button : [
                {
                    name : '系统相机拍照',
                    type : 'pic_sysphoto',
                    key : 'pic-photo-01',
                },
                {
                    name : '拍照或相册选择',
                    type : 'pic_photo_or_album',
                    key : 'pic-photo-02',
                },
                {
                    name : '微信相册',
                    type : 'pic_weixin',
                    key : 'pic-photo-03',
                }
            ]
        },
        {
            name : "Linux",
            type : 'view',
            url : "https://www.linux.org"
        },
        {
            name : '关于我们',
            type : "click",
            key : "about-us"
        }
    ]
};

(async function createMenu(){
    let ret = await gohttp.get(token_api);
    let t = JSON.parse(ret);
    //如果没有成功获取access_token则输出错误信息并退出
    if(t.access_token === undefined){
        console.log(ret);
        console.exit(-1);
    }

    var create_menu_api = `https://api.weixin.qq.com/cgi-bin/menu/create`
        +`?access_token=${t.access_token}`;
    ret = await gohttp.post(create_menu_api,{
        body : menu_data,
        headers : {
            //此扩展的消息头的key值都应该是小写
            'content-type' : 'text/plain'
        }
    });
    //输出处理结果
    console.log(ret);
})();