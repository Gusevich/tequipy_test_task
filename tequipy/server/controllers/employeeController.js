const employees = require("../models/employee");

const getAllEmployees = (req, res) => {
  res.status(200).json(employees);
};

const getEmployeeById = (req, res) => {
  const { id } = req.params;
  const employee = employees.find((emp) => emp.id === id);
  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }
  res.status(200).json(employee);
};

const offboardEmployee = (req, res) => {
  const { id } = req.params;
  const { address, notes, phone, email } = req.body;

  const employee = employees.find((emp) => emp.id === id);
  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  employee.status = "OFFBOARDED";
  res.status(200).json({
    message: `Employee ${id} offboarded successfully`,
    offboardingDetails: {
      address,
      notes,
      phone,
      email,
    },
  });
};

module.exports = { getAllEmployees, getEmployeeById, offboardEmployee };
