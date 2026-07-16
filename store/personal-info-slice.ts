import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { PersonalInfo } from "@/services/personal-info";

interface PersonalInfoState {
  data: PersonalInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: PersonalInfoState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchPersonalInfo = createAsyncThunk(
  "personalInfo/fetch",
  async () => {
    const res = await fetch("/api/personal-info");
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    return json.data;
  },
);

export const updatePersonalInfoAsync = createAsyncThunk(
  "personalInfo/update",
  async (data: Partial<PersonalInfo>) => {
    const res = await fetch("/api/personal-info", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    return json.data;
  },
);

const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {
    setPersonalInfo(state, action: PayloadAction<PersonalInfo | null>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonalInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPersonalInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(updatePersonalInfoAsync.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const { setPersonalInfo } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;
