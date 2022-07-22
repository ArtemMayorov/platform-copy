import Cookies from 'js-cookie';

import instance from './ServiceBase';

export const userRegistration = async ({ username, email, password }) => {
  const res = await instance.post('users', {
    user: {
      username,
      email,
      password,
    },
  });
  return res.data;
};
export const userAuthorization = async ({ email, password }) => {
  const res = await instance.post('users/login', {
    user: {
      email,
      password,
    },
  });
  // делаем запись токена в cookie, куки будут жить 1 день
  Cookies.set('token', `${res.data.user.token}`, { expires: 1 });
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await instance.get('user');
  return res;
};
// export const getCurrentUser = async (token) => {
//   const res = await instance.get('user', {
//     headers: {
//       Authorization: `Token ${token}`,
//     },
//   });

//   return res;
// };
export const updateUser = async ({ newUserData }) => {
  const res = await instance.put('user', {
    user: newUserData,
  });

  return res;
};
// export const updateUser = async ({ token, newUserData }) => {
//   const res = await instance.put(
//     'user',
//     {
//       user: newUserData,
//     },
//     {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     }
//   );

//   return res;
// };
