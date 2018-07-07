import {v4 as generateId} from 'node-uuid';

import {queryWeather} from '../api';

// Action: 把資料從用戶端傳到 Store 的物件
// Action 類型
export const ADD_LOCATION = 'ADD_LOCATION';
export const REMOVE_LOCATION = 'REMOVE_LOCATION';
export const SELECT_LOCATION = 'SELECT_LOCATION';

export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const SET_FETCH_ERROR = 'SET_FETCH_ERROR';

export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

// 建立 Action 的函式
// 新增地點
export const addLocation = (name) => ({
  type: ADD_LOCATION,
  id: generateId(),
  name
});

// 移除地點
export const removeLocation = id => ({
  type: REMOVE_LOCATION,
  id
});

// 選擇地點
export const selectLocation = id => ({
  type: SELECT_LOCATION,
  id
});

// 請求天氣資料
export const requestWeather = (id) => ({
  type: REQUEST_WEATHER,
  id
});

// 取得天氣資料
export const receiveWeather = (id, data) => ({
  type: RECEIVE_WEATHER,
  id,
  ...data
});

export const setFetchError = id => ({
  type: SET_FETCH_ERROR,
  id
});

// 送出請求與非同步取得天氣資料
export const fetchWeather = (id) => {
  return (dispatch, getState) => {
    const name = getState().locations[id].name;

    // 
    dispatch(requestWeather(id));
    queryWeather(name)
      .catch(() => dispatch(setFetchError(id)))
      .then((data) => dispatch(receiveWeather(id, data)));
  };
};

// 新增位置
export const addLocationAndFetchWeather = name => {
  return (dispatch, getState) => {
    const id = dispatch(addLocation(name)).id;
    dispatch(fetchWeather(id));
  };
};

// 開啟對話框
export const openDialog = () => ({
  type: OPEN_DIALOG
});

// 關閉對話框
export const closeDialog = () => ({
  type: CLOSE_DIALOG
});
