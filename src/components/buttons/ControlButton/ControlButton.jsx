import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Popconfirm } from 'antd';

import { fetchDeleteArticle } from 'Store/Slices/articlesSlice';

import 'antd/dist/antd.css';
import s from './ControlButton.module.scss';

function ControlButton({ page, handleDeleteStatus }) {
  // function ControlButton({ token, page, handleDeleteStatus }) {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const handleOk = () => {
    dispatch(fetchDeleteArticle({ slug }));
    handleDeleteStatus();
  };

  const handlerButton = () => {
    if (page === 'Delete') dispatch(fetchDeleteArticle({ slug }));
  };

  return (
    <>
      {page === 'Edit' && (
        <button type="button" className={`${s.button} ${page === 'Edit' ? s.edit : s.delete}`}>
          <Link
            onClick={handlerButton}
            to={page === 'Edit' ? `/articles/${slug}/edit` : '/'}
            className={`${s.link} ${page === 'Edit' ? s.linkEdit : s.linkDelete}`}
          >
            {page}
          </Link>
        </button>
      )}
      {page === 'Delete' && (
        <Popconfirm
          placement="right"
          title="Are you sure to delete this task"
          onConfirm={handleOk}
          okText="Yes"
          cancelText="No"
        >
          <button type="button" className={`${s.button} ${s.delete} ${s.link} ${s.linkDelete}`}>
            Deleter
          </button>
        </Popconfirm>
      )}
    </>
  );
}

export default ControlButton;
