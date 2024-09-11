import { libraries } from '@detail-dev/replay';

const bson = jest.createMockFromModule('bson') as any;
const mockBson = libraries.BsonInterceptor.createMock();

bson.BSON = function BSON() {
  return mockBson;
};

Object.entries(mockBson).forEach(([k, v]) => {
  if (k !== 'BSON') {
    bson[k] = v;
  }
});

// @ts-ignore
const mongodb = jest.createMockFromModule('mongodb');

// @ts-ignore
mongodb.BSON = bson.BSON;

const mockMongo = libraries.MongodbInterceptor.createMock();
Object.entries(mockMongo).forEach(([k, v]) => {
  if (k !== 'BSON') {
    // @ts-ignore
    mongodb[k] = v;
  }
});

module.exports = mongodb;

