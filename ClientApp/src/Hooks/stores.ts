import { useContext } from 'react';

import { BaseStore } from '../stores/baseStores/BaseStore';
import { RootStore, storeContext } from '../stores/rootStore';

export function useStore(desiredStoreType: typeof BaseStore) {
    const rootStore: RootStore = useContext<RootStore>(storeContext);
    return Object.values(rootStore).find(store => store instanceof desiredStoreType);
}