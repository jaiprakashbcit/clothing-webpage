import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { setIsCartOpen } from '../../store/cart/cart.slice';
import { selectIsCartOpen, selectTotalCartPrice, selectCartItems } from '../../store/cart/cart.selector';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import './cart-dropdown.styles.scss';

function CartDropdown() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartItems = useSelector(selectCartItems);
  const cartTotalPrice = useSelector(selectTotalCartPrice);

  function handleGoToCheckout() {
    navigate('/checkout');
    dispatch(setIsCartOpen(!isCartOpen));
  }

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length > 0 &&
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              cartItem={item}
            />
          ))}
      </div>
      {cartItems.length ? (
        <Fragment>
          <span className="total-cart-price">Cart Total: ${cartTotalPrice}</span>
          <Button
            type="button"
            onClick={handleGoToCheckout}>
            Got to checkout
          </Button>
        </Fragment>
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
  );
}

export default CartDropdown;
