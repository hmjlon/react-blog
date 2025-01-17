// /*eslint-disable */
import logo from './logo.svg';
import {useState} from 'react';
import './App.css';

function App() {
  let post = "첫 블로그 글";
  // 타이틀 스테이트 생성 
let [title, setTitle] = useState(
  [
  '강남 우동 맛집',
  '남자코트 추천',
  '자바독학'
]);
//생성일 state
let [createDate, setCreateDate] = useState(
  [
  '2025년 1월 17일',
  '2025년 1월 16일',
  '2025년 1월 15일'
]);

  return (
    <div className="App">
      <div className="black-bg">
        React로 만드는 블로그
      </div>
      <div className="list">
        <h4>{title[0]}</h4>
        <p>작성일 : 오늘</p>
      </div>
    </div>
  );
}

export default App;
