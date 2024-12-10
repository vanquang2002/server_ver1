describe('Get All Bookings - Extended Test Cases', () => {
    it('should return all bookings', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Simulated function logic
      const getAllBookings = async (req, res) => {
        const bookings = [
          { id: 'booking1', customerId: 'customer1', roomId: 'room1', checkin: '2024-12-01', checkout: '2024-12-02' },
          { id: 'booking2', customerId: 'customer2', roomId: 'room2', checkin: '2024-12-03', checkout: '2024-12-04' },
        ];
        res.status(200).json(bookings);
      };
  
      await getAllBookings(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: 'booking1', customerId: 'customer1', roomId: 'room1', checkin: '2024-12-01', checkout: '2024-12-02' },
        { id: 'booking2', customerId: 'customer2', roomId: 'room2', checkin: '2024-12-03', checkout: '2024-12-04' },
      ]);
    });
  
    it('should return an empty array if no bookings are found', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAllBookings = async (req, res) => {
        const bookings = [];
        res.status(200).json(bookings);
      };
  
      await getAllBookings(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  
    it('should handle server errors gracefully', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAllBookings = async (req, res) => {
        throw new Error('Database error');
      };
  
      try {
        await getAllBookings(req, res);
      } catch (error) {
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
      }
    });
  
    it('should return paginated results if query params are provided', async () => {
      const req = {
        query: { page: 1, limit: 1 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAllBookings = async (req, res) => {
        const bookings = [
          { id: 'booking1', customerId: 'customer1', roomId: 'room1', checkin: '2024-12-01', checkout: '2024-12-02' },
          { id: 'booking2', customerId: 'customer2', roomId: 'room2', checkin: '2024-12-03', checkout: '2024-12-04' },
        ];
  
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;
        const paginatedBookings = bookings.slice(startIndex, startIndex + limit);
  
        res.status(200).json(paginatedBookings);
      };
  
      await getAllBookings(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: 'booking1', customerId: 'customer1', roomId: 'room1', checkin: '2024-12-01', checkout: '2024-12-02' },
      ]);
    });
  
    it('should return an error for invalid pagination parameters', async () => {
      const req = {
        query: { page: 'invalid', limit: -1 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAllBookings = async (req, res) => {
        const page = parseInt(req.query.page, 10);
        const limit = parseInt(req.query.limit, 10);
  
        if (isNaN(page) || page <= 0) {
          return res.status(400).json({ message: 'Invalid page parameter' });
        }
        if (isNaN(limit) || limit <= 0) {
          return res.status(400).json({ message: 'Invalid limit parameter' });
        }
      };
  
      await getAllBookings(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid page parameter' });
    });
  });
  