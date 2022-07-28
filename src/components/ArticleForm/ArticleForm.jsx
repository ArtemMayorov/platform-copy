import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';

import ButtonLoader from 'components/buttons/ButtonLoader/Spinner';
import { fetchCreateArticle, deleteRequestStatus, fetchUpdateArticle } from 'Store/Slices/articlesSlice';
import Error from 'components/Error/Error';

import s from './ArticleForm.module.scss';

function ArticleForm({ page, article, slug }) {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.articlesList);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => () => dispatch(deleteRequestStatus()), []);

  let tagList = article?.tagList.map((tag) => ({ value: tag, id: v4() }));
  tagList = tagList?.length ? tagList : [{ id: 'First', value: '' }];
  const [tags, setTag] = useState(tagList);

  const changeTagHandler = (e) => {
    const updatedTags = tags.map((tag) => {
      const tg = tag;
      if (tg.id === e.target.name) tg.value = e.target.value;
      return tg;
    });
    setTag(updatedTags);
  };

  const handleDeleteTag = (e) => {
    const { name } = e.target;
    const updatedTags = tags.filter((tag) => tag.id !== name);
    setTag(updatedTags);
  };

  const handleAddTag = () => {
    setTag([...tags, { id: v4(), value: '' }]);
  };

  const onSubmit = (data) => {
    const tagsList = tags.map((tag) => tag.value);
    if (page === 'Edit') {
      dispatch(fetchUpdateArticle({ slug, articleData: { ...data, tagList: tagsList } }));
      return;
    }
    dispatch(fetchCreateArticle({ articleData: { ...data, tagList: tagsList } }));
    reset();
  };

  return (
    <div className={s.container}>
      {error && <Error />}
      <span className={s.title}>{page === 'Edit' ? 'Edit article' : 'Create new article'}</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={s.label}>
          <div className={s.titleContainer}>
            <span>Title</span>
            <span className={s.errorMessage}>{errors?.title?.message}</span>
          </div>

          <input
            defaultValue={page === 'Edit' && article ? article.title : null}
            placeholder="Title"
            {...register('title', {
              required: '* requared field',
              minLength: {
                value: 5,
                message: ' must be at least 5 characters',
              },
            })}
          />
        </label>

        <label className={s.label}>
          <div className={s.titleContainer}>
            <span>Short description</span>
            <span className={s.errorMessage}>{errors?.description?.message}</span>
          </div>

          <input
            defaultValue={page === 'Edit' && article ? article.description : null}
            placeholder="Description"
            {...register('description', {
              required: '* requared field',
              minLength: {
                value: 5,
                message: ' must be at least 5 characters',
              },
            })}
          />
        </label>

        <label>
          <div className={s.titleContainer}>
            <span>Text</span>
            <span className={s.errorMessage}>{errors?.body?.message}</span>
          </div>
          <textarea
            defaultValue={page === 'Edit' && article ? article.body : null}
            placeholder="Text"
            {...register('body', {
              required: '* requared field',
              minLength: {
                value: 5,
                message: ' must be at least 5 characters',
              },
            })}
            className={s.markdown}
          />
        </label>

        <label>
          <div className={s.titleContainer}>
            <span>Tags</span>
          </div>
          {tags.map((tag) => (
            <div key={tag.id} className={s.tagContaiter}>
              <input
                required
                className={s.tag}
                type="text"
                name={tag.id}
                value={tag.value}
                onChange={changeTagHandler}
                placeholder="Tag"
              />
              <button name={tag.id} onClick={handleDeleteTag} className={s.tagButton} type="button">
                Delete
              </button>
            </div>
          ))}
          <button onClick={handleAddTag} className={s.addTagButton} type="button">
            AddTag
          </button>
        </label>

        <button className={s.submitButton} type="submit">
          {loading ? <ButtonLoader /> : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default ArticleForm;
