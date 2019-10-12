const titbit = require('titbit');
const wxmsg = require('./msghandle');
const xmlparse = require('xml2js').parseString;

var app = new titbit();
var {router} = app;

router.post('/wx/msg',async c => {
    try{
        let data = await new Promise((rv,rj) => {
            xmlparse(c.body,{explicitArray:false},
                (err,result) => {
                    if(err){rj(err);}
                    else{rv(result.xml);}
                });
        });
        let retmsg = {
            touser : data.FromUserName,
            fromUserName : data.ToUserName,
            msgtype : '',
            msgtime : parseInt(Date.now() / 1000),
            msg : '欢迎关注公众号'
        };
        c.res.body = wxmsg.msgDispatch(data,retmsg);
    } catch (err) {
        console.log(err);
    }
});

app.run(8086,'localhost');