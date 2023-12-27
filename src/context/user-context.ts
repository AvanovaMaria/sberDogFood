import { createContext } from 'react';

export const UserContext = createContext<Author | null>(null);

UserContext.displayName = 'UserContext';