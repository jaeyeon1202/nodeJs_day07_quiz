module.exports = (app) => {

    const memberRouter = require("./member/member_router");
    
    app.use("/member",memberRouter);
    // /member 하면 memberRouter이쪽으로 연결하겠다.

    const router = require("express").Router();
    router.get("/", (req,res)=>{
        if(req.session.username){
            res.cookie("isLogin", true);
        }
        //res.send("router 연결");
        res.render("index", {username: req.session.username});
        //기본페이지에서 유저네임 세션 전달
    });
    return router;
}
//함수로 만들어서 app 내보내기