import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/");
    }
  }, []);

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    user && (
      <div className="parent-page">
        <div className="parent-page__nav">
          <h1
            className="parent-page__title"
            onClick={() => {
              navigate("/home");
            }}
          >
            <span className="parent-page__blue">Medi</span>{" "}
            <span className="parent-page__yellow">Cover</span>
          </h1>

          <div className="parent-page__item">
            {user.role === "user" && (
              <h3
                onClick={() => {
                  navigate("/account");
                }}
              >
                My appointments
              </h3>
            )}
          </div>
          <div className="parent-page__item">
            {user.role === "admin" && (
              <h3
                onClick={() => {
                  navigate("/applyDoctor");
                }}
              >
                Admin page functions
              </h3>
            )}
          </div>
          {user && (
            <div className="parent-page__item">
              <h3
                onClick={() => {
                  localStorage.removeItem("loggedInUser");
                  navigate("/");
                }}
              >
                LogOut
              </h3>
            </div>
          )}
        </div>
        <div>{children}</div>
      </div>
    )
  );
}

export default ProtectedRoute;