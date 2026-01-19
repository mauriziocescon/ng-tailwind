import { faker } from '@faker-js/faker';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const getTodo = (id: number): Todo => ({
  userId: Math.floor(id / 20) + 1,
  id: id + 1,
  title: faker.lorem.text(),
  completed: faker.datatype.boolean(),
});
