import {EventEmitter} from "events";
import  {emitProductAdded,emitProductDeleted,emitProductUpdated,emitProductSold}  from "../controllers/notificationController";

const emitter=new EventEmitter();

emitter.on("newProductAdded",emitProductAdded);
emitter.on("productDeleted",emitProductDeleted);
emitter.on("productUpdated",emitProductUpdated);
emitter.on("productSold",emitProductSold);


export default emitter;