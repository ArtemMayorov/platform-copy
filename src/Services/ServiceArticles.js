import instance from './ServiceBase';

export const getArticlesList = async (offset = 0) => {
  const res = await instance.get('articles', {
    params: {
      limit: 5,
      offset,
    },
  });
  if (res.statusText !== 'OK') throw new Error('error');
  return res.data;
};

export const getArticle = async (slug) => {
  const res = await instance.get(`articles/${slug}`);
  if (res.statusText !== 'OK') throw new Error('error');
  return res.data;
};

export const createArticle = async (articleData) => {
  const res = await instance.post('articles', {
    article: articleData,
  });

  return res.data;
};

export const updateArticle = async (slug, articleData) => {
  const res = await instance.put(`articles/${slug}`, {
    article: articleData,
  });
  return res.data;
};

export const deleteArticle = async (slug) => {
  const res = await instance.delete(`articles/${slug}`);
  return res.data;
};

export const addLike = async (slug) => {
  const res = await instance.post(`articles/${slug}/favorite`);
  return res.data;
};
export const deleteLike = async (slug) => {
  const res = await instance.delete(`articles/${slug}/favorite`);
  return res.data;
};
