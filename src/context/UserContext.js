import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { createUserProfile, getUserProfile } from '../services/userService';

const UserContext = createContext();

export function UserProvider({ children }) {
  const { user }          = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // إنشاء أو جلب البروفايل
      createUserProfile(user).then(() => {
        getUserProfile(user.uid).then((data) => {
          setProfile(data);
          setLoading(false);
        });
      });
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const refreshProfile = async () => {
    if (user) {
      const data = await getUserProfile(user.uid);
      setProfile(data);
    }
  };

  return (
    <UserContext.Provider value={{ profile, loading, refreshProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);