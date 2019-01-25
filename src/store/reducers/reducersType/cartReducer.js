import { ADD_TO_CART, DELETE_FROM_CART } from "../../actions/cartActions";

const initState = {
  totalMoney: 0, // 订单总价
  badgeNum: 0, // 购物车右上角图标数字
  cart: [] // 购物车商品列表
};

/**
 * 添加商品
 * @param state
 * @param action
 */
function addToCart(state, action) {
  const cloneCart = [...state.cart];
  let notInArr = true;
  let totalMoney = 0;
  let badgeNum = 0;
  // 如果订单中不存在该商品，则加入订单
  if (cloneCart.length > 0) {
    cloneCart.map((proOne) => {
      if (proOne.id === action.payload.id) {
        notInArr = false;
      }
    });
    if (notInArr) {
      cloneCart.push({ ...action.payload, num: 0 });
    }
  } else {
    cloneCart.push({ ...action.payload, num: 0 });
  }
  // 如果订单中存在该商品，则数量+1
  cloneCart.map((proTwo) => {
    if (proTwo.id === action.payload.id) {
      proTwo.num += 1;
    }
    badgeNum += proTwo.num;
    totalMoney += proTwo.price * proTwo.num;
  });
  return {
    ...state,
    totalMoney,
    badgeNum,
    cart: cloneCart
  };
}

/**
 * 减少删除商品
 * @param state
 * @param action
 */
function deleteFromCart(state, action) {
  const cloneCartDel = [...state.cart];
  let totalMoney = 0;
  let badgeNum = 0;
  cloneCartDel.map((deletePro, deleteIndex) => {
    if (deletePro.id === action.payload.id && deletePro.num >= 1) {
      deletePro.num -= 1;
      // // 商品计数为0，删除商品
      if (deletePro.num === 0) {
        cloneCartDel.splice(deleteIndex, 1);
      }
    }
  });
  cloneCartDel.map(item => {
    badgeNum += item.num;
    totalMoney += item.price * item.num;
  });
  return {
    ...state,
    totalMoney,
    badgeNum,
    cart: cloneCartDel
  };
}

export default function (state = initState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      return addToCart(state, action);
    }
    case DELETE_FROM_CART: {
      return deleteFromCart(state, action);
    }
    default:
      return state;
  }
}
