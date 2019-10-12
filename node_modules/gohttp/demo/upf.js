const hcli = require('../httpcli');

hcli.upload('https://localhost:2021/upload', {
    method: 'PUT',
    files : {
        file : [
            //'/home/wy/c/a.c',
            //'/home/wy/c/daet.c',

            '/home/wy/tmp/机灵小不懂E20.mkv'
        ]
    }
}).then(d => {
    console.log(d);
}, err => {
    console.log(err);
});