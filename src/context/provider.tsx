import React, { useState } from 'react';
import Context from './context';

interface ProviderProps {
    children: any;
}

const Provider = ({ children }: ProviderProps) => {
    const [keySearch, setKeySearch] = useState<string>('');

    return (
        <Context.Provider
            value={{
                keySearch: keySearch,
                setKeySearch: setKeySearch,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default Provider;
