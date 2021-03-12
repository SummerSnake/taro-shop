const EDIT_USERINFO = 'EDIT_USERINFO';

/**
 * @desc 编辑个人信息
 * @param consignee
 * @param address
 * @param phone
 */
function editUserInfo(consignee, address, phone) {
  return {
    type: EDIT_USERINFO,
    payload: { consignee, address, phone },
  };
}

export { EDIT_USERINFO, editUserInfo };
