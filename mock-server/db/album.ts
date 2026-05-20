import { faker } from '@faker-js/faker';

export interface Album {
  userId: number;
  id: number;
  title: string;
  imageUrl: string;
}

export const getAlbum = (id: number): Album => ({
  userId: Math.floor(id / 10) + 1,
  id: id + 1,
  title: faker.lorem.text(),
  imageUrl: faker.image.url({ width: 400, height: 400 }),
});
