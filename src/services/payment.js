export const createRegistration = async (payload) => {
  const response = await fetch("/api/payments/registration", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create registration");
  }
  
  return await response.json();
};

export const getRegistrationByOrderId = async (orderId) => {
  const response = await fetch(`/api/payments/registration/${orderId}`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to get registration");
  }
  
  return await response.json();
};
