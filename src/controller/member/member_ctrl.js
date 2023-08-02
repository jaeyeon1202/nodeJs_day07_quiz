const ser = require("../../service/member/member_service"); //서비스 임폴트

const login = (req,res) =>{
    res.render("member/login"
                    ,{username: req.session.username});
}



const loginCheck = async (req,res) =>{
    console.log("===로그인체크(컨트롤러)===")
    console.log(req.body); //post는 res.body로 넘겨준다. //{ id: 'aaa', pwd: 'bbb' }
    const msgPack = await ser.loginCheck(req.body); //await: 기다려준다.(비동기방식을 동기방식으로)

    console.log("msgPack: ", msgPack);    
    console.log("msgPack.result: ", msgPack.result);    
    if(msgPack.result == 0){
        req.session.username = req.body.id;
    }
    res.send(msgPack.msg);
    //res.send("login check 연동");
    
}

const logout = (req,res) =>{
    req.session.destroy(); //센션 만료, 사용자가 만든 세션 전부 종료
    res.clearCookie("isLogin"); // 로그아웃하면 쿠키삭제
    res.redirect("/"); //다시 기본페이지로
}

const list = async (req,res) =>{
    const mList = await ser.memberList(); //서비스에서 멤버리스트 가져오기
    res.render("member/list" ,{username: req.session.username, list:mList});
    //회원정보(list)-헤더파일에도 세션 필요~
    //헤어파일에서 username을 쓰고있어서 {username: req.session.username}를 전달해야 함.
    // 리스트도 뷰즈 파일로 전달
}
const registerForm = (req,res) =>{
    res.render("member/register_form", {username: req.session.username});
}
const register = async (req,res) =>{
    console.log("register", req.body);
    let msg = await ser.insert(req.body);
    res.send(msg);
}
const info = async (req,res) =>{
    console.log("123",req.query);
    const member = await ser.getMember(req.query);
    console.log("리스트", member);
    res.render("member/info", {member,username: req.session.username});
}
const modify_form = async(req,res)=>{
    console.log("ctrl modify(쿼리): ", req.query);
    console.log("ctrl modify(파람스): ", req.params);
    console.log("ctrl modify(바디): ", req.body);

    const member = await ser.getMember(req.query);
    console.log("ctrl modify(겟멤버): ", member);

    res.render("member/modify_form", {member, username: req.session.username});
}
const modify = async (req,res) =>{
    console.log("컨트롤러 모바파이: ",req.body);
    const msg = await ser.modify(req.body);
    res.send(msg);
}
const memberDelete = async (req,res) =>{  
    console.log(req.query);
    const msg = await ser.memberDelete(req.query);
    res.send(msg);
}
module.exports = {memberDelete, modify, modify_form, info, register, registerForm, list, logout, loginCheck, login};
