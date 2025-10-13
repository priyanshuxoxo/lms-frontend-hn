import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
};
export const getRazorPayid = createAsyncThunk("/razorpay/getId", async () => {
  try {
    const response = await axiosInstance.get("payment/razorpay-key");
    return response.data;
  } catch (e) {
    toast.error(e, "failed to load data");
  }
});
export const purchaseCourseBundle = createAsyncThunk(
  "/purchaseCourse",
  async () => {
    try {
      const response = await axiosInstance.post("payment/subscribe");
      return response.data;
    } catch (e) {
      toast.error(e?.response?.data?.messsage);
    }
  }
);
export const verifyUserPayment = createAsyncThunk(
  "/payments/verify",
  async (data) => {
    try {
      const response = await axiosInstance.post("payment/verify", {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      });
      return response.data;
    } catch (e) {
      toast.error(e?.response?.data?.messsage);
    }
  }
);
export const getPaymentRecord = createAsyncThunk(
  "/payments/record",
  async () => {
    try {
      const response = axiosInstance.get("payment?count=100");
      toast.promise(response, {
        loading: "Loading payment records",
        success: "Payment records loaded successfully",
        error: "Failed to load payment records",
      });
      return (await response).data;
    } catch (e) {
      toast.error(e, "Operation failed");
    }
  }
);
export const cancelCourseBundle = createAsyncThunk(
  "/payments/cancel",
  async () => {
    try {
      const response = axiosInstance.post("payment/unsubscribe");
      toast.promise(response, {
        loading: "unsubscribing from course bundle",
        success: "Unsubscribed successfully",
        error: "Failed to unsubscribe",
      });
      return (await response).data;
    } catch (e) {
      toast.error(e, "Operation failed");
    }
  }
);
const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorPayid.fulfilled, (state, action) => {
        state.key = action.payload.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action.payload.subscriptionId;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action.payload.success;
      })
      .addCase(verifyUserPayment.rejected, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action.payload.success;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.allPayments;
        state.finalMonths = action?.payload?.finalMonths;
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
      });
  },
});

export default razorpaySlice.reducer;
