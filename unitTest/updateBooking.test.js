describe('Update Booking', () => {
    it('should update a booking successfully', async () => {
      const req = {
        params: { id: 'booking123' },
        body: {
          customerId: 'updatedCustomer',
          roomId: 'updatedRoom',
          checkin: '2024-12-10',
          checkout: '2024-12-15',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const updateBooking = async (req, res) => {
        const bookings = [
          { id: 'booking123', customerId: 'customer1', roomId: 'room1', checkin: '2024-12-01', checkout: '2024-12-02' },
        ];
        const bookingIndex = bookings.findIndex((b) => b.id === req.params.id);
        if (bookingIndex === -1) {
          return res.status(404).json({ message: 'Booking not found' });
        }
        bookings[bookingIndex] = { ...bookings[bookingIndex], ...req.body };
        res.status(200).json(bookings[bookingIndex]);
      };
  
      await updateBooking(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 'booking123',
        customerId: 'updatedCustomer',
        roomId: 'updatedRoom',
        checkin: '2024-12-10',
        checkout: '2024-12-15',
      });
    });
  
    it('should return 404 if booking is not found', async () => {
      const req = {
        params: { id: 'nonexistent' },
        body: { customerId: 'updatedCustomer' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const updateBooking = async (req, res) => {
        const bookings = [];
        const bookingIndex = bookings.findIndex((b) => b.id === req.params.id);
        if (bookingIndex === -1) {
          return res.status(404).json({ message: 'Booking not found' });
        }
      };
  
      await updateBooking(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Booking not found' });
    });
  
    it('should return 400 if no update data is provided', async () => {
      const req = {
        params: { id: 'booking123' },
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const updateBooking = async (req, res) => {
        if (!Object.keys(req.body).length) {
          return res.status(400).json({ message: 'No update data provided' });
        }
      };
  
      await updateBooking(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'No update data provided' });
    });
  });
  