/* eslint-disable*/
export const validate = (schema) => {
    return(req,res,next) =>{
        const {error} = schema.validate(req.body);
        if(error){
            const errorMsg = error.details[0].message.split('\"');
            return res.status(401).json({
                status:"error",
                message:errorMsg[1]+errorMsg[2]
            });
        }
        next();
    }
};