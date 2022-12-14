import { Countries } from "src/app/enums/countries";

export const getUsers = () => (
  [
    {
      id: 1,
      firstName: 'User',
      lastName: '1',
      email: 'user1@teste.com',
      password: 'teste1',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
      country: Countries.Brazil
    },
    {
      id: 2,
      firstName: 'User',
      lastName: '2',
      email: 'user2@teste.com',
      password: 'teste2',
      picture: 'https://i.pinimg.com/originals/61/54/76/61547625e01d8daf941aae3ffb37f653.png',
      country: Countries.USA
    },
    {
      id: 3,
      firstName: 'User',
      lastName: '3',
      email: 'user3@teste.com',
      password: 'teste3',
      picture: 'https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg',
      country: Countries.Argentina
    }
  ]
);

export const getUsersMoreWatchedMovies = () => ([
  {
    userEmail: 'user1@teste.com',
    moviesWatchedCount: 10
  },
  {
    userEmail: 'user2@teste.com',
    moviesWatchedCount: 5
  }
]);

export const getUserMock = () => (
  {
    "id": 1,
    "firstName": "User",
    "lastName": "1",
    "email": "user1@teste.com",
    "password": "teste1",
    "picture": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
    "country": "Brazil"
  }
)
