import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { SocialLinkConfig } from "@/types/social";

interface SocialLinksState {
  data: SocialLinkConfig[];
  loading: boolean;
  error: string | null;
}

const initialState: SocialLinksState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchSocialLinks = createAsyncThunk(
  "socialLinks/fetch",
  async () => {
    const res = await fetch("/api/social-links");
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    return json.data;
  },
);

export const updateSocialLinksAsync = createAsyncThunk(
  "socialLinks/update",
  async (links: SocialLinkConfig[]) => {
    const res = await fetch("/api/social-links", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(links),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    return json.data;
  },
);

const socialLinksSlice = createSlice({
  name: "socialLinks",
  initialState,
  reducers: {
    setSocialLinks(state, action: PayloadAction<SocialLinkConfig[]>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSocialLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSocialLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSocialLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(updateSocialLinksAsync.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const { setSocialLinks } = socialLinksSlice.actions;
export default socialLinksSlice.reducer;
