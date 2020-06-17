var express = require('express');
var path = require('path');
var app = express();
var mysql = require('mysql');

sql_config = {
    host: 'localhost' ,
    user: 'root',
    password: '1234',
    database: 'o2'
}

var db = mysql.createConnection(sql_config);
db.connect();

app.set('views', path.resolve(__dirname + '/views'));
app.set('view engine' , 'ejs')
// console.log(path.join(__dirname , '/views'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/hello' , (request, response)=> {
    // console.log(request);
    response.render('hello.ejs');
    
    var name = "grace";
    response.render('hello.js', {data:name})
});

app.get('/data', (req, res)=>{
    var sql = 'SELECT * FROM topic ';
    db.query(sql , (err , result)=>{
        if(err) {
            console.log(err);
        } else {
            console.log(result);
            // res.send(result[0].author+' 수업은 '+result[0].title);
            // res.send(`${result[0].author} 수업은 ${result[0].title}`);
            res.render('data', {
                message : "" ,
                data: result
            });
        }
    })
})
var port = 8000;

app.listen(port, ()=> {
    console.log(`Server is Running at http://localhost:${port}`);

});