import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ZoomState = {
  zoomLevel: number;
  isCenter: boolean;
};

const initialState = {
  zoomLevel: 100,
  isCenter: false
} as ZoomState;

const zoomSlice = createSlice({
  name: "zoom",
  initialState,
  reducers: {
    setZoomLevel: (state, action: PayloadAction<number>) => {
      state.zoomLevel = action.payload;
    },
    increaseZoomLevel: (state) => {
      if (state.zoomLevel === 150) return
      state.zoomLevel += 10;
    },
    decreaseZoomLevel: (state) => {
      console.log("asd");
      if (state.zoomLevel === 60) return
      state.zoomLevel -= 10;
    },
    setPosition: (state, action: PayloadAction<boolean>) => {
      state.isCenter = action.payload
    }
  },
});

export const { setZoomLevel, increaseZoomLevel, decreaseZoomLevel, setPosition } = zoomSlice.actions

export default zoomSlice.reducer;