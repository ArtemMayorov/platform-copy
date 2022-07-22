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
// export const getArticlesList = async (token, offset = 0) => {
//   const res = await instance.get('articles', {
//     params: {
//       limit: 5,
//       offset,
//     },
//     headers: {
//       Authorization: `Token ${token}`,
//     },
//   });
//   if (res.statusText !== 'OK') throw new Error('error');
//   return res.data;
// };

export const getArticle = async (slug) => {
  const res = await instance.get(`articles/${slug}`);
  if (res.statusText !== 'OK') throw new Error('error');
  return res.data;
};
// export const getArticle = async (token, slug) => {
//   const res = await instance.get(`articles/${slug}`, {
//     headers: {
//       Authorization: `Token ${token}`,
//     },
//   });
//   if (res.statusText !== 'OK') throw new Error('error');
//   return res.data;
// };
export const createArticle = async (articleData) => {
  const res = await instance.post('articles', {
    article: articleData,
  });

  return res.data;
};
// export const createArticle = async (token, articleData) => {
//   const res = await instance.post(
//     'articles',
//     {
//       article: articleData,
//     },
//     {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     }
//   );
//   return res.data;
// };
export const updateArticle = async (slug, articleData) => {
  const res = await instance.put(`articles/${slug}`, {
    article: articleData,
  });
  return res.data;
};
// export const updateArticle = async (token, slug, articleData) => {
//   const res = await instance.put(
//     `articles/${slug}`,
//     {
//       article: articleData,
//     },
//     {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     }
//   );
//   return res.data;
// };
export const deleteArticle = async (slug) => {
  const res = await instance.delete(`articles/${slug}`);
  return res.data;
};
// export const deleteArticle = async (token, slug) => {
//   const res = await instance.delete(`articles/${slug}`, {
//     headers: {
//       Authorization: `Token ${token}`,
//     },
//   });
//   return res.data;
// };
export const addLike = async (slug) => {
  // export const addLike = async (token, slug) => {
  const res = await instance.post(`articles/${slug}/favorite`);
  return res.data;
};
export const deleteLike = async (slug) => {
  const res = await instance.delete(`articles/${slug}/favorite`);
  return res.data;
};

// tratatatata@mai.com
