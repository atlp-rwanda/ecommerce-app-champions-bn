


import response from "./response";



const getAllChat = {
  tags: ["Chat"],
  description: "list all chat messages",
  parameters: [],
  security: [
    {
      token: []
    }
  ],
  responses: response
};





    
  
 const chatRouteDoc = {
  "/api/chat/get-all-chat": {
    get:getAllChat
  }
 };

 export default chatRouteDoc;
