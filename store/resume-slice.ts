import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { ResumeDocument } from "@/models/resume";

interface ResumeState {
  data: ResumeDocument[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  pages: number;
}

const initialState: ResumeState = {
  data: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pages: 0,
};

export const fetchResumes = createAsyncThunk(
  "resume/fetch",
  async ({ page, limit }: { page: number; limit: number }) => {
    const res = await fetch(`/api/resume/history?page=${page}&limit=${limit}`);
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    return json.data;
  },
);

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.docs;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      });
  },
});

export default resumeSlice.reducer;
