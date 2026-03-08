import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

 
}

