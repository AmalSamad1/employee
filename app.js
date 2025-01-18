const express = require("express");
const app = express();

// Dummy employee data
const employees = [
    { id: 1, name: "John Doe", role: "Software Engineer", salary: 70000 },
    { id: 2, name: "Jane Smith", role: "Project Manager", salary: 90000 },
    { id: 3, name: "Alice Johnson", role: "Designer", salary: 60000 },
    { id: 4, name: "Bob Brown", role: "DevOps Engineer", salary: 75000 },
];

// Middleware to parse JSON
app.use(express.json());

// Get all employees
app.get("/employees", (req, res) => {
    res.json(employees);
});

// Get employee by ID
app.get("/employees/:id", (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
});

// Add a new employee
app.post("/employees", (req, res) => {
    const newEmployee = {
        id: employees.length + 1,
        ...req.body,
    };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

// Update an employee
app.put("/employees/:id", (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
    }
    Object.assign(employee, req.body);
    res.json(employee);
});

// Delete an employee
app.delete("/employees/:id", (req, res) => {
    const index = employees.findIndex(emp => emp.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: "Employee not found" });
    }
    employees.splice(index, 1);
    res.json({ message: "Employee deleted successfully" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});