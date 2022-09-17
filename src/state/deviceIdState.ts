import create from 'zustand';

interface IDeviceIdState {
  deviceId: string;
  setDeviceId: (deviceId: string) => void;
}

export const useDeviceId = create<IDeviceIdState>(set => ({
  deviceId: null,
  setDeviceId: (deviceId: string) => set({ deviceId })
}));
