import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminStaffPanel = () => {
  const [inactiveStaff, setInactiveStaff] = useState([]);

  useEffect(() => {
    fetchInactiveStaff();
  }, []);

  const fetchInactiveStaff = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/User/inactive-staff");
      setInactiveStaff(response.data.inactiveStaff);
    } catch (error) {
      console.error("Error fetching inactive staff:", error);
    }
  };

  const updateStatus = async (userId, status) => {
    try {
      await axios.put("http://localhost:2000/api/User/update-staff-status", { userId, accountStatus: status });
      fetchInactiveStaff(); // Refresh the list after updating
    } catch (error) {
      console.error("Error updating staff status:", error);
    }
  };

  return (
    <div>
      <h2>Inactive Staff Members</h2>
      {inactiveStaff.length === 0 ? (
        <p>No inactive staff members.</p>
      ) : (
        <ul>
          {inactiveStaff.map((staff) => (
            <li key={staff.userId}>
              {staff.name} - {staff.email}
              <button onClick={() => updateStatus(staff.userId, "Active")}>Activate</button>
              <button onClick={() => updateStatus(staff.userId, "Inactive")}>Deactivate</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminStaffPanel;
