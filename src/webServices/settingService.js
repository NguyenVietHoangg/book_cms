import { connectServer, settingResource } from "./resources"

export const getSettingAppInfo = async (filters = {}) => {
  let {method, url} = settingResource.GET_SETTING_APP_INFO
  url = `${url}`
  return await connectServer[method](url, filters)
}

export const saveSettingAppInfo = async (data = {}, opts = {}) => {
  let {method, url} = settingResource.SAVE_SETTING_APP_INFO
  url = `${url}/${data.id ? data.id : 'new'}?&tab=${data.tab || ''}`
  return await connectServer[method](url, {data: data}, opts)
}


export default {
  getSettingAppInfo,
  saveSettingAppInfo,
}