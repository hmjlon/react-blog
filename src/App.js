// /* eslint-disable */
import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import Modal from "./Modal";

function App() {
  // State 정의 시작
  // 입력 상자 글 받아서 저장하는 state 
  const [InputValue, setInputValue] = 
  useState('');


  const [ContentValue, setContentValue] = 
  useState('');


  let post = "첫 블로그 글";

  // 현재 선택한 글의 인덱스를 저장
  let [currentIndex, setCurrentIndex] = 
    useState(-1);

  // 타이틀 스테이트 생성
  let [title, setTitle] = useState([
    "인천 우동 맛집",
    "남자코트 추천",
    "자바독학",
  ]);
  // 생성일 state
  let [createDate, setCreateDate] = useState([
    "2025년 1월 17일",
    "2025년 1월 16일",
    "2025년 1월 15일",
  ]);
  // 상세내용
  let [content, setContent] = useState([
    '인천 우동 겁나 맛있음.',
    '남자 바바리 코트 명품',
    '자바 독학 가능 함.'
  ])

  let [showModal, setShowModal] = useState(false);
  // State 정의 종료

  // 좋아요 값 증가용 state
  let [like, setLike] = useState([0, 0, 0]);
  // 제목을 내림차순 출력하는 함수
  function descendingTitle() {
    let temp = [...title];
    temp.sort((x, y) => {
      if (x > y) return -1;
      if (x < y) return 1;
      else return 0;
    });
    setTitle([...temp]);
  }
  // 좋아요 추가하는 함수
  function addLike(num) {
    // 1. 좋아요 배열을 복사
    let copyLike = [...like];
    // 2. 사본에 해당 위치 + 1
    copyLike[num] = copyLike[num] + 1;
    // 3. setLike 함수로 수정
    setLike([...copyLike]);
  }

  function changeTitle() {
    // 현재 title 값을 비교
    let copyTitle = [...title];

    if (copyTitle[1] == "남자코트 추천") {
      // 타이틀 바꾸기
      copyTitle[1] = "여자코트 추천";
    } else {
      // 타이틀 바꾸기
      copyTitle[1] = "남자코트 추천";
    }

    setTitle([...copyTitle]);

    // 좋아요 0 으로 바꾸기
    let copyLike = [...like];
    copyLike[1] = 0;
    setLike([...copyLike]);
  }

  return (
    <div className="App">
      <div className="black-bg">React로 만드는 블로그</div>

      <div>
        <button
          onClick={() => {
            let temp = [...title];
            temp.sort();
            setTitle([...temp]);
          }}
        >
          오름차순
        </button>
        <button onClick={descendingTitle}>내림차순</button>
      </div>

      {/* {
        title.map(function(x, i){
          return (
            <div>
              <div>{x}</div>
              <div>{createDate[i]}</div>
            </div>
          )
        })
      } */}
      {title.map((x, index) => {
        return (
          <div className="list" key={index}>
            <h4
              onClick={() => {
                // 현재 선택한 인덱스를 스테이트에 저장
                setCurrentIndex(index)
                if (currentIndex != index) {
                  setShowModal(true);
                } else if(currentIndex == index 
                  && showModal == false) {
                  setShowModal(true);
                } else setShowModal(false);
              }}
            >

              {title[index]}
              <span onClick={(e) => {
                e.stopPropagation();
                addLike(index)}}
                >👍</span>
              {like[index]}
              <span onClick={(e)=>{
                e.stopPropagation();

                let tempTitle = [...title];
                let tempLike = [...like];
                let tempDate = [...createDate];
                let tempContent =[...content];
                
                tempTitle.splice(index,1);
                tempLike.splice(index,1);
                tempDate.splice(index,1);
                tempContent.splice(index,1);

                setTitle([...tempTitle])
                setLike([...tempLike])
                setCreateDate([...tempDate])
                
              }}>
                &nbsp; 🗑
              </span>
            </h4>
            <p>작성일 : {createDate[index]}</p>
          </div>
        );
      })}

      {/* 입력상자 만들고 입력 받기 */}
      <div>
        <div>
        <span>추가할 제목 입력</span>
        <input id ="title" onChange={(e)=>{
          setInputValue(e.target.value);
        }}></input>
        </div>

        <div>
       <span>추가할 내용 입력</span>
        <input id="content" onChange={(e)=>{
          setContentValue(e.target.value);
        }}></input>
        </div>

        <button onClick={()=>{
          // inputValue 의 값 확인 후 배열에 추가
          if(document.querySelector('#title').value==''){
            alert('글을 제목을 입력하세요.');
            document.querySelector('input').focus();
            return;
          } else if (document.querySelector('#content').value=='') {
            alert('글의 내용을 입력하세요.');
           }
            return;
          

          //inputValue --> title 배열에 글을 추가
          let temp = [...title];
          temp.unshift(InputValue);
          setTitle([...temp]);

          //inputValue --> Content 배열에 글을 추가
          let tempContent = [...content];
          tempContent.unshift(ContentValue);
          setContent([...tempContent]);



          // 좋아요. 빈 배열 하나 추가 0으로 셋팅
          let tempLike = [...like];
          tempLike.unshift(0);
          setLike([...tempLike]);



          // 오늘 날짜 찾아서 
          let today = new Date();
          let year = today.getFullYear();
          let month = today.getMonth()+1;
          let day =today.getDate();
          let dateString = year + '년' + month + '월' + day + '일';
          console.log(dateString);

          let tempDate = [...createDate];
          tempDate.unshift(dateString);
          setCreateDate([...tempDate]);
          // content 내용 입력 받아서 추가로 처리하기 

          document.querySelector('#title').value='';
          document.querySelector('#Content').value='';


        }}>글 생성</button>
      </div>

      {/* 남자코드 추천 */}
      {/* 버튼을 클릭하면 ->  여자코트 추천으로 변경 ->  */}
      {/* 좋아요 --> 0 으로 바꾸기 */}
      {/* 리스트 시작 */}
      {/* <div className="list">
        <h4>
          {title[1]}
          <span onClick={() => addLike(1)}>👍</span>
          {like[1]}
          <span>
            <button onClick={changeTitle}>변경</button>
          </span>
        </h4>
        <p>작성일 : {createDate[1]}</p>
      </div>
      <div className="list">
        <h4>
          {title[2]}
          <span onClick={() => addLike(2)}>👍</span>
          {like[2]}
        </h4>
        <p>작성일 : {createDate[2]}</p>
      </div> */}
      {/* 리스트 종료 */}
      {/* 상세 페이지 시작 */}
      {
        // 리턴 안에는 if 를 못써요....
        // 삼항연산자는 쓸 수 있음.
        // 자식 콤포넌트에 전달할 props를
        // 기술
        showModal == true ? 
          <Modal title={title} 
              createDate={createDate} 
              content={content}
              index={currentIndex} 
              color="yellow"/> 
          : null
      }
      {/* 상세 페이지 종료 */}
    </div>
  );
}


export default App;