import React from 'react';
import { Link } from 'react-router-dom';

import s from './ArticleButton.module.scss';

function ArticleButton() {
  return (
    <button type="button" className={s.article}>
      <Link to="/new-article" className={s.link}>
        Create article
      </Link>
    </button>
  );
}

export default ArticleButton;
