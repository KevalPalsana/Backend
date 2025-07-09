import userService from "../services/user.service.js";
  
const createBookingController = async (req, res) => {
    try {
      const booking = await userService.createBooking(req.body);
      res.status(201).json({ message: 'Booking created successfully', data: booking });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
const getAllBookingsController = async (req, res) => {
    try {
      const bookings = await userService.getAllBookings();
      res.status(200).json({ message: 'Bookings retrieved successfully', data: bookings });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

 const getBookingByIdController = async (req, res) => {
    try {
      const booking = await userService.getBookingById(req.params.id);
      res.status(200).json({ message: 'Booking retrieved successfully', data: booking });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
 const updateBookingController = async (req, res) => {
    try {
      const booking = await userService.updateBooking(req.params.id, req.body);
      res.status(200).json({ message: 'Booking updated successfully', data: booking });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
 const deleteBookingController = async (req, res) => {
    try {
      await userService.deleteBooking(req.params.id);
      res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  

  export default { createBookingController, getAllBookingsController, getBookingByIdController, updateBookingController, deleteBookingController }