import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchData } from "../utils/connect";

export const FetchreadingList = createAsyncThunk("user/readingList", async ({curr3Index,user}) => {
  const data  = await FetchData(`/user/getuserdata/${user}?currIndex=${curr3Index}&data=readinglist`);
  return data;
});

const readingListSlice = createSlice({
  name: "readingList",
  initialState: {
    isFetchingreadingList:true,
    readingList: [],
    curr3Index:0,
  },
  reducers:{    
    SaveUnsaveReadStory(state,action){
      state.readingList.forEach(function(x){
        if(x._id===action.payload){
          x.isSaved = !x.isSaved;
        }
      })
    },
    addToReadingList(state,action){
      state.readingList = [
        action.payload,
        ...state.readingList
      ]
    },
    removeFromReadingList(state,action){
      state.readingList = state.readingList.filter(function(x){return x._id!==action.payload})
    }
  },
  extraReducers: {
    [FetchreadingList.fulfilled]: (state, action) => {
      state.isFetchingreadingList = action.payload.stories.length!==0;
      state.curr3index = state.curr3Index + action.payload.stories.length;
      state.readingList = [...state.readingList,action.payload.stories];
    },
  },
});

export const {
  SaveUnsaveReadStory,
  addToReadingList,
  removeFromReadingList
} = readingListSlice.actions;

export default readingListSlice.reducer;