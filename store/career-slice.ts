import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { CareerItem } from "@/types";

interface CareerState {
  data: (CareerItem & { _id: string })[];
  loading: boolean;
  error: string | null;
  selected: (CareerItem & { _id: string }) | null;
}

const initialState: CareerState = {
  data: [],
  loading: false,
  error: null,
  selected: null,
};

export const fetchCareer = createAsyncThunk(
  "career/fetch",
  async () => {
    const res = await fetch("/api/career");
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    return json.data;
  },
);

export const addCareer = createAsyncThunk(
  "career/add",
  async (data: CareerItem) => {
    const res = await fetch("/api/career", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    return json.data;
  },
);

export const updateCareerAsync = createAsyncThunk(
  "career/update",
  async ({ id, data }: { id: string; data: Partial<CareerItem> }) => {
    const res = await fetch(`/api/career/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    return json.data;
  },
);

export const deleteCareerAsync = createAsyncThunk(
  "career/delete",
  async (id: string) => {
    const res = await fetch(`/api/career/${id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    return id;
  },
);

const careerSlice = createSlice({
  name: "career",
  initialState,
  reducers: {
    setSelected(state, action) {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCareer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCareer.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCareer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(addCareer.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
      })
      .addCase(updateCareerAsync.fulfilled, (state, action) => {
        const index = state.data.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteCareerAsync.fulfilled, (state, action) => {
        state.data = state.data.filter((c) => c._id !== action.payload);
      });
  },
});

export const { setSelected } = careerSlice.actions;
export default careerSlice.reducer;
