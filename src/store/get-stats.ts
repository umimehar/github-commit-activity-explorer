import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { appConfig } from '../config';

export interface IRepoData {
  initialData: any;
  fullName: string;
  isLoading: boolean;
  error?: string;
  stats: any[];
  color: string;
  hoverState: boolean;
}

export interface IStatsResult {
  list: {
    [name: string]: IRepoData;
  };
  hoverOnList?: boolean;
}
export interface IGithubStatsResponse {
  total: number;
  week: number;
  days: number[];
}

const getStats = createSlice({
  name: 'githubSearch',
  initialState: {
    list: {},
  },
  reducers: {
    addInitialDataToList(state: IStatsResult, action: PayloadAction<IRepoData>) {
      const {
        initialData: { full_name: fullName },
        isLoading,
        error,
      } = action.payload;
      state.list[fullName] = action.payload;
      state.list[fullName].isLoading = isLoading;
      state.list[fullName].error = error;
    },
    setLoading(state: IStatsResult, action: PayloadAction<string>) {
      const fullName = action.payload;
      state.list[fullName].isLoading = false;
      state.list[fullName].error = '';
    },
    setError(state: IStatsResult, action: PayloadAction<{ fullName: string; error: string }>) {
      const { fullName, error } = action.payload;
      state.list[fullName].error = error;
    },
    setStatData: (state: IStatsResult, action: PayloadAction<{ stats: any; full_name: string }>) => {
      const { stats, full_name: fullName } = action.payload;
      state.list[fullName].stats = stats;
      state.list[fullName].isLoading = false;
      state.list[fullName].error = '';
    },
    setHover: (state: IStatsResult, action: PayloadAction<string>) => {
      const arr: string[] = Object.keys(state.list);
      for (let i: number = 0; i < arr.length; i++) {
        state.list[arr[i]].hoverState = false;
      }
      state.list[action.payload].hoverState = true;
    },
    setHoverOut: (state: IStatsResult, action: PayloadAction<string>) => {
      state.list[action.payload].hoverState = false;
    },
    setParentHover: (state: IStatsResult) => {
      state.hoverOnList = true;
    },
    setParentHoverOut: (state: IStatsResult) => {
      state.hoverOnList = false;
    },
    deleteStat: (state: IStatsResult, action: PayloadAction<string>) => {
      delete state.list[action.payload];
    },
  },
});

const { actions, reducer } = getStats;

export const {
  addInitialDataToList,
  setLoading,
  setError,
  deleteStat,
  setHover,
  setHoverOut,
  setParentHover,
  setParentHoverOut,
  setStatData,
} = actions;

// to register in store
export default reducer;

export const searchGithubStatsHook = (props: IRepoData): any => {
  const { fullName } = props;
  return async (dispatch: Dispatch) => {
    try {
      dispatch(addInitialDataToList({ ...props }));

      const response = await fetch(`https://api.github.com/repos/${fullName}/stats/commit_activity`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${appConfig.githubToken}`,
        },
      });
      const data = await response.json();
      dispatch(setStatData({ stats: data, full_name: fullName }));
    } catch (error) {
      console.log(error);
      dispatch(setError({ fullName, error: 'Some server/network error happened.' }));
    }
  };
};
