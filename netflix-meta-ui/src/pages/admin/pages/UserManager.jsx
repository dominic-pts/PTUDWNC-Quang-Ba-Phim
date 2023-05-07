import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function UserManager() {
   const [tableParams, setTableParams] = useState({});
   const [users, setUsers] = useState([]);

   useEffect(() => {
      fetch("http://localhost:5000/users")
         .then((res) => res.json())
         .then((res) => {
            if (res.code === 1) {
               setUsers(res.data);
            }
         });
   }, [tableParams]);

   const handleDeleteUser = (userId) => {
      const confirmDelete = window.confirm(
         "Bạn có chắc chắn muốn xóa người dùng này?"
      );
      if (confirmDelete) {
         fetch(`http://localhost:5000/users/${userId}`, {
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

   return (
      <Container className="setBackGroud">
         <Sidebar />
         <h2 className="page_header">User Manager</h2>
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
                     Email
                  </th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {users &&
                  users.map((user, idx) => (
                     <tr key={user._id}>
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
                           {user.email}
                        </td>
                        <td
                           style={{
                              padding: "8px 12px",
                           }}
                        >
                           <Button
                              variant="danger"
                              onClick={() => handleDeleteUser(user._id)}
                           >
                              Xóa
                           </Button>
                        </td>
                     </tr>
                  ))}
            </tbody>
         </Table>
      </Container>
   );
}
const Container = styled.div``;
