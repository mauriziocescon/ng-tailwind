import { faker } from '@faker-js/faker';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getPost = (id: number): Post => ({
  userId: Math.floor(id / 10) + 1,
  id: id + 1,
  title: faker.lorem.text(),
  body: faker.lorem.text(),
});
