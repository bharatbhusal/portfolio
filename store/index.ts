import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const isBrowser = typeof window !== "undefined";

const noopStorage = {
  getItem: () => Promise.resolve(null),
  setItem: () => Promise.resolve(),
  removeItem: () => Promise.resolve(),
};

const storage = isBrowser
  ? // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("redux-persist/lib/storage/createWebStorage").default("local")
  : noopStorage;
import personalInfoReducer from "./personal-info-slice";
import socialLinksReducer from "./social-links-slice";
import educationReducer from "./education-slice";
import careerReducer from "./career-slice";
import resumeReducer from "./resume-slice";

const rootReducer = combineReducers({
  personalInfo: personalInfoReducer,
  socialLinks: socialLinksReducer,
  education: educationReducer,
  career: careerReducer,
  resume: resumeReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["personalInfo", "socialLinks"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
  configureStore({
    reducer: { persistedReducer },
    middleware: (getDefault) =>
      getDefault({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
