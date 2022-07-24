import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ArticleButton from 'components/buttons/ArticleButton/ArticleButton';
import SignButton from 'components/buttons/SignButton/SignButton';
import UserInfo from 'components/UserInfo/UserInfo';
import { defaultAvatar } from 'Img';

import s from './Header.module.scss';

function Header() {
  const user = useSelector((state) => state.user);
  const {
    userAuthorizationStatus: autorization,
    userAuthorizationData: { username, image },
  } = user;

  return (
    <div className={s.container}>
      <Link to="/" className={s.logo}>
        Realworld Blog
      </Link>
      <div className={s.menu}>
        {autorization && (
          <>
            <ArticleButton />
            <Link to="/profile">
              <UserInfo
                author={{
                  username,
                  image: `${image || defaultAvatar}`,
                }}
              />
            </Link>
          </>
        )}

        <SignButton autorization={autorization} />
      </div>
    </div>
  );
}

export default Header;
