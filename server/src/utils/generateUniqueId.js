const generateUniqueId = (type) => {
  let length = 6;
  switch (type) {
    case "transactionId":
      length = 9;
      break;
    case "orderNumber":
      length = 6;
      break;
  }
  return (
    Date.now().toString(36) + Math.random().toString(36).substr(2, length)
  ).toUpperCase();
};

module.exports = generateUniqueId;
