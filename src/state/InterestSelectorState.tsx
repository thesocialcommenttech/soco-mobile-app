import produce from 'immer';
import React, {
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  useState,
  useEffect
} from 'react';
import EventEmitter from 'eventemitter3';
import { Interests } from '../utils/typings/settings_interfaces/interests_interface/getInterestCategories.interface';

interface InterestSelectorDataStore {
  categoriesList: Interests[];
  userInterestList: Interests[];
  selectedCategories: Interests[];
  searchQuery: string;
}

const initialState: InterestSelectorDataStore = {
  categoriesList: [],
  userInterestList: [],
  selectedCategories: [],
  searchQuery: null
};

export const interestEvents = new EventEmitter();

function useInterestSelectData(): {
  get: () => InterestSelectorDataStore;
  set: (value: Partial<InterestSelectorDataStore>) => void;
  subscribe: (callback: () => void) => () => void;
  eventEmitter: EventEmitter;
} {
  const store = useRef(initialState);
  const eventEmitter = useRef(interestEvents);

  const get = useCallback(() => store.current, []);

  const subscribers = useRef(new Set<() => void>());

  const set = useCallback((value: Partial<InterestSelectorDataStore>) => {
    store.current = { ...store.current, ...value };
    subscribers.current.forEach(callback => callback());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  return {
    get,
    set,
    subscribe,
    eventEmitter: eventEmitter.current
  };
}

type UseStoreDataReturnType = ReturnType<typeof useInterestSelectData>;

const StoreContext = createContext<UseStoreDataReturnType | null>(null);

export function InterestSelectorDataProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreContext.Provider value={useInterestSelectData()}>
      {children}
    </StoreContext.Provider>
  );
}

interface InterestSelectorDataSetOptions {
  selectInterest: (interest: Interests) => void;
  unselectInterest: (interestId: Interests['_id']) => void;
  setCategoryList: (
    categoryList: InterestSelectorDataStore['categoriesList']
  ) => void;
  setUserInterestList: (
    interestList: InterestSelectorDataStore['userInterestList']
  ) => void;
  removeUserInterestList: (interestIndex: number) => void;
  clearSelectedCategories: () => void;
  setSearchQuery: (query: string) => void;
  getStore: () => InterestSelectorDataStore;
  events: {
    emit: (eventName: string, ...args: any[]) => void;
    listen: (
      eventName: string,
      fn: (...args: any[]) => void,
      context?: any
    ) => () => EventEmitter;
    listenOnce: (
      eventName: string,
      fn: (...args: any[]) => void,
      context?: any
    ) => () => EventEmitter;
  };
}

export function useInterestData<SelectorOutput>(
  selector: (store: InterestSelectorDataStore) => SelectorOutput
): [SelectorOutput, InterestSelectorDataSetOptions] {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('Store not found');
  }
  //   const state = useSyncExternalStore(
  //     cb => store.subscribe(cb),
  //     () => selector(store.get()),
  //     () => selector(initialState)
  //   );

  const [state, setState] = useState(selector(store.get()));
  useEffect(() => {
    return store.subscribe(() => setState(selector(store.get())));
  }, []);

  const selectInterest = (interest: Interests) => {
    store.set(
      produce(store.get(), draft => {
        draft.selectedCategories.push(interest);
      })
    );
  };

  const clearSelectedCategories = () => {
    store.set(
      produce(store.get(), draft => {
        draft.selectedCategories = [];
      })
    );
  };

  const unselectInterest = (interestId: Interests['_id']) => {
    store.set(
      produce(store.get(), draft => {
        draft.selectedCategories.splice(
          draft.selectedCategories.findIndex(cat => cat._id === interestId),
          1
        );
      })
    );
    store.eventEmitter.emit(`unselect:${interestId}`);
  };

  const setCategoryList = (
    categoryList: InterestSelectorDataStore['categoriesList']
  ) => {
    store.set(
      produce(store.get(), draft => {
        draft.categoriesList = categoryList;
      })
    );
  };

  const setUserInterestList = (
    userInterests: InterestSelectorDataStore['userInterestList']
  ) => {
    store.set(
      produce(store.get(), draft => {
        draft.userInterestList.push(...userInterests);
      })
    );
  };

  const removeUserInterest = (interestIndex: number) => {
    store.set(
      produce(store.get(), draft => {
        const removedInterest = draft.userInterestList.splice(
          interestIndex,
          1
        )[0];
        draft.categoriesList.findIndex(
          category => category._id === removedInterest._id
        );
      })
    );
  };

  const emit = (eventName: string, ...args: any[]) => {
    store.eventEmitter.emit(eventName, args);
  };

  const listen = (
    eventName: string,
    fn: (...args: any[]) => void,
    context?: any
  ) => {
    store.eventEmitter.on(eventName, fn, context);
    return () => store.eventEmitter.removeListener(eventName, fn, context);
  };

  const listenOnce = (
    eventName: string,
    fn: (...args: any[]) => void,
    context?: any
  ) => {
    store.eventEmitter.once(eventName, fn, context);
    return () => store.eventEmitter.removeListener(eventName, fn, context);
  };

  const setSearchQuery = query => {
    store.set(
      produce(store.get(), draft => {
        draft.searchQuery = query;
      })
    );
  };

  const getStore = () => store.get();

  return [
    state,
    {
      selectInterest,
      unselectInterest,
      setCategoryList,
      setUserInterestList,
      removeUserInterestList: removeUserInterest,
      clearSelectedCategories,
      setSearchQuery,
      events: { emit, listen, listenOnce },
      getStore
    }
  ];
}
