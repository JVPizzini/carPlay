import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import api from "../services/api";
import { database } from "../database";
import { User as ModalUser } from "../database/model/User";
import { BooleanSchema } from "yup";

//interfaces and types
interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}
interface SignInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updatedUser: (user: User) => Promise<void>;
  isLoading: Boolean;
}
interface AuthProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(true);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { token, user } = response.data;
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const userCollection = database.get<ModalUser>("users");

      await database.write(async () => {
        await userCollection.create((newUser) => {
          (newUser.user_id = user.id),
            (newUser.name = user.name),
            (newUser.email = user.email),
            (newUser.driver_license = user.driver_license),
            (newUser.avatar = user.avatar);
          newUser.token = user.token;
        });
      });

      setData({ ...user, token });
    } catch (error) {
      throw new Error(String(error));
    }
  }
  async function signOut() {
    try {
      const userColletion = database.get<ModalUser>("users");
      await database.write(async () => {
        const userSelected = await userColletion.find(data.id);
        await userSelected.destroyPermanently();
      });
      setData({} as User);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async function updatedUser(user: User) {
    try {
      const userColletion = database.get<ModalUser>("users");
      await database.write(async () => {
        const userSelected = await userColletion.find(data.id);
        await userSelected.update((userData) => {
          (userData.name = user.name),
            (userData.email = user.email),
            (userData.avatar = user.avatar);
        });
        setData(user);
      });
    } catch (error) {}
  }

  useEffect(() => {
    async function loadUserData() {
      const userColletion = database.get<ModalUser>("users");
      const response = await userColletion.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User;
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userData.token}`;

        setData(userData);
        setIsLoading(false);
      }
    }

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signIn,
        signOut,
        updatedUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
