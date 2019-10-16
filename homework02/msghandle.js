const formatMsg = require('./fmtwxmsg');

function help(){
    return '你好，这是一个测试号，目前会原样返回用户输入的信息，暂时不支持视频信息';
}

/*
 * @param {onject} wxmsg 解析XML消息的对象
 * @param {object} retmsg 要返回的数据对象
*/
function userMsg(wxmsg,retmsg){
    //关键字自动回复
    if(wxmsg.MsgType == 'text'){
        switch(wxmsg.Content){
            case '帮助':
            case 'help':
            case '?':
            case '？':
                retmsg.msg = help();
                retmsg.msgtype = 'text';
                return formatMsg(retmsg);
            case 'about':
                retmsg.msgtype = 'text';
                retmsg.msg = '我是这个测试号的开发者,如果有问题请输入"help"、"？"或者"帮助"，输入"who"可以得到开发者信息';
                return formatMsg(retmsg);
            case 'who':
                retmsg.msgtype = 'text';
                retmsg.msg = '开发者信息\n姓名：李爽\n学号：2017012056\n班级：8班';
                return formatMsg(retmsg);
            default:
                retmsg.msgtype = 'text';
                retmsg.msg = wxmsg.Content;
                return formatMsg(retmsg);
        }
    }
    //处理其他类型的消息
    switch(wxmsg.MsgType){
        case 'image':
        case 'voice':
            retmsg.msgtype = wxmsg.MsgType;
            retmsg.msg = wxmsg.MediaId;
            return formatMsg(retmsg);
        default:
            return formatMsg(retmsg);
    }
}

//处理事件信息
function eventMsg(wxmsg,retmsg){
    retmsg.msgtype = 'text';
    switch(wxmsg.Event){
        case 'subscribe':
            retmsg.msg='你好，这是一个测试号，欢迎关注'
            return formatMsg(retmsg);
        case 'unsubscribe':
            console.log(wxmsg.FromUserName,'取消关注');
            break;
        case 'CLICK':
            retmsg.msg = wxmsg.EventKey;
            return formatMsg(retmsg);
        case 'VIEW':
            console.log('用户浏览',wxmsg.EventKey);
            break;
        default:
            return '';
    }
}

exports.help = help;
exports.userMsg = userMsg;
exports.eventMsg = eventMsg;

//引入模块
exports.msgDispatch = function(wxmsg,retmsg){
    if(wxmsg.MsgType == 'event'){
        return eventMsg(wxmsg,retmsg);//处理事件消息
    }
    return userMsg(wxmsg,retmsg);//处理用户消息
}