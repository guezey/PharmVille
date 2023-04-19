import React from "react";
import { Table } from "react-bootstrap";

const Orders = ({ orders }) => {
  return (
    <div>
      <h2>Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{color:"black"}}>ID</th>
            <th style={{color:"black"}}>Medication</th>
            <th style={{color:"black"}}>Quantity</th>
            <th style={{color:"black"}}>Date Ordered</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={{color:"black"}}>{order.id}</td>
              <td style={{color:"black"}}>{order.medication}</td>
              <td style={{color:"black"}}>{order.quantity}</td>
              <td style={{color:"black"}}>{order.dateOrdered}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;
