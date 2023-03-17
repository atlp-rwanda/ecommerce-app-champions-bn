const buyerSignup = {
    tags:["Users"],
    description: "create a buyer",
    requestBody:{
        content:{
            "Application/json":{
                schema:{
                    type:"object",
                    properties:{
                        firstName:{
                            type:"string",
                            description:" first name of a buyer",
                            example:"umuntu"
                        },
                        lastName:{
                            type:"string",
                            description:"Last name of a buyer",
                            example:"Person",
                        },
                        email:{
                            type:"email",
                            description:"email of buyer",
                            example:"umuntu@gmail.com"
                        },
                        password:{
                            type:"string",
                            description:"password of buyer",
                            example:"1234567@password",
                        },
                      
                    },
                },
            },
        },
    },

  responses:{
        201:{
            description:"OK",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                    },
                },
            },
        },
    },
  };



  const userRouteDoc = {
    "/api/buyer/signup": {
        post:buyerSignup
    }
   
};

export default userRouteDoc;