import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FcOvertime } from "react-icons/fc";
import { BiTimeFive, BiLike } from "react-icons/bi";
import { FiUserCheck } from "react-icons/fi";
import ReactPlayer from "react-player";



export default function Player() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [movie, setMovie] = useState(null);


  useEffect(() => {
    (async () => {
      const getMovieResponse = await getMovieById(id);
      const getMovieTypeResponse = await getMovieTypeById(
        getMovieResponse.data.movieTypeId
      );

      if (getMovieResponse.code === 1 && getMovieTypeResponse.code === 1) {
        setMovie({
          ...getMovieResponse.data,
          movieTypeName: getMovieTypeResponse.data.name,
        });
      }
    })();
  }, []);

  const getMovieById = async (id) => {
    const res = await fetch(`http://localhost:5000/movies/${id}`);
    return res.json();
  };
  const getMovieTypeById = async (id) => {
    const res = await fetch(`http://localhost:5000/movieTypes/${id}`);
    return res.json();
  };

  return (
    <>
      <Navbar />
      <Container>
        {movie ? (
          <>
            <div className="featured-movie">
              <div className="row">
                <div className="col-2">
                  <a href="#" title={movie.name}>
                    <img alt={movie.name} src={movie.imageUrl} />
                  </a>
                </div>
                <div className="col-6">
                  <div className="title">
                    <h2>{movie.name}</h2>
                    <span>Thể loại: {movie.movieTypeName}</span>
                  </div>
                  <p>{movie.description}</p>
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
                      <h4>{movie.premieredAt}</h4>
                    </div>

                    <div className="item">
                      <span>
                        <BiTimeFive className="icon" />
                        <span>Thời gian</span>
                      </span>
                      <h4>{movie.time}</h4>
                    </div>

                    <div className="item">
                      <span>
                        <FiUserCheck className="icon" />
                        <span>Giới hạn độ tuổi</span>
                      </span>
                      <h4>{movie.ageLimit}</h4>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="item">
                    <span>Diễn viên</span>
                    <a href="#">{movie.performer}</a>
                  </div>
                  <div className="item">
                    <span>Đạo diễn</span>
                    <a href="#">{movie.director}</a>
                  </div>
                  <div className="item">
                    <span>Nhà sản xuất</span>
                    <a href="#">{movie.producer}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="back">
              <BsArrowLeft onClick={() => navigate(-1)} />
            </div>
            <a className="player" id="movieTrailer">
              <div className="youtube  mb-4">
              <ReactPlayer
                url={movie.videoUrl}
                width="100vw"
                height="100vh"
                playing={true}
                controls={false}
              />
          
              </div>
            </a>
          </>
        ) : (
          <h1 className="noFlim">Không tìm thấy phim</h1>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  .featured-movie {
    margin-top: 7rem;
    color: white !important;
    background-color: #12263f;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .row {
      display: flex;
      flex-wrap: wrap;
      padding: 2rem 5rem;
      .col-2 {
        width: 250px;
        img {
          width: 250px;
          object-fit: contain;
        }
      }
      .col-6 {
        padding-left: 2rem;
        width: 600px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .col-4-2 {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 2rem;
          text-align: start;
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
        width: 250px;
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
  .noFlim {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100vh;
  }
`;
