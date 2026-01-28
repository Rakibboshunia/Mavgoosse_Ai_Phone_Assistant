

export const adaptAppointment = (app) => {
  const dateObj = new Date(app.scheduled_at);

  const statusMap = {
    PENDING: "pending",
    CONFIRMED: "confirmed",
    CANCELED: "canceled",
  };

  return {
    id: app.id,

    phone: app.customer_phone,

    service: app.service_name,

    status: statusMap[app.status] || "pending",

    date: dateObj.toLocaleDateString(),

    time: dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};
