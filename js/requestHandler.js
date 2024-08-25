    //라우터가 각 경로를 알려주면 무엇을 해야할지 알려줌
    const fs = require('fs');
    const path = require('path');
    const main_view = fs.readFileSync(path.join(__dirname, '../main.html'), 'utf-8');
    const orderlist_view = fs.readFileSync(path.join(__dirname, '../orderlist.html'), 'utf-8');
    //const main_view = fs.readFileSync('./main.html', 'utf-8');
    //const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');

    const mariadb = require('../database/connect/mariadb');

    function main(response) {
        console.log('main');

        mariadb.query("SELECT * FROM product", function(err, rows){
            console.log(rows);
        })

        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(main_view);
        response.end();
    }

    function favicon(response) {
        console.log("favicon");

        response.writeHead(200, { 'Content-Type': 'image/x-icon' });
        return response.end();
    }

    function redRacket(response) {
        fs.readFile('./img/redRacket.png', function(err, data) {
            response.writeHead(200, {'Content-Type' : 'text/html'});
            response.write(data);
            response.end();
        })
    }

    function blueRacket(response) {
        fs.readFile('./img/blueRacket.png', function(err, data) {
            response.writeHead(200, {'Content-Type' : 'text/html'});
            response.write(data);
            response.end();
        })
    }

    function blackRacket(response) {
        fs.readFile('./img/blackRacket.png', function(err, data) {
            response.writeHead(200, {'Content-Type' : 'text/html'});
            response.write(data);
            response.end();
        })
    }

    function order(response, productId) {
        response.writeHead(200, {'Content-Type' : 'text/html'});

        mariadb.query("INSERT INTO orderlist VALUES (" + productId + ", '" +new Date().toLocaleDateString()+"');", function(err, rows){
            console.log(rows);
        })
        response.write('order page');
        response.end();
    }

    function orderlist(response) {
        console.log('orderlist');
    
        mariadb.query("SELECT * FROM orderlist", function(err, rows) {
            if (err) {
                console.error(err);
                response.writeHead(500, {'Content-Type': 'text/html'});
                response.write('<p>Database error</p>');
                response.end();
                return;
            }
    
            // 테이블의 데이터 부분을 문자열로 조립
            let tableRows = '';
            rows.forEach(element => {
                tableRows += "<tr>" 
                          + "<td>" + element.product_id + "</td>"
                          + "<td>" + element.order_date + "</td>"
                          + "</tr>";
            });
    
            // 테이블 구조를 완성
            const finalHTML = `
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Order List</title>
                        <style>
                            body { font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333; }
                            h1 { text-align: center; margin-top: 30px; color: #2c3e50; }
                            table { margin-left: auto; margin-right: auto; border-collapse: collapse; width: 50%; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1); margin-bottom: 50px; }
                            th, td { border: 1px solid #ddd; padding: 10px; text-align: center; }
                            th { background-color: #34495e; color: #fff; font-weight: bold; }
                            tr:nth-child(even) { background-color: #f2f2f2; }
                            tr:hover { background-color: #ddd; }
                            a { text-decoration: none; color: #3498db; font-size: 18px; display: inline-block; margin-top: 20px; }
                            a:hover { color: #2c3e50; }
                            .link-container { text-align: center; margin-bottom: 20px; }
                        </style>
                    </head>
                    <body>
                        <h1>Order List</h1>
                        <div class="link-container">
                            <a href="./">Go Home</a>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Order Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tableRows}
                            </tbody>
                        </table>
                    </body>
                </html>
            `;
    
            // 응답 헤더와 함께 최종 HTML 응답을 전송
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(finalHTML);
            response.end();
        });
    }
    
    
    let handle = {}; // key:value (사전같은 상자)
    handle['/'] = main; // /로 찾아오면 main
    handle["/favicon.ico"] = favicon; //오류로 추가
    handle['/order'] = order;
    handle['/orderlist'] = orderlist;


    /* image directory */
    handle['/img/redRacket.png'] = redRacket;
    handle['/img/blueRacket.png'] = blueRacket;
    handle['/img/blackRacket.png'] = blackRacket;

    exports.handle = handle;