import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { EducationItem } from "@/types";

interface EducationState {
  data: (EducationItem & { _id: string })[];
  loading: boolean;
  error: string | null;
  selected: (EducationItem & { _id: string }) | null;
}

const initialState: EducationState = {
  data: [],
  loading: false,
  error: null,
  selected: null,
};

export const fetchEducation = createAsyncThunk(
  "education/fetch",
  async () => {
    const res = await fetch("/api/education");
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    return json.data;
  },
);

export const addEducation = createAsyncThunk(
  "education/add",
  async (data: EducationItem) => {
    const res = await fetch("/api/education", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    return json.data;
  },
);

export const updateEducationAsync = createAsyncThunk(
  "education/update",
  async ({ id, data }: { id: string; data: Partial<EducationItem> }) => {
    const res = await fetch(`/api/education/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    return json.data;
  },
);

export const deleteEducationAsync = createAsyncThunk(
  "education/delete",
  async (id: string) => {
    const res = await fetch(`/api/education/${id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    return id;
  },
);

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    setSelected(state, action) {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(addEducation.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
      })
      .addCase(updateEducationAsync.fulfilled, (state, action) => {
        const index = state.data.findIndex((e) => e._id === action.payload._id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteEducationAsync.fulfilled, (state, action) => {
        state.data = state.data.filter((e) => e._id !== action.payload);
      });
  },
});

export const { setSelected } = educationSlice.actions;
export default educationSlice.reducer;
