describe('Get Customer By Booking ID', () => {
    it('should return the customer for a valid booking ID', async () => {
      const req = { params: { bookingId: 'booking123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getCustomerByBookingId = async (req, res) => {
        try {
          const bookings = [{ bookingId: 'booking123', customerId: 'cust1' }];
          const customers = [{ id: 'cust1', name: 'John Doe' }];
          const booking = bookings.find((b) => b.bookingId === req.params.bookingId);
          if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
          }
          const customer = customers.find((c) => c.id === booking.customerId);
          if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
          }
          res.status(200).json(customer);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getCustomerByBookingId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 'cust1', name: 'John Doe' });
    });
  
    it('should return 404 if booking is not found', async () => {
      const req = { params: { bookingId: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getCustomerByBookingId = async (req, res) => {
        try {
          const bookings = [{ bookingId: 'booking123', customerId: 'cust1' }];
          const booking = bookings.find((b) => b.bookingId === req.params.bookingId);
          if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getCustomerByBookingId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Booking not found' });
    });
  });
  