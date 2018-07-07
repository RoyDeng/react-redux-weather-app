import {combineReducers} from 'redux';
import selectedLocation from './selectedLocation';
import locations from './locations';
import dialog from './dialog';

// Reducer: 應用狀態的變化如何影響 Action 並發送到 Store 的函式
// combineReducers: 把多個 Reducer 作為值的物件，合併成一個最終的 Reducer 來呼叫 createStore
const todoApp = combineReducers({
  locations,
  selectedLocation,
  dialog
});

export default todoApp;
