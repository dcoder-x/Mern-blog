import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchData } from "../utils/connect";

export const FetchTopicdetail = createAsyncThunk("story/topicdetail", async ({topicname,callback}) => {
  const data  = await FetchData(`/story/gettopicdetail/${topicname}`);
  if(data.success){
    callback(true);
    return data;
  }
  callback(false);
  return null;
}); 

const TopicdetailSlice = createSlice({
  name: "Topicdetail",
  initialState: {
    isFetching: true,
    topicDetail: {},    
  },
  extraReducers: {
    [FetchTopicdetail.fulfilled]: (state, action) => {
      state.isfetching = false;      
      state.topicDetail = action.payload.topic;
    },
  },
});

export default TopicdetailSlice.reducer;