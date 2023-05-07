import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const movieDataInit = {
   name: "",
   imageUrl: "",
   videoUrl: "",
   description: "",
   time: "",
   ageLimit: 0,
   producer: "",
   director: "",
   performer: "",
   movieTypeId: "",
};

export default function MovieTypeMangager() {
   const [tableParams, setTableParams] = useState({});
   const [movieTypes, setMovieTypes] = useState([]);
   const [movies, setMovies] = useState([]);
   const [dialogVisible, setDialogVisible] = useState(false);
   const [dialogType, setDialogType] = useState("add");
   const [itemSelected, setItemSelected] = useState(null);

   const [movieData, setMovieData] = useState({ ...movieDataInit });

   useEffect(() => {
      Promise.all([getMovieTypes(), getMovies()]).then(
         ([movieTypes, movies]) => {
            movieTypes && setMovieTypes(movieTypes.data);
            movies && setMovies(movies.data);
         }
      );
   }, [tableParams]);

   const getMovieTypes = async () => {
      const res = await fetch("http://localhost:5000/movieTypes");
      return res.json();
   };
   const getMovies = async () => {
      const res = await fetch("http://localhost:5000/movies");
      return res.json();
   };

   const handleDeleteMovie = (moveId) => {
      const confirmDelete = window.confirm(
         "Bạn có chắc chắn muốn xóa thể loại này?"
      );
      if (confirmDelete) {
         fetch(`http://localhost:5000/movies/${moveId}`, {
            method: "DELETE",
         })
            .then((res) => res.json())
            .then((res) => {
               if (res.code === 1) {
                  setTableParams({});
               }
            });
      }
   };
   const handleSubmitForm = (e) => {
      e.preventDefault();

      if (movieData.name === "") return;

      if (dialogType === "add") {
         fetch(`http://localhost:5000/movies`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(movieData),
         })
            .then((res) => res.json())
            .then((res) => {
               if (res.code === 1) {
                  setTableParams({});
                  setDialogVisible(false);
               }
            });
      } else if (dialogType === "edit") {
         fetch(`http://localhost:5000/movies/${itemSelected._id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(movieData),
         })
            .then((res) => res.json())
            .then((res) => {
               if (res.code === 1) {
                  setTableParams({});
                  setDialogVisible(false);
               }
            });
      }
   };
   const handleOpenAddDialog = () => {
      setDialogVisible(true);
      setDialogType("add");

      setMovieData({ ...movieDataInit });
   };
   const handleOpenEditDialog = (movie) => {
      setDialogVisible(true);
      setDialogType("edit");
      setItemSelected(movie);

      setMovieData((prevState) => ({
         ...prevState,
         name: movie?.name ?? "",
         imageUrl: movie?.imageUrl ?? "",
         videoUrl: movie?.videoUrl ?? "",
         description: movie?.description ?? "",
         time: movie?.time ?? "",
         ageLimit: movie?.ageLimit ?? 0,
         producer: movie?.producer ?? "",
         director: movie?.director ?? "",
         performer: movie?.performer ?? "",
         movieTypeId: movie?.movieTypeId ?? "",
      }));
   };

   return (
      <>
         <Container className="setBackGroud">
            <Sidebar />
            <h2 className="page_header">Movie Manager</h2>
            <Button
               variant="primary"
               style={{
                  margin: "24px",
               }}
               onClick={handleOpenAddDialog}
            >
               Thêm phim
            </Button>

            <Table
               responsive
               style={{
                  margin: "24px",
               }}
            >
               <thead>
                  <tr>
                     <th
                        style={{
                           padding: "8px 12px",
                        }}
                     >
                        #
                     </th>
                     <th
                        style={{
                           padding: "8px 12px",
                        }}
                     >
                        Tên phim
                     </th>
                     <th
                        style={{
                           padding: "8px 12px",
                        }}
                     >
                        Ảnh
                     </th>
                     <th
                        style={{
                           padding: "8px 12px",
                        }}
                     >
                        Khởi chiếu lúc
                     </th>
                     <th
                        style={{
                           padding: "8px 12px",
                        }}
                     >
                        Thời lượng
                     </th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {movies &&
                     movies.map((movie, idx) => (
                        <tr key={movie._id}>
                           <td
                              style={{
                                 padding: "8px 12px",
                              }}
                           >
                              {idx + 1}
                           </td>
                           <td
                              style={{
                                 padding: "8px 12px",
                              }}
                           >
                              {movie.name}
                           </td>
                           <td
                              style={{
                                 padding: "8px 12px",
                              }}
                           >
                              <img
                                 src={movie.imageUrl}
                                 alt="movie"
                                 style={{
                                    width: "65px",
                                 }}
                              />
                           </td>
                           <td
                              style={{
                                 padding: "8px 12px",
                              }}
                           >
                              {movie.premieredAt}
                           </td>
                           <td
                              style={{
                                 padding: "8px 12px",
                              }}
                           >
                              {movie.time}
                           </td>
                           <td
                              style={{
                                 padding: "8px 12px",
                              }}
                           >
                              <Button
                                 variant="success"
                                 style={{
                                    marginRight: "8px",
                                 }}
                                 onClick={() => handleOpenEditDialog(movie)}
                              >
                                 Chỉnh sửa
                              </Button>
                              <Button
                                 variant="danger"
                                 onClick={() => handleDeleteMovie(movie._id)}
                              >
                                 Xóa
                              </Button>
                           </td>
                        </tr>
                     ))}
               </tbody>
            </Table>
         </Container>
         <Modal
            show={dialogVisible}
            onHide={() => setDialogVisible(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
         >
            <Modal.Header closeButton>
               <Modal.Title id="example-custom-modal-styling-title">
                  Thêm hoặc chỉnh sửa phim
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form onSubmit={handleSubmitForm}>
                  <Form.Group
                     className="mb-3"
                     controlId="exampleForm.ControlInput1"
                  >
                     <Form.Label>Tên phim</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Nhập tên phim"
                        value={movieData.name}
                        onChange={(e) =>
                           setMovieData((prevState) => ({
                              ...prevState,
                              name: e.target.value,
                           }))
                        }
                     />
                  </Form.Group>
                  <Form.Group
                     className="mb-3"
                     controlId="exampleForm.ControlInput1"
                  >
                     <Form.Label>Link hình ảnh</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Nhập link hình ảnh"
                        value={movieData.imageUrl}
                        onChange={(e) =>
                           setMovieData((prevState) => ({
                              ...prevState,
                              imageUrl: e.target.value,
                           }))
                        }
                     />
                  </Form.Group>
                  <Form.Group
                     className="mb-3"
                     controlId="exampleForm.ControlInput1"
                  >
                     <Form.Label>Link trailer</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Nhập link trailer"
                        value={movieData.videoUrl}
                        onChange={(e) =>
                           setMovieData((prevState) => ({
                              ...prevState,
                              videoUrl: e.target.value,
                           }))
                        }
                     />
                  </Form.Group>
                  <Form.Group
                     className="mb-3"
                     controlId="exampleForm.ControlInput1"
                  >
                     <Form.Label>Mô tả</Form.Label>
                     <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Nhập mô tả"
                        value={movieData.description}
                        onChange={(e) =>
                           setMovieData((prevState) => ({
                              ...prevState,
                              description: e.target.value,
                           }))
                        }
                     />
                  </Form.Group>
                  <Form.Group
                     className="mb-3"
                     controlId="exampleForm.ControlInput1"
                  >
                     <Form.Label>Khởi chiếu lúc</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Nhập thời gian khởi chiếu"
                        value={movieData.premieredAt}
                        onChange={(e) =>
                           setMovieData((prevState) => ({
                              ...prevState,
                              premieredAt: e.target.value,
                           }))
                        }
                     />
                  </Form.Group>
                  <Form.Group
                     className="mb-3"
                     controlId="exampleForm.ControlInput1"
                  >
                     <Form.Label>Thời lượng</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Nhập thời lượng"
                        value={movieData.time}
                        onChange={(e) =>
                           setMovieData((prevState) => ({
                              ...prevState,
                              time: e.target.value,
                           }))
                        }
                     />
                  </Form.Group>
                  <Form.Group
                     className="mb-3"
                     controlId="exampleForm.ControlInput1"
                  >
                     <Form.Label>Giới hạn tuổi</Form.Label>
                     <Form.Control
                        type="number"
                        placeholder="Nhập giới hạn tuổi"
                        value={movieData.ageLimit}
                        onChange={(e) =>
                           setMovieData((prevState) => ({
                              ...prevState,
                              ageLimit: e.target.value,
                           }))
                        }
                     />
                  </Form.Group>
                  <Form.Group
                     className="mb-3"
                     controlId="exampleForm.ControlInput1"
                  >
                     <Form.Label>Nhà sản xuất</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Nhập nhà sản xuất"
                        value={movieData.producer}
                        onChange={(e) =>
                           setMovieData((prevState) => ({
                              ...prevState,
                              producer: e.target.value,
                           }))
                        }
                     />
                  </Form.Group>
                  <Form.Group
                     className="mb-3"
                     controlId="exampleForm.ControlInput1"
                  >
                     <Form.Label>Đạo diễn</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Nhập đạo diễn"
                        value={movieData.director}
                        onChange={(e) =>
                           setMovieData((prevState) => ({
                              ...prevState,
                              director: e.target.value,
                           }))
                        }
                     />
                  </Form.Group>
                  <Form.Group
                     className="mb-3"
                     controlId="exampleForm.ControlInput1"
                  >
                     <Form.Label>Diễn viên</Form.Label>
                     <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Nhập diễn viên"
                        value={movieData.performer}
                        onChange={(e) =>
                           setMovieData((prevState) => ({
                              ...prevState,
                              performer: e.target.value,
                           }))
                        }
                     />
                  </Form.Group>
                  <Form.Select
                     value={movieData.movieTypeId}
                     onChange={(e) => {
                        setMovieData((prevState) => ({
                           ...prevState,
                           movieTypeId: e.target.value,
                        }));
                     }}
                  >
                     <option>CHỌN THỂ LOẠI PHIM</option>
                     {movieTypes &&
                        movieTypes.map((mt) => (
                           <option key={mt._id} value={mt._id}>
                              {mt.name}
                           </option>
                        ))}
                  </Form.Select>
                  <Button className="mt-3" type="submit" variant="primary">
                     Lưu
                  </Button>
               </Form>
            </Modal.Body>
         </Modal>
      </>
   );
}
const Container = styled.div``;
