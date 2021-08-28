interface User {
  friends: User[];
  createdAt: string;
  _id: string;
  userName: string;
  age?: number;
}

interface CurrentUser extends User  {
  games: Game[];
  email: string;
  friendRequests: FriendRequest[];
}

interface Game {
  addedAt: string;
  _id: string;
  title: string;
  price: number;
  genre: string;
  description: string;
  rating: number;
  year: number;
  img: string;
  alt?: string;
}

interface FriendRequest {
  _id: string;
  addedAt: string;
  from: User;
  to: User;
}

declare const enum GameGenres {
  Strategy = 'Strategy',
  RPG = 'RPG',
  Action = 'Action',
  Adventure = 'Adventure',
  Indie = 'Indie',
}
