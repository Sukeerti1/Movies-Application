import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(

  "movies/fetchAsyncMovies",
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=movie`
    );
    return response.data
  }
);

export const fetchAsyncShows = createAsyncThunk(

    "movies/fetchAsyncShows",
    async (term) => {
      const response = await movieApi.get(
        `?apiKey=${APIKey}&s=${term}&type=series`
      );
      return response.data
    }
  );

export const fetchAsyncDetails = createAsyncThunk(

    "movies/fetchAsyncDetails",
    async (id) => {
      const response = await movieApi.get(
        `?apiKey=${APIKey}&i=${id}&Plot=full`
      );
      return response.data
    }
  );

export const initialState = {
  movies: {},
  shows: {},
  selectedMovieorShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // addMovies: (state, { payload }) => {
    //   state.movies = payload;
    // },
    removeSelected: (state) => {
        state.selectedMovieorShow = {}
    }
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
        console.log("Pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, {payload}) => {
        console.log("Fetched Successfully");
        return{...state, movies: payload}
    },
    [fetchAsyncMovies.rejected]: () => {
        console.log("Rejected");
    } ,
    [fetchAsyncShows.fulfilled]: (state, {payload}) => {
        console.log("Fetched Successfully");
        return{...state, shows: payload}
    },
    [fetchAsyncDetails.fulfilled]: (state, {payload}) => {
        console.log("Fetched Successfully");
        return{...state, selectedMovieorShow: payload}
    },
  }
});

export const { removeSelected } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows
export const getDetails = (state) => state.movies.selectedMovieorShow
export default movieSlice.reducer;
