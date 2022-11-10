const { responseHelper } = require('../../helpers');
const { bcrypt,jwt } = require('../../utils')
const userService = require('./user.service');
const bucket = require('../../utils/s3helper');

exports.Register = async(req,res,next) => {
    try {
        const token = req.params.token;
        const email = jwt.parseToken(token);
        //verify token
        await jwt.verifyToken(token);

        //find user
        const user = await userService.findUser(email)

        if(!user) {
            responseHelper.fail(res,'User not found');            
        };

        if(user) {
            //user reg pending
                    //hash password
                    req.body.password = await bcrypt.hashPassword(req.body.password);

                    //user details
                    await userService.addUser(email,req.body);

                    //upload profile image
                    if(req.files) {
                        //check img params
                        const img = req.files.image;
                        const key = email.substring(0, email. lastIndexOf('@'));

                        if(img.mimetype === 'image/jpeg') {

                            await bucket.upload(img,key);
                            await userService.addImageKey(email,key); 
                        
                        } else {
                            responseHelper.fail(res,'Check content type of the file')
                        };
                    ;}
                    
                    //get response
                    const userData = await userService.getResponse(email);
                    responseHelper.success(res,userData,'User registered successfully'); 

        }; 
         
    } catch(error) {
        //next(error);
        next(responseHelper.fail(res,`${error}`));
    }
}; 

exports.login =  async(req,res,next) => {
    try {
        
        const { body } = req;
        const response = await userService.login(body);
        return responseHelper.success(res,response);

    } catch(err) {
        next(responseHelper.fail(res,`${err}`));
    }
};


