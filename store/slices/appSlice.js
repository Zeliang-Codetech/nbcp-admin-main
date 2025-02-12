const { createSlice, current } = require("@reduxjs/toolkit");
const initialState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  subscriptionPlan: null,
  user: {},
  business: {},
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setBusiness(state, action) {
      state.business = action.payload;
    },
    setSubscriptionPlan(state, action) {
      state.subscriptionPlan = action.payload;
    },
  },
});
export const { setLoggedIn, setUser, setBusiness, setSubscriptionPlan } =
  appSlice.actions;
export default appSlice.reducer;
