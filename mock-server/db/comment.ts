import { faker } from '@faker-js/faker';

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const getComment = (id: number): Comment => ({
  postId: Math.floor(id / 5) + 1,
  id: id + 1,
  name: faker.lorem.text(),
  email: faker.internet.email(),
  body: faker.lorem.text(),
});
