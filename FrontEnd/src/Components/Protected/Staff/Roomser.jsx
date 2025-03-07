import React, { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, Button, Select, MenuItem } from "@mui/material";
import axios from "axios";

const RoomService = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/Room/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const updateRoomStatus = async () => {
    if (!selectedRoom || !status) return;
    try {
      await axios.patch(`http://localhost:2000/api/Room/rooms/${selectedRoom}/availability`, { availabilityStatus: status });
      fetchRooms();
    } catch (error) {
      console.error("Error updating room status:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Room Service & Maintenance</Typography>
      {rooms.map((room) => (
        <Card key={room._id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">Room ID: {room.roomId}</Typography>
            <Typography>Type: {room.roomType}</Typography>
            <Typography>Status: {room.availabilityStatus}</Typography>
            <Select
              value={selectedRoom === room._id ? status : ""}
              onChange={(e) => {
                setSelectedRoom(room._id);
                setStatus(e.target.value);
              }}
              displayEmpty
            >
              <MenuItem value="">Select Status</MenuItem>
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Booked">Booked</MenuItem>
              <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
              <MenuItem value="Cleaning">Cleaning</MenuItem>
            </Select>
            <Button onClick={updateRoomStatus} variant="contained" color="primary" sx={{ marginLeft: 2 }}>Update</Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default RoomService;
