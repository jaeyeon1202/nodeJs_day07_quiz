const express = require("express"); //기 (- 라우터 연결 전)
const app = express(); //본

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
//해당하는 라우터 전에 설정해야 설정됨.
//const router = require("./src/routers/router")(app);
//이거 밑에다가 만들면 안됨 - app이 값을 못받아옴

//세션 설정
const session = require("express-session");
const sessionConfig = require("./config/cookie-session/cookie_session_config");
app.use(session(sessionConfig.sessionConfig));

//쿠키
const cookieParser = require("cookie-parser");
app.use(cookieParser())

const router = require("./src/routers/router")(app); //라우터 연결

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/", router); //미들웨어 연결
//app.get("/",(req,res) => res.send("연결")); //연 - 라우터 연결하면서 주석처리


app.listen(3000, ()=>{console.log("3000서버 연동!!")}) //결