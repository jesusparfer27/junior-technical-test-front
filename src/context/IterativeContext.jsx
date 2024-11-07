import React, { createContext, useContext, useState } from 'react';

const IterativeContext = createContext();

export const IterativeProvider = ({ children }) => {
    const [furnitureByViewport, setFurnitureByViewport] = useState("first"); // Empieza en "first"

    return (
        <IterativeContext.Provider value={{ furnitureByViewport, setFurnitureByViewport }}>
            {children}
        </IterativeContext.Provider>
    );
};

export const useIterativeContext = () => {
    return useContext(IterativeContext);
};
