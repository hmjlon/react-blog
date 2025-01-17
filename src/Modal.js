function Modal(props) {
  return (
    <div className="modal" 
    style={{background:props.color}}>
      <h4>제목:{props.title[props.index]}</h4>
      <p>날짜:{props.createDate[props.index]}</p>
      <p>상세내용:{props.content[props.index]}</p>
    </div>
  );
}

export default Modal;
