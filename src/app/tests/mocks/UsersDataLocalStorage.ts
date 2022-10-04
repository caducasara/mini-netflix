export const getUsersDataInLocalStorage = () => ([
  {
    userEmail: 'user1@teste.com',
    movies: [
      {
        movieId: 1,
        views: 2
      }
    ]
  },
  {
    userEmail: 'user2@teste.com',
    movies: [
      {
        movieId: 1,
        views: 3
      },
      {
        movieId: 2,
        views: 1
      }
    ]
  }
]);

export const getUserLogged = () => ({email: 'user1@teste.com'});

export const getUserSignIn = () => ({email: 'user1@teste.com', password: 'teste1'})

export const getuserData = () => (
  {
    id: 1,
    firstName: 'User',
    lastName: '1',
    email: 'user1@teste.com',
    password: 'teste1',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
    country: 'Brazil'
  }
);
