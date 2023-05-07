import React, { useRef, useState, useEffect } from "react";
import Card from "./Card";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

// React.memo là một hàm bao bọc một component bên trong một component hàm.
// Khi component gốc được render, React.memo sẽ kiểm tra xem props có thay đổi so với lần render
// trước hay không. Nếu props không thay đổi, React.memo sẽ không render lại component bên trong,
//  mà chỉ sử dụng component đã render trước đó (được lưu trữ trong bộ nhớ đệm). Nếu props có thay đổi, React.memo sẽ render lại component bên trong với các props mới.
// Việc này giúp tăng hiệu suất của ứng dụng bằng cách giảm số lượng các rendering không cần thiết.

export default React.memo(function CardSlider({ data, title }) {
  const [showControls, setShowControls] = useState(false);
  const [sliderPositon, setSliderPositon] = useState(0);
  const listRef = useRef();

  const handleDirecion = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPositon > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPositon(sliderPositon - 1);
    }
    if (direction === "right" && sliderPositon < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPositon(sliderPositon + 1);
    }
  };


  return (
    <Container
      className="flex column"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1>{title}</h1>
      <div className="wrapper">
        <div
          className={`slider-action left ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineLeft onClick={() => handleDirecion("left")} />
        </div>
        <div className="flex slider" ref={listRef}>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie._id} />;
          })}
        </div>
        <div
          className={`slider-action right ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineRight onClick={() => handleDirecion("right")} />
        </div>
      </div>
    </Container>
  );
});
const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1 {
    margin-left: 50px;
  }
  .wrapper {
    .slider {
      width: max-content;
      gap: 2rem;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;
      margin-left: 50px;
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
        margin-top: 3rem;
        color: red;
      }
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
`;
