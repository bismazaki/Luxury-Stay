// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button } from "@mui/material";

// const HousekeepingPanel = () => {
//   const [rooms, setRooms] = useState([]);
//   const [housekeepers, setHousekeepers] = useState([]);
//   const [assignments, setAssignments] = useState({});

//   useEffect(() => {
//     fetchRooms();
//     fetchHousekeepers();
//   }, []);

//   const fetchRooms = async () => {
//     try {
//       const response = await axios.get("http://localhost:2000/api/Room/rooms");
//       setRooms(response.data);
//     } catch (error) {
//       console.error("Error fetching rooms:", error);
//     }
//   };

//   const fetchHousekeepers = async () => {
//     try {
//       const response = await axios.get("http://localhost:2000/api/Room/housekeepers");
//       setHousekeepers(response.data);
//     } catch (error) {
//       console.error("Error fetching housekeepers:", error);
//     }
//   };

//   const handleAssignHousekeeper = async (roomId) => {
//     if (!assignments[roomId]?.housekeeperId || !assignments[roomId]?.taskStatus) {
//       alert("Please select both housekeeper and task status.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:2000/api/Room/assign-housekeeping", {
//         roomId,
//         housekeeperId: assignments[roomId].housekeeperId,
//         taskStatus: assignments[roomId].taskStatus,
//       });
//       fetchRooms();
//     } catch (error) {
//       console.error("Error assigning housekeeping task:", error);
//     }
//   };

//   const handleChange = (roomId, field, value) => {
//     setAssignments((prev) => ({
//       ...prev,
//       [roomId]: {
//         ...prev[roomId],
//         [field]: value,
//       },
//     }));
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Room ID</TableCell>
//             <TableCell>Housekeeper</TableCell>
//             <TableCell>Task Status</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rooms.map((room) => (
//             <TableRow key={room._id}>
//               <TableCell>{room.roomId}</TableCell>
//               <TableCell>
//                 <Select
//                   value={assignments[room.roomId]?.housekeeperId || ""}
//                   onChange={(e) => handleChange(room.roomId, "housekeeperId", e.target.value)}
//                 >
//                   {housekeepers.map((hk) => (
//                     <MenuItem key={hk._id} value={hk._id}>{hk.name}</MenuItem>
//                   ))}
//                 </Select>
//               </TableCell>
//               <TableCell>
//                 <Select
//                   value={assignments[room.roomId]?.taskStatus || ""}
//                   onChange={(e) => handleChange(room.roomId, "taskStatus", e.target.value)}
//                 >
//                   <MenuItem value="Assigned">Assigned</MenuItem>
//                   <MenuItem value="In Progress">In Progress</MenuItem>
//                   <MenuItem value="Completed">Completed</MenuItem>
//                 </Select>
//               </TableCell>
//               <TableCell>
//                 <Button onClick={() => handleAssignHousekeeper(room.roomId)}>Assign</Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default HousekeepingPanel;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button } from "@mui/material";

const HousekeepingPanel = () => {
  const [rooms, setRooms] = useState([]);
  const [housekeepers, setHousekeepers] = useState([]);
  const [assignments, setAssignments] = useState({});

  useEffect(() => {
    fetchRooms();
    fetchHousekeepers();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/Room/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const fetchHousekeepers = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/Room/housekeepers");
      setHousekeepers(response.data);
    } catch (error) {
      console.error("Error fetching housekeepers:", error);
    }
  };

  const handleAssignHousekeeper = async (roomId) => {
    if (!assignments[roomId]?.housekeeperId || !assignments[roomId]?.taskStatus) {
      alert("Please select both housekeeper and task status.");
      return;
    }

    try {
      await axios.post("http://localhost:2000/api/Room/assign-housekeeping", {
        roomId,
        housekeeperId: assignments[roomId].housekeeperId,
        taskStatus: assignments[roomId].taskStatus,
      });
      fetchRooms();
    } catch (error) {
      console.error("Error assigning housekeeping task:", error);
    }
  };

  const handleChange = (roomId, field, value) => {
    setAssignments((prev) => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        [field]: value,
      },
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Room ID</TableCell>
            <TableCell>Housekeeper</TableCell>
            <TableCell>Task Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room._id}>
              <TableCell>{room.roomId}</TableCell>
              <TableCell>
                <Select
                  value={assignments[room.roomId]?.housekeeperId || ""}
                  onChange={(e) => handleChange(room.roomId, "housekeeperId", e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>Select Housekeeper</MenuItem>
                  {housekeepers.length > 0 ? (
                    housekeepers.map((hk) => (
                      <MenuItem key={hk._id} value={hk._id}>{hk.name}</MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Housekeepers Available</MenuItem>
                  )}
                </Select>

                {/* Show the selected housekeeper's name */}
                <p>
                  Assigned Housekeeper:{" "}
                  {housekeepers.find(hk => hk._id === assignments[room.roomId]?.housekeeperId)?.name || "Not Assigned"}
                </p>
              </TableCell>
              <TableCell>
                <Select
                  value={assignments[room.roomId]?.taskStatus || ""}
                  onChange={(e) => handleChange(room.roomId, "taskStatus", e.target.value)}
                >
                  <MenuItem value="Assigned">Assigned</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleAssignHousekeeper(room.roomId)}>Assign</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HousekeepingPanel;
