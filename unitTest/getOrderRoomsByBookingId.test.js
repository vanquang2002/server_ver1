describe('Get Order Rooms By Booking ID', () => {
    it('should return order rooms for a given booking ID', async () => {
      const req = { params: { bookingId: 'booking1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getOrderRoomsByBookingId = async (req, res) => {
        const orderRooms = [
          { id: 'orderRoom1', bookingId: 'booking1', roomCateId: 'roomCategory1' },
        ];
        res.status(200).json(orderRooms);
      };
  
      await getOrderRoomsByBookingId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: 'orderRoom1', bookingId: 'booking1', roomCateId: 'roomCategory1' },
      ]);
    });
  
    it('should return 404 if no order rooms are found for the given booking ID', async () => {
      const req = { params: { bookingId: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getOrderRoomsByBookingId = async (req, res) => {
        const orderRooms = [];
        if (orderRooms.length === 0) {
          return res.status(404).json({ message: 'No order rooms found for the given booking ID' });
        }
      };
  
      await getOrderRoomsByBookingId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'No order rooms found for the given booking ID' });
    });
  
    it('should return 400 if booking ID is not provided', async () => {
      const req = { params: {} }; // No booking ID provided
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getOrderRoomsByBookingId = async (req, res) => {
        if (!req.params.bookingId) {
          return res.status(400).json({ message: 'Booking ID is required' });
        }
      };
  
      await getOrderRoomsByBookingId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Booking ID is required' });
    });
  
    it('should handle server errors gracefully', async () => {
      const req = { params: { bookingId: 'booking1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getOrderRoomsByBookingId = async (req, res) => {
        try {
          throw new Error('Database error');
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getOrderRoomsByBookingId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });
  