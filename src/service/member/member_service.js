// 연산은 service
const memberDAO = require("../../database/member/member_dao");

const loginCheck = async (body) =>{
    //select * from m where id =id
    //id=id 일치하면 회원정보 없으면 데이터 못 가져와
    //해당하는 아이디가 있으면 사용자 가져오고 없으면 못가져와
    let member = await memberDAO.getMember(body.id); 
    console.log("=== 서비스 로그인체크 ===");
    //해당하는 아디가 있으면 rows: [ { ID: 'h', PWD: 'h', NAME: 'h', ADDR: 'h' } ]
    //없으면 rows: [] 
    console.log(member); //metaData, rows
    let msg ="", url="", msgPack={}; //msgPack={} => 배열

    if(member.rows.length === 1){
        member = member.rows[0]; // rows: [ { ID: 'h', PWD: 'h', NAME: 'h', ADDR: 'h' } ]
        if(member.PWD == body.pwd){ //로그인성공 (member.rows[0].PWD == body.pwd)
            msg = member.NAME+"님 환영합니다!!"; //member.rows[0].NAME
            url= "/"; //기본경로
            //msgPack = {result:0}
            msgPack.result = 0;
        }else{ //비번틀림
            msg = "비밀번호가 틀렸습니다!!";
            url = "/member/login";
        }
    }else{ //해당하는 id가 존재하지 않는 경우
        msg="해당하는 id는 존재하지 않습니다ㅠ";
        url="/member/login"; //다시 로그인으로 연결
    }
    //msgPack = {msg: "<sc"} ksy는 msg, vlaue는 스크립트
    msgPack.msg = getMessage(msg, url); //key와 value를 따로 만들기 위해서
    return msgPack; //연동확인
}
const getMessage = (msg, url) => { //메세지 만들어주주는 함수
    return `<script>
                alert("${msg}");
                location.href="${url}";
            </script>`;
}
const memberList = () =>{
    return memberDAO.memberList();
}
const insert = async(body) =>{
    const result = await memberDAO.insert(body);
    console.log("service insert =>", result);
    let msg ="", url="";
    if(result==0){
        msg="문제발생";
        url="/member/register_form";
    }else{
        msg="등록 성공";
        url="/member/list";
    }
    const msgPack = getMessage(msg, url);
    return msgPack;
}
const getMember = (mName) =>{
    console.log(mName);
    return memberDAO.infoGetMember(mName);
}
const modify = async (body) =>{
    const result = await memberDAO.modify(body);
    let msg = "", url="";
    if(result==0){
        msg="문제발생";
        url="/member/modify_form?id="+body.id;
    }else{
        msg="수정되었습니다";
        url="/member/info?id="+body.id; //
    }
    return getMessage(msg,url);
}
const memberDelete = async (body) => {
    const result = await memberDAO.memberDelete(body);
    let msg="", url="";
    if(result==0){
        msg="문제발생";
        url="/member/info?id="+body.id;
    }else{
        msg="삭제 성공";
        url = "/member/list";
    }
    return getMessage(msg,url);
}
module.exports = {memberDelete, modify, getMember, insert, memberList, loginCheck};