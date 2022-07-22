import React, { useState, useEffect } from 'react';
import { Tag } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { Link, Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useSelector } from 'react-redux';

// eslint-disable-next-line import/extensions
import { formatText } from 'helpers/CardHelper.js';
import { addLike, deleteLike } from 'Services/ServiceArticles';
import ControlButton from 'components/buttons/ControlButton/ControlButton';
import UserInfo from 'components/UserInfo/UserInfo';
import Loader from 'components/Loader/Loader';
// eslint-disable-next-line import/order
import Error from 'components/Error/Error';
import { emptyLike, fullLike } from 'Img';
// import emptyLike from '../../../Img/likeEmpty.svg';
// import fullLike from '../../../Img/likeFull.svg';

import 'antd/dist/antd.css';
import s from './Article.module.scss';

function Card({ article, articlePage }) {
  const { author, description, tagList, createdAt, slug, title, body, favoritesCount, favorited } = article;
  const {
    token,
    userAuthorizationStatus,
    userAuthorizationData: { username: currentUser },
  } = useSelector((state) => state.user);
  const { loading, error } = useSelector((state) => state.articlesList);

  const [deleteStatus, setDeleteStatus] = useState(false);
  const [likeIcon, setLikeIcon] = useState(emptyLike);

  const [favoriteLike, setFavoriteLike] = useState(favorited);
  const [likeCounter, setLikeCounter] = useState(favoritesCount);

  useEffect(() => {
    if (favoriteLike && token) setLikeIcon(fullLike);
  }, [favoriteLike, likeIcon]);

  const handleDeleteStatus = () => {
    setDeleteStatus(!deleteStatus);
  };

  const handleLike = async () => {
    if (likeIcon === emptyLike) {
      const res = await addLike(slug);

      if (res.article.favoritesCount) {
        setLikeIcon(fullLike);
        setLikeCounter(res.article.favoritesCount);
      }
    } else {
      const res = await deleteLike(slug);
      if (!res.article.favorited) {
        setLikeIcon(emptyLike);
        setLikeCounter(res.article.favoritesCount);
        setFavoriteLike(false);
      }
    }
  };
  if (error) return <Error />;
  if (loading) return <Loader />;

  return (
    <div id={slug} className={`${articlePage ? s.articleShadow : null}`}>
      <div className={`${articlePage ? s.articleContainer : s.container}`}>
        <div className={s.post}>
          <div className={s.title}>
            <Link to={`/articles/${slug}`} className={articlePage ? s.articleText : s.text}>
              {articlePage ? title : formatText(title, 'title')}
            </Link>
            <div className={s.like}>
              <button type="button" disabled={!token} onClick={handleLike} className={s.likeButton}>
                <img src={likeIcon} alt="icon" />
              </button>

              <span className={s.counter}>{likeCounter}</span>
            </div>
          </div>
          <div className={s.tags}>
            {tagList &&
              tagList.map((tag) => (
                <Tag key={uuidv4()} visible>
                  {tag}
                </Tag>
              ))}
          </div>

          <div className={s.description}>{articlePage ? description : formatText(description, 'description')}</div>
        </div>
        <div className={articlePage ? s.postInfoArticles : s.postInfo}>
          <UserInfo author={author} createdDate={createdAt} card />
          {articlePage && userAuthorizationStatus && currentUser === author.username && (
            <div className={s.controls}>
              {!deleteStatus ? (
                <ControlButton token={token} page="Delete" handleDeleteStatus={handleDeleteStatus} />
              ) : (
                <Redirect to="/" />
              )}

              <ControlButton page="Edit" />
            </div>
          )}
        </div>
      </div>

      {articlePage && (
        <div className={s.articleDescription}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default Card;
