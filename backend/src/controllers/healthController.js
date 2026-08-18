export const getHealthStatus = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Divine Pooja Booking API is running"
  });
};
