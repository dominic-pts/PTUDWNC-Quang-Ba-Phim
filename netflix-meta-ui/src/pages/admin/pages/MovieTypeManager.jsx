import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function MovieTypeMangager() {
   const [tableParams, setTableParams] = useState({});
   const [movieTypes, setMovieTypes] = useState([]);
   const [dialogVisible, setDialogVisible] = useState(false);
   const [dialogType, setDialogType] = useState("add");
   const [itemSelected, setItemSelected] = useState(null);

   const [movieTypeData, setMovieTypeData] = useState({
      name: "",
   });

   useEffect(() => {
      fetch("http://localhost:5000/movieTypes")
         .then((res) => res.json())
         .then((res) => {
            if (res.code === 1) {
               setMovieTypes(res.data);
            }
         });
   }, [tableParams]);

   const handleDeleteMovieType = (movieTypeId) => {
      const confirmDelete = window.confirm(
         "Bạn có chắc chắn muốn xóa thể loại này?"
      );
      if (confirmDelete) {
         fetch(`http://localhost:5000/movieTypes/${movieTypeId}`, {
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
      // Ngăn hành vi mặc định của form
      e.preventDefault();

      if (movieTypeData.name === "") return;

      if (dialogType === "add") {
         fetch(`http://localhost:5000/movieTypes`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(movieTypeData),
         })
            .then((res) => res.json())
            .then((res) => {
               if (res.code === 1) {
                  setTableParams({});
                  setDialogVisible(false);
               }
            });
      } else if (dialogType === "edit") {
         fetch(`http://localhost:5000/movieTypes/${itemSelected._id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(movieTypeData),
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

      setMovieTypeData((prevState) => ({
         ...prevState,
         name: "",
      }));
   };
   const handleOpenEditDialog = (movieType) => {
      setDialogVisible(true);
      setDialogType("edit");
      setItemSelected(movieType);

      // Binding data
      setMovieTypeData((prevState) => ({
         ...prevState,
         name: movieType?.name ?? "",
      }));
   };

   return (
      <>
         <Container className="setBackGroud">
            <Sidebar />
            <h2 className="page_header">Movie Type Manager</h2>
            <Button
               variant="primary"
               style={{
                  margin: "24px",
               }}
               onClick={handleOpenAddDialog}
            >
               Thêm thể loại phim
            </Button>

            <Table
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
                        Tên thể loại
                     </th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {movieTypes &&
                     movieTypes.map((movieType, idx) => (
                        <tr key={movieType._id}>
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
                              {movieType.name}
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
                                 onClick={() => handleOpenEditDialog(movieType)}
                              >
                                 Chỉnh sửa
                              </Button>
                              <Button
                                 variant="danger"
                                 onClick={() =>
                                    handleDeleteMovieType(movieType._id)
                                 }
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
                  Thêm hoặc chỉnh sửa thể loại
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form onSubmit={handleSubmitForm}>
                  <Form.Group
                     className="mb-3"
                     controlId="exampleForm.ControlInput1"
                  >
                     <Form.Label>Tên thể loại</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Nhập tên thể loại"
                        value={movieTypeData.name}
                        onChange={(e) =>
                           setMovieTypeData((prevState) => ({
                              ...prevState,
                              name: e.target.value,
                           }))
                        }
                     />
                  </Form.Group>
                  <Button type="submit" variant="primary">
                     Lưu
                  </Button>
               </Form>
            </Modal.Body>
         </Modal>
      </>
   );
}
const Container = styled.div``;
