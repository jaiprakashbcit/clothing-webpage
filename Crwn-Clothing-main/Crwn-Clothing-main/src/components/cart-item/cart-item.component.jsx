import { useDispatch, useSelector } from 'react-redux';

import { clearItemFromCart } from '../../store/cart/cart.slice';
import { selectCartItems } from '../../store/cart/cart.selector';

import './cart-item.styles.scss';

function CartItem({ cartItem }) {
  const { name, imageUrl, quantity, priceByQuantity } = cartItem;

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  function clearProductFromCart() {
    dispatch(clearItemFromCart(cartItem, cartItems));
  }

  return (
    <div className="cart-item-container">
      <img
        src={imageUrl}
        alt={`${name}`}
      />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="quantity">Qty: {quantity}</span>
        <span className="price">Total: ${priceByQuantity}</span>
      </div>
      <div
        className="clear-product-from-cart"
        onClick={clearProductFromCart}>
        &#10005;
      </div>
    </div>
  );
}

export default CartItem;
