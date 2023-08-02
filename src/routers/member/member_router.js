//멤버 라우터에서 멤버로 들어오는값 처리

const router = require("express").Router();//기본연결

const memberCtrl = require("../../controller/member/member_ctrl"); //컨트롤러 연결

//router.get("/", (req,res)=>{res.send("member 연동")}) //라우터 연동 확인
router.get("/login", memberCtrl.login);

router.post("/login_check", memberCtrl.loginCheck);
router.get("/logout", memberCtrl.logout);
router.get("/list", memberCtrl.list);
router.get("/register_form", memberCtrl.registerForm);
router.post("/register", memberCtrl.register);
router.get("/info", memberCtrl.info);
router.get("/modify_form", memberCtrl.modify_form);
router.post("/modify", memberCtrl.modify);
router.get("/delete", memberCtrl.memberDelete);

module.exports = router;//라우터 내보내기