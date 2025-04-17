import { useDispatch, useSelector } from 'react-redux';

import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.slice';

import { ReactComponent as ShoppingCartIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

function CartIcon() {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  function toggleCartDropdown() {
    dispatch(setIsCartOpen(!isCartOpen));
  }

  return (
    <div
      className="cart-icon-container"
      onClick={toggleCartDropdown}>
      <ShoppingCartIcon className="shopping-cart-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
}

export default CartIcon;
