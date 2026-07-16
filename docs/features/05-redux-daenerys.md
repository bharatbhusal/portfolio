# Story 05: Redux State — DAENERYS TARGARYEN

> "I will take what is mine with fire and blood."

## Agent: DAENERYS TARGARYEN
**Branch:** `feature/redux-daenerys` from `feature/fullstack-conversion`
**Email:** daenerys@dragonstone.dev

## Prerequisites
- NED STARK's foundation merged (types, folder structure)

## Tasks

### 1. Install Dependencies
- `@reduxjs/toolkit`
- `react-redux`
- `redux-persist`
- `@types/react-redux`

### 2. Store Setup (store/index.ts)
```typescript
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  personalInfo: personalInfoReducer,
  socialLinks: socialLinksReducer,
  education: educationReducer,
  career: careerReducer,
  resume: resumeReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['personalInfo', 'socialLinks'], // Only persist lightweight data
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => configureStore({
  reducer: { persistedReducer },
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    }),
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
```

### 3. Slices

**store/personal-info-slice.ts:**
```typescript
interface PersonalInfoState {
  data: PersonalInfo | null;
  loading: boolean;
  error: string | null;
}
// Actions: fetchPersonalInfo, updatePersonalInfo
```

**store/social-links-slice.ts:**
```typescript
interface SocialLinksState {
  data: SocialLinkConfig[];
  loading: boolean;
  error: string | null;
}
// Actions: fetchSocialLinks, updateSocialLinks
```

**store/education-slice.ts:**
```typescript
interface EducationState {
  data: EducationItem[];
  loading: boolean;
  error: string | null;
  selected: EducationItem | null;
}
// Actions: fetchEducation, addEducation, updateEducation, deleteEducation
```

**store/career-slice.ts:**
```typescript
interface CareerState {
  data: CareerItem[];
  loading: boolean;
  error: string | null;
  selected: CareerItem | null;
}
// Actions: fetchCareer, addCareer, updateCareer, deleteCareer
```

**store/resume-slice.ts:**
```typescript
interface ResumeState {
  data: ResumeDocument[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  pages: number;
}
// Actions: fetchResumes, fetchResumeById
```

### 4. API Client (lib/api-client.ts)
```typescript
async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>>
// Wraps fetch with:
// - JSON headers
// - Error handling
// - Response parsing
// - Credentials: 'include' for auth cookies
```

### 5. SSR Hydration (lib/hydration.ts)
```typescript
// Server-side data prefetch pattern for App Router
export async function prefetchPersonalInfo(): Promise<PersonalInfo>
export async function prefetchEducation(): Promise<EducationItem[]>
export async function prefetchCareer(): Promise<CareerItem[]>
export async function prefetchSocialLinks(): Promise<SocialLinkConfig[]>
```
- These call the service functions directly on the server
- Pass data as props to client components
- Client components hydrate into Redux store

### 6. Providers (components/providers/store-provider.tsx)
```typescript
'use client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { makeStore } from '@/store';
import { useRef } from 'react';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistStore(storeRef.current)}>
        {children}
      </PersistGate>
    </Provider>
  );
}
```

### 7. Layout Update (app/layout.tsx)
Minimal edit — wrap children with StoreProvider:
```tsx
<StoreProvider>
  {children}
</StoreProvider>
```

### 8. Write Feature Doc
Write `docs/features/05-redux-daenerys.md`

## Commit

```
Git config (scoped to worktree):
  user.name = "Daenerys Targaryen"
  user.email = "daenerys@dragonstone.dev"

Commit message:
feat(redux): persistent Redux stores, API client, SSR hydration

- Configured Redux store with redux-persist (localStorage)
- Created slices: personalInfo, socialLinks, education, career, resume
- Built typed API client with credentials support
- Added SSR hydration utilities for App Router
- Created StoreProvider with PersistGate
- Updated root layout with StoreProvider wrapper
```
