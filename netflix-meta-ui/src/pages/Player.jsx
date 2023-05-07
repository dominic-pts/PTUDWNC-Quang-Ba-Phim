import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FcOvertime } from "react-icons/fc";
import { BiTimeFive, BiLike } from "react-icons/bi";
import { FiUserCheck } from "react-icons/fi";

export default function Player() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Container>
        <div className="featured-movie">
          <div className="row">
            <div className="col-2">
              <a href="#" title="Lật Mặt 6: Tấm Vé Định Mệnh">
                <img
                  alt="Lật Mặt 6: Tấm Vé Định Mệnh"
                  src="https://cdn.moveek.com/storage/media/cache/short/643cd05155dc9009010254.jpeg"
                />
              </a>
            </div>
            <div className="col-6">
              <div className="title">
                <h2>Lật Mặt 6: Tấm Vé Định Mệnh</h2>
                <span>Face Off 6: The Ticket Of Destiny - Action, Drama</span>
              </div>
              <div className="buttom">
                <button className="btn mr-1">Yêu thích</button>
                <button className="btn">Trailer</button>
              </div>
              <p>
                Review Lật Mặt 6: Tấm Vé Định Mệnh và lịch chiếu Lật Mặt 6: Tấm
                Vé Định Mệnh xem tại Moveek. Lật mặt 6 sẽ thuộc thể loại giật
                gân, tâm lý pha hành động, hài hước.
              </p>
              <div className="col-4-2">
                <div className="item">
                  <span className="item_name">
                    <BiLike className="icon" />
                    <span>Hài lòng</span>
                  </span>
                  <h4>98%</h4>
                </div>

                <div className="item">
                  <span className="item_name">
                    <FcOvertime className="icon" />
                    <span>Khởi chiếu</span>
                  </span>
                  <h4>28/04/2023</h4>
                </div>

                <div className="item">
                  <span>
                    <BiTimeFive className="icon" />
                    <span>Thời gian</span>
                  </span>
                  <h4>132 phút</h4>
                </div>

                <div className="item">
                  <span>
                    <FiUserCheck className="icon" />
                    <span>Giới hạn độ tuổi</span>
                  </span>
                  <h4>16 tuổi</h4>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="item">
                <span>Diễn viên</span>
                <a href="#">Sơn, Long, Thảo, Huế</a>
              </div>
              <div className="item">
                <span>Đạo diễn</span>
                <a href="#">Lộc</a>
              </div>
              <div className="item">
                <span>Nhà sản xuất</span>
                <a href="#">Yến, Lâm</a>
              </div>
            </div>
          </div>
        </div>

        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <a className="player" id="movieTrailer">
          <div className="youtube  mb-4">
            <iframe
              width="900"
              height="600"
              src="https://www.youtube.com/embed/uLmfetpadoU?hd=1"
              frameborder="0"
              allowfullscreen=""
            ></iframe>
          </div>
        </a>
      </Container>
    </>
  );
}

const Container = styled.div`
  .featured-movie {
    margin-top: 6rem;
    background-color: #12263f;
    width: 100%;
    display: flex;
    flex-direction: row;

    .row {
      display: flex;
      flex-wrap: wrap;
      padding: 2rem 5rem;
      .col-2 {
        width: 200px;
      }
      .col-6 {
        padding-left: 2rem;
        width: 600px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        p {
          /* margin-top: 3rem; */
        }
        .col-4-2 {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 3rem;
          text-align: start;
          /* margin-top: 4rem; */
          .icon {
            margin-right: 0.3rem;
          }
        }
        .buttom {
          
          .btn {
            padding: 0.5rem 1.5rem;
            font-size: 1rem;
            border-radius: 1rem;
            &:hover {
              color: red;
              cursor: pointer;
            }
          }
        }
      }
      .col-4 {
        display: block;
        justify-items: center;
        margin-left: 2rem;
       
        .item {
          display: flex;
          flex-direction: column;
          justify-items: end;

          margin-top: 1rem;
          a {
            color: #e63757;
          }
        }
      }
    }
  }

  .back {
    padding: 2rem;
    z-index: 1;
    align-items: center;

    svg {
      font-size: 1.9rem;
      cursor: pointer;
      z-index: 100;
      margin-top: -0.5rem;
    }
  }
  .player {
    width: 100vw;
    height: 100vh;
    align-items: center;
    text-align: center;
  }
`;
