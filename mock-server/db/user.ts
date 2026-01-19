import { faker } from '@faker-js/faker';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const getUser = (id: number): User => ({
  id: id + 1,
  name: faker.person.fullName(),
  username: faker.internet.username(),
  email: faker.internet.email(),
  address: {
    street: faker.location.streetAddress(),
    suite: faker.location.secondaryAddress(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    geo: {
      lat: faker.location.latitude().toString(),
      lng: faker.location.longitude().toString(),
    },
  },
  phone: faker.phone.number(),
  website: faker.internet.url(),
  company: {
    name: faker.company.name(),
    catchPhrase: faker.company.catchPhrase(),
    bs: faker.company.buzzPhrase(),
  },
});
