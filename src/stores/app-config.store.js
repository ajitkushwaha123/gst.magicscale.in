import { create } from "zustand";

import { PLANS } from "@/constants/plans";

const initialState = {
  planId: "fssai-food-license",
  plan: PLANS["fssai-food-license"],
};

export const useAppConfigStore = create((set) => ({
  ...initialState,

  setPlanId: (planId) =>
    set({
      planId,
    }),

  setPlan: (plan) =>
    set({
      plan,
    }),
  reset: () => set(initialState),
}));
