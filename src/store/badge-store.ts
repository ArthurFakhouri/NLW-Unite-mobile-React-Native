import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type BadgeStore = {
    id: number
    name: string
    email: string
    eventTitle: string
    checkInURL: string
    image?: string
}

type StateProps = {
    data: BadgeStore | null
    save: (badge: BadgeStore) => void
    remove: () => void
    updateAvatar: (uri: string) => void
}

export const useBadgeStore = create(
    persist<StateProps>((set) => ({
        data: null,
        save: (badge: BadgeStore) => set(() => ({ data: badge })),
        remove: () => set((data) => ({ data: { ...data.data!, checkInURL: "" } })),
        updateAvatar: (uri: string) => set((data) => ({
            data: { ...data.data!, image: uri }
        })),
    }), {
        name: "nlw-unite:badge",
        storage: createJSONStorage(() => AsyncStorage),
    }))