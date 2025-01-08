const express = require("express");
const {
  getAllEmployees,
  getEmployeeById,
  offboardEmployee,
} = require("../controllers/employeeController");

const router = express.Router();

router.get("/employees", getAllEmployees);
router.get("/employees/:id", getEmployeeById);
router.post("/employees/:id/offboard", offboardEmployee);

module.exports = router;
