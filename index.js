const express = require("express");
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors())
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
// Dummy employee data
const employees = [
    { id: 1, name: "John Doe", role: "Software Engineer", salary: 70000 },
    { id: 2, name: "Jane Smith", role: "Project Manager", salary: 90000 },
    { id: 3, name: "Alice Johnson", role: "Designer", salary: 60000 },
    { id: 4, name: "Bob Brown", role: "DevOps Engineer", salary: 75000 },
];

// Middleware to parse JSON


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
const firebaseConfig = {
  apiKey: "AIzaSyAikoTJBFzOuVYV4TRc4DLKxpToyxWYdy0",
  authDomain: "shoes-kart-90d23.firebaseapp.com",
  databaseURL: "https://shoes-kart-90d23-default-rtdb.firebaseio.com",
  projectId: "shoes-kart-90d23",
  storageBucket: "shoes-kart-90d23.firebasestorage.app",
  messagingSenderId: "68435107510",
  appId: "1:68435107510:web:f174f58939ce3cf4af9017",
  measurementId: "G-Q0BCGNK46Y" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to get location and push to Firebase
function getLocationAndSend() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date().toISOString(),
        };

        // Push location data to Firebase
        push(ref(database, "locations"), locationData);
        console.log("Location sent:", locationData);
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  } else {
    console.log("Geolocation not supported");
  }
}

// Run function every 5 minutes (300000 milliseconds)
setInterval(getLocationAndSend, 200000);

// Run once on page load
getLocationAndSend();
