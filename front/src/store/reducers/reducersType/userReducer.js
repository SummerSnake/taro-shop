import { EDIT_USERINFO } from '../../actions/userActions';

const initState = {
  consignee: 'Vidomina', // 收货人姓名
  address: 'Erathia', // 收货人地址
  phone: '110', // 收货人电话
};

export default function (state = initState, action) {
  switch (action.type) {
    case EDIT_USERINFO: {
      return Object.keys(action.payload).length > 0 ? { ...action.payload } : state;
    }
    default:
      return state;
  }
}
