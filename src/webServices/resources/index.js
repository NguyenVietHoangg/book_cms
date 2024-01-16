import server from "../../configs/connectServer";
import common from "./commonResource";
import product from "./productResource";
import category from "./categoryResource";
import collection from "./collectionResource";
import media from "./mediaResource";
import setting from "./settingResource";
import auth from "./authResource";
import menu from "./menuResource"
import permission from "./permissionResource"

export const connectServer = server;
export const commonResource = common;
export const productResource = product;
export const categoryResource = category;
export const collectionResource = collection;
export const mediaResource = media;
export const settingResource = setting;
export const authResource = auth;
export const menuResource = menu;
export const permissionResource = permission;
export default {
  connectServer,
  commonResource,
  productResource,
  categoryResource,
  collectionResource,
  settingResource,
  authResource,
  menuResource,
  permissionResource
};
