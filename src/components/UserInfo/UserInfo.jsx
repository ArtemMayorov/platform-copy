import React from 'react';

import { formCreateDate } from 'helpers/CardHelper.js';
import { defaultAvatar } from 'Img';

import s from './UserInfo.module.scss';

function UserInfo({ author, createdDate, card }) {
  if (!author) return;
  const { username, image } = author;
  return (
    <div className={s.container}>
      <div className={s.description}>
        {!card && <span className={s.userName}>{username}</span>}
        {card && (
          <>
            <span className={`${s.userName} ${s.userNameCard}`}>{username}</span>
            <span className={s.data}>{formCreateDate(createdDate)}</span>
          </>
        )}
      </div>
      <img className={s.avatar} src={image.search(/smiley-cyrus/) > 1 ? defaultAvatar : image} alt="avatar" />
    </div>
  );
}

export default UserInfo;
