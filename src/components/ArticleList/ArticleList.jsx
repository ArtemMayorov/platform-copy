import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { fetchArticles, setPage, setOffset } from 'Store/Slices/articlesSlice';
import Loader from 'components/Loader/Loader';
// eslint-disable-next-line import/order
import Error from 'components/Error/Error';

// eslint-disable-next-line import/order
import Article from 'components/ArticleList/Article/Article';

import 'antd/dist/antd.css';
import './Pagination.scss';
import s from './ArticleList.module.scss';

function CardList() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const {
    currentPage,
    loading,
    error,
    offset,
    articlesData: { articles, articlesCount },
  } = useSelector((state) => state.articlesList);

  useEffect(() => {
    dispatch(fetchArticles(offset));
    dispatch(setPage(currentPage));
  }, [currentPage, dispatch, offset, token]);

  const handlePage = (page) => {
    if (page === 1) dispatch(setOffset(0));
    dispatch(setOffset((page - 1) * 5));
    dispatch(setPage(page));
  };

  if (loading) return <Loader />;
  if (error || !articles || articles.length === 0) return <Error />;

  return (
    <div className={s.container}>
      {articles && articles.map((article) => <Article key={uuidv4()} article={article} />)}
      <div className={s.paginationContainer}>
        <Pagination
          total={articlesCount}
          onChange={handlePage}
          showSizeChanger={false}
          defaultCurrent={1}
          current={currentPage}
          defaultPageSize={5}
        />
      </div>
    </div>
  );
}

export default CardList;
