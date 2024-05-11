import { atom } from 'recoil';

// Recoil atom for user data
export const userDataState = atom({
  key: 'userData',
  default: {
    email: '',
    password: ''
  }
});
