import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const response = axiosInstance.get("/courses");
    toast.promise(response, {
      loading: "Loading courses",
      success: (data) => {
        return data?.data?.message;
      },
    });
    return (await response).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("thumbnail", data.thumbnail);
      formData.append("createdBy", data.createdBy);
      formData.append("category", data.category);

      const promise = axiosInstance.post("/courses", formData);
      toast.promise(promise, {
        loading: "Creating Course",
        success: "Course Created Successfully",
        error: "Failed to create course",
      });

      const response = await promise;

      return response.data.course; // returns course only
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(
        error?.response?.data || { message: "Unknown error" }
      );
    }
  }
);
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action?.payload) {
        console.log(action.payload);

        state.courseData = [...action.payload];
      }
    });
  },
});

export default courseSlice.reducer;
