import React, { useEffect, useState } from "react";

const Notify = ({ notifications }) => {
  const [visibleNotification, setVisibleNotification] = useState(null);

  useEffect(() => {
    if (notifications.length > 0) {
      const notification = notifications[notifications.length - 1];
      setVisibleNotification(notification);

      const timer = setTimeout(() => {
        setVisibleNotification(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notifications]);

  if (!visibleNotification) return null;

  const alertClass =
    visibleNotification.type === "error"
      ? "alert alert-error"
      : visibleNotification.type === "success"
      ? "alert alert-success"
      : "alert alert-info";

  return (
    <div className="toast toast-top toast-end">
      <div className={alertClass}>
        <span>{visibleNotification.message}</span>
      </div>
    </div>
  );
};

export default Notify;
