import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import EmployeesSection from "./components/EmployeeSection";

import Dashboard from "./pages/admin/Dashboard";
import Employees from "./pages/admin/Employees";
import CompanyProfile from "./pages/admin/CompanyProfile";
import EmployeeForm from "./pages/admin/EmployeeForm";
import ContactInfo from "./pages/admin/ContactInfo";
import AdminContactMessage from "./pages/admin/ContactMessage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employeessection" element={<EmployeesSection />} />
        <Route path="#about" element={<About />} /> 
        <Route path="#contact" element={<Contact />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
              <Route
        path="/admin/employees"
        element={
          <ProtectedRoute>
            <Employees />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/employees/create"
        element={
          <ProtectedRoute>
            <EmployeeForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/employees/edit/:id"
        element={
          <ProtectedRoute>
            <EmployeeForm />
          </ProtectedRoute>
        }
      />
        <Route
          path="/admin/company-profile"
          element={
            <ProtectedRoute>
              <CompanyProfile />
            </ProtectedRoute>
          }
        />
       <Route path="/admin/contact-info" element={ <ProtectedRoute>
              <ContactInfo />
            </ProtectedRoute>}
             />
           <Route path="/admin/contact-messages" element={ <ProtectedRoute>
              <AdminContactMessage />
            </ProtectedRoute>}
             />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
