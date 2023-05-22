import response from "./response";

const getNotifications = {
    tags: ["Notifications"],
    summary: "Get all noifications",
    description: "Retrieves a list of all notifications.",
    security: [
      {
        token: []
      }
    ],
    responses:response
  };
  const getBuyerNotifications = {
    tags: ["Notifications"],
    summary: "Get all noifications",
    description: "Retrieves a list of all buyer notifications.",
    security: [
      {
        token: []
      }
    ],
    responses:response
  };

  const deleteNotification = {
    tags: ["Notifications"],
    description: "delete notification",
    security: [
      {
        token: []
      }
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        description: "id of notification",
        type: "integer",
        example: 1
      }
    ],
    responses: response
  };
  const markAllNotification = {
    tags: ["Notifications"],
    description: "Mark all notifications as read",
    security: [
      {
        token: []
      }
    ],
    responses: response
  };
  const markOneNotification = {
    tags: ["Notifications"],
    description: "Mark one notification as read",
    responses: response
  };
  const markOneBuyerNotification = {
    tags: ["Notifications"],
    description: "Mark one notification as read",
    responses: response
  };
  const ntificationRouteDoc={
    "/api/notification/getNotifications":{
        get:getNotifications
    },
    "/api/notification/deleteNotifications/{id}":{
        delete:deleteNotification
    },
    "/api/notification/markAll":{
      patch:markAllNotification
    },
  "/api/notification/markOne":{
    patch:markOneNotification
},
"/api/notification/markOneBuyer":{
  patch:markOneBuyerNotification
},
"/api/notification/getBuyerNotifications":{
  get:getBuyerNotifications
},
  };

  export default ntificationRouteDoc;