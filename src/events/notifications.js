/* eslint-disable import/no-cycle */
import { EventEmitter } from "events";
import {
  emitProductAdded,
  emitProductDeleted,
  emitProductUpdated,
  emitProductSold,
  emitWishlistAdded
} from "../controllers/notificationController";

const emitter = new EventEmitter();

emitter.on("newProductAdded", emitProductAdded);
emitter.on("productDeleted", emitProductDeleted);
emitter.on("productUpdated", emitProductUpdated);
emitter.on("productSold", emitProductSold);
emitter.on("wishlistAdded", emitWishlistAdded);
export default emitter;
