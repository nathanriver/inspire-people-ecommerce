const generateOrderNumber = () => {
  return (
    Date.now().toString(36) + Math.random().toString(36).substr(2, 6)
  ).toUpperCase();
};

module.exports = generateOrderNumber;
