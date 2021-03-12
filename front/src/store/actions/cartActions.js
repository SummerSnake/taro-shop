const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';

/**
 * @desc 添加商品
 * @param id 商品id
 * @param name 商品名字
 * @param price 商品价格
 */
function addToCart(id, name, price) {
  return {
    type: ADD_TO_CART,
    payload: { id, name, price },
  };
}

/**
 * @desc 减少删除商品
 * @param id 商品
 */
function deleteFromCart(id) {
  return {
    type: DELETE_FROM_CART,
    payload: { id },
  };
}

export { ADD_TO_CART, DELETE_FROM_CART, addToCart, deleteFromCart };
