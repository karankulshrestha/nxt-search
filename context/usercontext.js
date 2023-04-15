import { createContext, useEffect, useState } from "react";

export const usercontext = createContext()

export const usercontextProvider = ({children}) => {
    return (
        <usercontext.Provider
        value={{}}
        >
            {children}
        </usercontext.Provider>
    )
}