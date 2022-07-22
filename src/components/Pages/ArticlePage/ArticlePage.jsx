import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchArticle } from 'Store/Slices/articlesSlice';
import Article from 'components/ArticleList/Article/Article';
import Loader from 'components/Loader/Loader';
import Error from 'components/Error/Error';

import s from './ArticlePage.module.scss';

function ArticlePage() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { loading, error, currentArticle: article } = useSelector((state) => state.articlesList);

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [dispatch]);
  if (error) return <Error />;
  if (loading || !article) return <Loader />;

  return (
    <div className={s.container}>
      <Article article={article} articlePage />
    </div>
  );
}

export default ArticlePage;
