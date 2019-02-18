const EDIT_USERINFO = 'EDIT_USERINFO';

/**
 * 编辑个人信息
 * @param name
 * @param address
 * @param phone
 */
function editUserInfo(name, address, phone) {
  return {
    type: EDIT_USERINFO,
    payload: { name, address, phone }
  };
}

export { EDIT_USERINFO, editUserInfo};
