import _bill from "./bill.json";

const api = {
  getBill: (customerId) => {
    // Filter the bill data based on the customerId
    const bill = _bill.find((bill) => bill.customerId === customerId);
    // Return the bill data or null if not found
    return bill;
  },
};

export default api;
