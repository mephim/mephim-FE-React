import { createContext, Dispatch, SetStateAction } from 'react';

interface IContext {
    keySearch: string;
    setKeySearch: Dispatch<SetStateAction<string>>;
}

const Context = createContext<IContext>({
    keySearch: '',
    setKeySearch: () => {
    },
});

export default Context;
