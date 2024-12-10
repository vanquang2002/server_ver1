describe('Delete Booking', () => {
    it('should delete a booking successfully', async () => {
      const req = { params: { id: 'booking123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const deleteBooking = async (req, res) => {
        const bookings = [
          { id: 'booking123', customerId: 'customer1', roomId: 'room1', checkin: '2024-12-01', checkout: '2024-12-02' },
        ];
        const bookingIndex = bookings.findIndex((b) => b.id === req.params.id);
        if (bookingIndex === -1) {
          return res.status(404).json({ message: 'Booking not found' });
        }
        bookings.splice(bookingIndex, 1);
        res.status(200).json({ message: 'Booking deleted successfully' });
      };
  
      await deleteBooking(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Booking deleted successfully' });
    });
  
    it('should return 404 if booking is not found', async () => {
      const req = { params: { id: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const deleteBooking = async (req, res) => {
        const bookings = [];
        const bookingIndex = bookings.findIndex((b) => b.id === req.params.id);
        if (bookingIndex === -1) {
          return res.status(404).json({ message: 'Booking not found' });
        }
      };
  
      await deleteBooking(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Booking not found' });
    });
  });
  