import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import { logOut } from 'Store/Slices/userSlice';

import s from './SignButton.module.scss';

function SignButton() {
  const dispatch = useDispatch();
  const { userAuthorizationStatus: autorization } = useSelector((state) => state.user);

  const handleLogOut = () => {
    Cookies.remove('token', { expires: '-1' });
    dispatch(logOut());
  };

  return (
    <>
      {!autorization && (
        <button type="button" className={`${s.buttonIn} ${autorization ? s.logout : s.signIn}`}>
          <Link to="/sign-in" className={s.link}>
            Sign In
          </Link>
        </button>
      )}
      {!autorization && (
        <button type="button" className={`${s.button} ${autorization ? s.logout : s.login}`}>
          <Link to="/sign-up" className={`${s.link} ${autorization ? s.linklogout : s.linklogin}`}>
            Sign Up
          </Link>
        </button>
      )}
      {autorization && (
        <button onClick={handleLogOut} type="button" className={`${s.button} ${autorization ? s.logout : s.login}`}>
          <Link to="/" className={`${s.link} ${autorization ? s.linklogout : s.linklogin}`}>
            Log Out
          </Link>
        </button>
      )}
    </>
  );
}

export default SignButton;
