import ApiService from '../services/ApiService';
import { User, UserNotifications } from '../types';
import { create } from 'zustand';

type Store = {
  user: User | null;
  userNotifications: Array<UserNotifications>;
  fetchUser: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
};

const userPatch = {
  name: {
    first: 'Chigo',
    last: 'Ofurum'
  },
  email: 'chigo@gmail.com',
  isVerified: true,
  type: 'student' as const,
  paymentMethods: [],
  firebaseId: 'hackety hack',
  dob: '2022-10-10',
  createdAt: new Date(),
  updatedAt: new Date(),
  _id: 'whatevs'
};

const useHack = true;

export default create<Store>((set) => ({
  user: null,
  userNotifications: [],
  fetchUser: async () => {
    const response = await ApiService.getUser();
    set({
      user: await response.json()
    });
  },
  fetchNotifications: async () => {
    const notificationsResponse = await ApiService.getUserNotifications();
    set({
      userNotifications: await notificationsResponse.json()
    });
  }
}));
