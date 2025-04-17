import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Link, useNavigate } from 'react-router-dom';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { signOutUser } from '../../utils/firebase/firebase.utility';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import './navigation-bar.styles.scss';

function NavigationBar() {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  function goToSignIn() {
    navigate('/auth');
  }

  function handleSignOut() {
    signOutUser();
  }

  return (
    <Fragment>
      <div className="navigation">
        <Link
          className="logo-container"
          to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          {currentUser && currentUser.displayName && (
            <span className="welcome-user-nav">{`Welcome, ${currentUser.displayName}`}</span>
          )}
          <Link
            className="nav-link"
            to="/shop">
            SHOP
          </Link>
          <div className="nav-link ">
            {currentUser ? <span onClick={handleSignOut}>SIGN OUT</span> : <span onClick={goToSignIn}>SIGN IN</span>}
          </div>
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
}

export default NavigationBar;
