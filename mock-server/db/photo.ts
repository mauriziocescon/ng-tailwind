import { faker } from '@faker-js/faker';

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export const getPhoto = (id: number): Photo => ({
  albumId: Math.floor(id / 50) + 1,
  id: id + 1,
  title: faker.lorem.text(),
  url: faker.image.url(),
  thumbnailUrl: faker.image.url({ width: 250, height: 250 }),
});
