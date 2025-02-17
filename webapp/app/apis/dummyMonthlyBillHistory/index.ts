import data from "./dummyMonthlyBillHistory.json";

const billingHistoryAPI = {
  getBillingHistory: () => {
    return data;
  },
};

export default billingHistoryAPI;
