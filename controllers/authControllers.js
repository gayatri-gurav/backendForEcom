const adminModel = require('../models/adminModel')
const { responsereturn } = require('../utiles/response')
const bcrypt = require('bcrypt')
const { createToken } = require('../utiles/tokenCreate')

class authControllers{
    admin_login = async(req,res) => {
        console.log(req.body)
        const {email,password} = req.body
        try{
           const admin = await adminModel.findOne({email}).select('+password')
           console.log(admin)

        if(admin){
           const match = await bcrypt.compare(password,admin.password)
           console.log(match)

           if(match){
               const token = await createToken({
                  id: admin.id,
                  role: admin.role
               })
               res.cookie('accessToken',token,{
                 expires: new Date(Date.now() + 7*24*60*60*1000)
               })
               responsereturn(res,200,{token,message:"Login Success"})
           }else{
            responsereturn(res,404,{error:"Password Wrong"})
           }

        }else{
            responsereturn(res,404,{error:"Email not Found"})
        }


        }catch(error){
              responsereturn(res,500,{error:error.message})
        }
    }
}

module.exports = new authControllers()