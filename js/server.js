let http = require('http');
let url = require('url');
const { route } = require('./router');

function start(route, handle) {
    function onRequest(request, response) {
        let pathname = url.parse(request.url).pathname;
        let queryData = url.parse(request.url, true).query;

        route(pathname, handle, response, queryData.productId);
    }
    //queryData는 alert를 대신함
    http.createServer(onRequest).listen(8888);
    console.log("Server has started on http://localhost:8888");
    // localhost:8888
}

exports.start = start;
//외부에서 start를 사용할 수 있도록 함!
//외부의 start 함수에게 이 파일 내의 start로 실행될 수 있게 함!