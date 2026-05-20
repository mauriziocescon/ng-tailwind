import { getAlbum, type Album } from './album.ts';
import { getComment, type Comment } from './comment.ts';
import { getPhoto, type Photo } from './photo.ts';
import { getPost, type Post } from './post.ts';
import { getTodo, type Todo } from './todo.ts';
import { getUser, type User } from './user.ts';

export interface Mocks {
  albums: Album[];
  comments: Comment[];
  photos: Photo[];
  posts: Post[];
  todos: Todo[];
  users: User[];
}

// db creation
export const mocks: Mocks = {
  albums: [],
  comments: [],
  photos: [],
  posts: [],
  todos: [],
  users: [],
};

Array.from({length: 100}, (value, index) => mocks.albums.push(getAlbum(index)));
Array.from({length: 500}, (value, index) => mocks.comments.push(getComment(index)));
Array.from({length: 5000}, (value, index) => mocks.photos.push(getPhoto(index)));
Array.from({length: 100}, (value, index) => mocks.posts.push(getPost(index)));
Array.from({length: 200}, (value, index) => mocks.todos.push(getTodo(index)));
Array.from({length: 10}, (value, index) => mocks.users.push(getUser(index)));
