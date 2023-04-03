import {EventEmitter} from "events";
import  {emitProductAdded,emitProductDeleted}  from "../controllers/notificationController";

const emitter=new EventEmitter();

emitter.on("newProductAdded",emitProductAdded);


export default emitter;