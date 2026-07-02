import React, { useEffect, useState } from "react";
import { CloseIcon } from "./Icons";
import "./Toast.css";

function Toast({ message, type = "success", duration = 3000, onClose }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!message) return;

    setProgress(100);
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const decrement = 100 / steps;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(progressTimer);
          return 0;
        }
        return prev - decrement;
      });
    }, intervalTime);

    const autoCloseTimer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(autoCloseTimer);
    };
  }, [message, duration, onClose]);

  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case "error":
        return (
          <svg className="toast-icon text-danger" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        );
      case "warning":
        return (
          <svg className="toast-icon text-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
      case "success":
      default:
        return (
          <svg className="toast-icon text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        );
    }
  };

  return (
    <div className={`toast-card ${type}`}>
      <div className="toast-content">
        {getIcon()}
        <span className="toast-message">{message}</span>
        <button className="toast-close-btn" onClick={onClose} aria-label="Close message">
          <CloseIcon size={14} />
        </button>
      </div>
      <div className="toast-progress" style={{ width: `${progress}%` }} />
    </div>
  );
}

export default Toast;
