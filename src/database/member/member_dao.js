const oracledb = require("oracledb"); //DB연동

const dbConfig = require("../../../config/database/db_config"); //dbConfig 임폴트
oracledb.autoCommit = true; //자동커밋
oracledb.outFormat = oracledb.OBJECT;
// outFormat 설정하지 않으면 2차원 배열로 들어오기 때문에,
// key, value를 사용할 수 없다.
// 설정하면 1차원 배열에 [{}, {}, ...]형식으로 들어온다.
// 즉, key, value를 사용해 정보를 가져올 수 있다.

const getMember = async (id) => {
    //연결된 객체를 얻어와야 한다.
    const con = await oracledb.getConnection(dbConfig); 

    const sql = `select * from members02 where id = '${id}'`; //작은따옴표 넣어줘야 함
    
    let member; //변수 생성
    try{
        member = await con.execute(sql);
        console.log("dao getmemeber: ", member);
    }catch(err){
        console.log("애러: ", err);
    }
    return member;
}
const memberList = async () => {
    const con = await oracledb.getConnection(dbConfig);  //디비 연결
    const sql = "select * from members02";
    return (await con.execute(sql)).rows;
}
const insert = async (body)=>{
    let con = await oracledb.getConnection(dbConfig);
    const sql = `insert into members02(id, pwd, name, addr) values(:id, :pwd, :name, :addr)`;
    let result =0;
    try{
        result = await con.execute(sql,body);
        console.log("dao insert: ", result);
    }catch(err){
        console.log(err);
    }
    return result;
}
const infoGetMember = async (mName) =>{
    const sql = "select * from members02 where id=:id";
    let con = await oracledb.getConnection(dbConfig);
    let member;
    try{
        member = await con.execute(sql, mName);
        console.log("dao getmemeber: ", member);
    }catch(err){
        console.log(err);
    }
    console.log("22222", member);
    return member.rows[0];
}
const modify = async(body) =>{
    const sql = `update members02 set pwd='${body.pwd}', name='${body.name}', addr='${body.addr}' where id = '${body.id}'`;
    let con = await oracledb.getConnection(dbConfig);
    let result=0;
    try{
        result=await con.execute(sql);
    }catch(err){
        console.log(err);
    }
    return result;
}
const memberDelete = async (body) => {
    const sql = "delete from members02 where id = :id";
    let con = await oracledb.getConnection(dbConfig);
    let result=0;
    try{
        result = await con.execute(sql, body);
    }catch(err){
        console.log(err);
    }
    return result;
}
module.exports = {memberDelete, modify, infoGetMember, insert, memberList, getMember};