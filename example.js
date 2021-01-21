var express = require('express'); 
var bodyParser = require('body-parser'); 
var app = express(); 

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({extended : true})); 
app.set('view engine', 'ejs');//ejs 템플릿 엔진  연동 



// route setting - 라우팅(routing) 
app.get('/', function (req, res) { 
   //res.send('Hello World!'); 
    var data = req.body;
    console.log('111');
    res.render('index', {name: '?'});//views디렉토리안에 있는 index.ejs 파일 
});

app.post('/', function (req, res) { 
    console.log('222');
   var data = req.body.name; 
   res.render('index', {name: data}); 
});

//===== 라우팅 함수 등록 =====//

// 라우터 객체 참조
var router = express.Router();

// 로그인 라우팅 함수 - 데이터베이스의 정보와 비교
router.get('/process', function(req, res){
	user.find(function(err, products){
        
        res.render('product', {})
    }

	// 요청 파라미터 확인
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
	
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
	
    // 데이터베이스 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
	if (database) {
		authUser(database, paramId, paramPassword, function(err, docs) {
			if (err) {throw err;}
			
            // 조회된 레코드가 있으면 성공 응답 전송
			if (docs) {
				console.dir(docs);

                // 조회 결과에서 사용자 이름 확인
				var username = docs[0].name;
				
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인 성공</h1>');
				res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
				res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
				res.end();
			
			} else {  // 조회된 레코드가 없는 경우 실패 응답 전송
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인  실패</h1>');
				res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
				res.end();
			}
		});
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
		res.end();
	}
	
});


var mongoose = require('mongoose');
var database;
var UserSchema;
var UserModel;

function connectDB() {
	// 데이터베이스 연결 정보
	var databaseUrl = 'mongodb+srv://ehdqoddl6:0000@study.cbjjc.mongodb.net/project?retryWrites=true&w=majority';
	 
	// 데이터베이스 연결
    console.log('데이터베이스 연결을 시도합니다.');
    mongoose.Promise = global.Promise;  // mongoose의 Promise 객체는 global의 Promise 객체 사용하도록 함
	mongoose.connect(databaseUrl);
	database = mongoose.connection;
	
	database.on('error', console.error.bind(console, 'mongoose connection error.'));	
    
	database.on('open', function () {
		console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);
		

		// 스키마 정의
		UserSchema = mongoose.Schema({
			id: String,
			name: String,
			password: String
		});
		console.log('UserSchema 정의함.');
		
		// UserModel 모델 정의
		UserModel = mongoose.model("users", UserSchema);
		console.log('UserModel 정의함.');
		
	});
    
    // 연결 끊어졌을 때 5초 후 재연결
	database.on('disconnected', function() {
        console.log('연결이 끊어졌습니다. 5초 후 재연결합니다.');
        setInterval(connectDB, 5000);
    });
}


app.listen(3000, function(){ 
    console.log('App Listening on port 3000'); 
    connectDB();
});




