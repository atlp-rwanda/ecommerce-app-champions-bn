/* eslint-disable*/
export const validate = (schema) => {
    return(req,res,next) =>{
        const {error} = schema.validate(req.body);
        if(error){
            const errorMsg = error.details[0].message.replace(/[/"]+/g, '');
            return res.status(401).json({
                status:"error",
                message:errorMsg
            });
        }
        next();
    }
};
