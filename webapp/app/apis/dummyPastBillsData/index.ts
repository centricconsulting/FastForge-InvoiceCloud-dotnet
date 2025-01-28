import _billingHistory from "./dummyPastBillsData.json";

const api = {
  getBillingHistory: () => {
    return _billingHistory;
  },
};

export default api;
