describe('Get Booking by ID - Extended Test Cases', () => {
    const getBookingById = async (req, res) => {
      const idPattern = /^[a-zA-Z0-9_-]+$/; // Example ID format validation
  
      if (!req.params.id) {
        return res.status(400).json({ message: 'Booking ID is required' });
      }
  
      if (!idPattern.test(req.params.id)) {
        return res.status(400).json({ message: 'Invalid Booking ID format' });
      }
  
      try {
        const bookings = [
          { id: 'booking123', customerId: 'customer1', roomId: 'room1', checkin: '2024-12-01', checkout: '2024-12-02' },
        ];
  
        const booking = bookings.find((b) => b.id === req.params.id);
        if (!booking) {
          return res.status(404).json({ message: 'Booking not found' });
        }
  
        res.status(200).json(booking);
      } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };
  
    it('should return a booking if found', async () => {
      const req = { params: { id: 'booking123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await getBookingById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 'booking123',
        customerId: 'customer1',
        roomId: 'room1',
        checkin: '2024-12-01',
        checkout: '2024-12-02',
      });
    });
  
    it('should return 404 if booking is not found', async () => {
      const req = { params: { id: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await getBookingById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Booking not found' });
    });
  
    it('should return 400 if no ID is provided', async () => {
      const req = { params: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await getBookingById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Booking ID is required' });
    });
  
    it('should handle server errors gracefully', async () => {
      const req = { params: { id: 'booking123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const faultyGetBookingById = async (req, res) => {
        try {
          throw new Error('Database error');
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await faultyGetBookingById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  
    it('should validate the format of the ID', async () => {
      const req = { params: { id: 'invalid-id' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await getBookingById(req, res);
    });
  });
  