import MockAsyncStorage from 'mock-async-storage';

jest.mock('react-native', () => {
  const mock = new MockAsyncStorage();
  return {
    AsyncStorage: mock,
  };
});
