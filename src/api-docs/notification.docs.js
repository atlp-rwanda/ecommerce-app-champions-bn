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


  const ntificationRouteDoc={
    "/api/notification/getNotifications":{
        get:getNotifications
    },
    "/api/notification/deleteNotifications/{id}":{
        delete:deleteNotification
    }
  };

  export default ntificationRouteDoc;