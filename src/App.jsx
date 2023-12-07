import React, { useReducer, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
// import RouteTest from './components/RouteTest';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

// import MyButton from './components/MyButton';
// import MyHeader from './components/MyHeader';
// import DiaryList from './components/DiaryList';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

// const dummyData = [
//   {
//     id: 1,
//     emotion: 1,
//     content: '오늘의 일기 1번',
//     date: 1701235579519,
//   },
//   {
//     id: 2,
//     emotion: 2,
//     content: '오늘의 일기 2번',
//     date: 1701235579520,
//   },
//   {
//     id: 3,
//     emotion: 3,
//     content: '오늘의 일기 3번',
//     date: 1701235579521,
//   },
//   {
//     id: 4,
//     emotion: 4,
//     content: '오늘의 일기 4번',
//     date: 1701235579522,
//   },
//   {
//     id: 5,
//     emotion: 5,
//     content: '오늘의 일기 5번',
//     date: 1701235579523,
//   },
// ];

function App() {
  // const env = process.env;
  // env.PUBLIC_URL = env.PUBLIC_URL || '';

  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localData = localStorage.getItem('diary');
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );

      // localStorage에 데이터가 있을 때만 dataId 업데이트
      if (diaryList.length > 0) {
        dataId.current = parseInt(diaryList[0].id) + 1;
        dispatch({ type: 'INIT', data: diaryList });
      }
    }
  }, []);

  const dataId = useRef(0);
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  const onRemove = (targetId) => {
    dispatch({ type: 'REMOVE', targetId });
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      data: { id: targetId, date: new Date(date).getTime(), content, emotion },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className='App'>
            {/* <MyHeader
          headText={'APP'}
          leftChild={
            <MyButton text={'왼쪽 버튼'} onClick={() => alert('왼쪽 클릭')} />
          }
          rightChild={
            <MyButton
              text={'오른쪽 버튼'}
              onClick={() => alert('오른쪽 클릭')}
            />
          }
        />
        <h2>App.js</h2> */}
            {/* <img src={process.PUBLIC_URL + `/assets/emotion1.png`} /> : vite는 지원하지 않음 */}

            {/* <MyButton
          text={'버튼'}
          onClick={() => alert('버튼 클릭')}
          type={'positive'}
        /> */}

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
              <Route path='/*' element={<Home />} />
            </Routes>
            {/* <RouteTest /> */}
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
