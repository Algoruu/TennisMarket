function route(pathname, handle, response, productId) {
    console.log('pathname : ' + pathname);

    if (typeof handle[pathname] == 'function') {
        handle[pathname](response, productId);
    } else {
        response.writeHead(404, {'Content-Type' : 'text/html'});
        response.write('Not Found');
        response.end();
    }
    
    //함수처럼 사용하기 위해 마지막에 ()를 넣어줌
}

exports.route = route;
//이 루트 함수를 외부에서도 사용함