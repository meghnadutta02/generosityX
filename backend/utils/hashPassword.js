const bcrpyt=require("bcryptjs");
const salt=bcrpyt.genSaltSync(10);
const hashPassword=password=>{return bcrpyt.hashSync(password,salt)};
const comparePasswords=(inputPass,hashedPass)=>
{
    return bcrpyt.compareSync(inputPass,hashedPass)
}
module.exports={hashPassword,comparePasswords};