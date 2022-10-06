export const getMoviesByCategory = () => ([
  {
    id: 22,
    title: "Shrek",
    folder: 'assets/folders/shreck.jpg',
    synopsi: "In a distant swamp lives Shrek (Mike Myers), a lonely ogre who sees his life being invaded by a series of fairy tale characters, such as three blind mice, a big and evil wolf and even three pigs. who don't have a place to live. All of them were driven from their homes by the evil Lord Farquaad (John Lithgow). Determined to regain his former tranquility, Shrek resolves to find Farquaad and makes a deal with him: all the characters will be able to return to their homes if he and his friend Donkey (Eddie Murphy) rescue a beautiful princess (Cameron Diaz), who is a prisoner of a dragon. However, when Shrek and Donkey finally manage to rescue the princess, they soon discover that their troubles are just beginning.",
    year: '2001',
    category: 'Animation',
    trailer: 'https://www.youtube.com/embed/CwXOrWvPBPk'
  },
  {
    id: 23,
    title: "The Beast of the Sea",
    folder: 'assets/folders/beast_of_sea.jpg',
    synopsi: "A sea monster hunter's life is turned upside down after a little girl hides on his ship.",
    year: '2022',
    category: 'Animation',
    trailer: 'https://www.youtube.com/embed/mM2XpGEswe0'
  },
  {
    id: 24,
    title: "Moana: A Sea of ​​Adventure",
    folder: 'assets/folders/moana.jpg',
    synopsi: "Moana Waialiki is a courageous young woman, daughter of the chief of a tribe in Oceania, coming from a long line of navigators. Wanting to find out more about her past and help her family, she decides to go in search of her ancestors, inhabitants of a mythical island that no one knows where it is. Accompanied by the legendary demigod Maui, Moana begins her journey into the open sea, where she faces terrifying sea creatures and discovers stories of the underworld.",
    year: '2016',
    category: 'Animation',
    trailer: 'https://www.youtube.com/embed/XL4Tf1Eohv8'
  },
]);

export const getMoviesCategories = () => ([
  {
    name: 'Animation',
    movies: [
      {
        id: 4,
        title: 'DC League of Superpets',
        folder: 'assets/folders/super_pets.jpg',
        synopsi: "DC Super Pets follows Krypto the Superdog and Superman, inseparable friends, sharing the same superpowers and fighting crime in Metropolis side by side. When Superman and the rest of the Justice League are kidnapped, Krypto must convince a pack of shelters - Ace the dog, PB the pot-bellied pig, Merton the turtle and Chip the squirrel - to harness his own newfound powers and help him to Rescue the Superheroes.",
        year: '2022',
        category: 'Animation',
        trailer: 'https://www.youtube.com/embed/1dd0ecrO89o'
      }
    ]
  },
  {
    name: 'Action',
    movies: [
      {
        id: 2,
        title: 'Top Gun: Maverick',
        folder: 'assets/folders/top_gun.jpg',
        synopsi: "After more than 30 years of service as one of the Navy's top aviators, Pete 'Maverick' Mitchell is back, pushing the limits as a courageous test pilot. In the contemporary world of tech wars, Maverick takes on drones and proves that the human factor is still essential.",
        year: '2022',
        category: 'Action',
        trailer: 'https://www.youtube.com/embed/08U3j8Rn_Y0'
      }
    ]
  },
  {
    name: 'Drama',
    movies: [
      {
        id: 5,
        title: 'Sandman',
        folder: 'assets/folders/sandman.jpg',
        synopsi: "A wizard tries to capture Death to bargain for eternal life, however, ends up trapping his younger brother, Dream. Fearing for his safety, the mage keeps him trapped in a glass bottle for decades. After his escape, Dream, also known as Morpheus, sets out in search of his powerful lost objects.",
        year: '2022',
        category: 'Drama',
        trailer: 'https://www.youtube.com/embed/NFnrLVrORiE'
      }
    ]
  },
  {
    name: 'Comedy',
    movies: [
      {
        id: 3,
        title: 'She-Hulk: Defender of Heroes',
        folder: 'assets/folders/she_hulk.jpg',
        synopsi: "Jennifer Walters — a lawyer specializing in cases involving superhumans — must deal with the complicated life of a single woman in her early thirties who happens to be a seven-foot super-powered hulk.",
        year: '2022',
        category: 'Comedy',
        trailer: 'https://www.youtube.com/embed/yRnApYO_hBI'
      }
    ]
  },
  {
    name: 'Fantasy',
    movies: [
      {
        id: 1,
        title: 'The House of the Dragon ',
        folder: 'assets/folders/house_of_dragon.jpg',
        synopsi: '200 years before the events of "Game of Thrones", the Targaryens were at the height of their power, having countless dragons at their command, but not everything lasts forever. The beginning of the end of the Targaryen dynasty.',
        year: '2022',
        category: 'Fantasy',
        trailer: 'https://www.youtube.com/embed/DotnJ7tTA34'
      }
    ]
  },
]);
