import _bill from "./bill.json";

export default {
  getBill: (customerId) => {
    // Filter the bill data based on the customerId
    const bill = _bill.find((bill) => bill.customerId === customerId);
    // Return the bill data or null if not found
    return bill;
  },
};
