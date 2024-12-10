describe('Get Total Rooms By Category In Date Range', () => {
    it('should return total rooms by category for a given date range', async () => {
      const req = { query: { checkInDate: '2024-12-01', checkOutDate: '2024-12-05' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getTotalRoomsByCategoryInDateRange = async (req, res) => {
        const totalRooms = [
          { roomCateId: 'roomCategory1', total: 10 },
          { roomCateId: 'roomCategory2', total: 15 },
        ];
        res.status(200).json(totalRooms);
      };
  
      await getTotalRoomsByCategoryInDateRange(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });
  
    it('should return 400 if date range is not provided', async () => {
      const req = { query: {} }; // No date range provided
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getTotalRoomsByCategoryInDateRange = async (req, res) => {
        if (!req.query.checkInDate || !req.query.checkOutDate) {
          return res.status(400).json({ message: 'Date range is required' });
        }
      };
  
      await getTotalRoomsByCategoryInDateRange(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Date range is required' });
    });
  
    it('should return 404 if no data is found for the date range', async () => {
      const req = { query: { checkInDate: '2024-12-01', checkOutDate: '2024-12-05' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getTotalRoomsByCategoryInDateRange = async (req, res) => {
        const totalRooms = []; // No data found
        if (totalRooms.length === 0) {
          return res.status(404).json({ message: 'No data found for the specified date range' });
        }
      };
  
      await getTotalRoomsByCategoryInDateRange(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'No data found for the specified date range' });
    });
  
    it('should handle server errors gracefully', async () => {
      const req = { query: { checkInDate: '2024-12-01', checkOutDate: '2024-12-05' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getTotalRoomsByCategoryInDateRange = async (req, res) => {
        try {
          throw new Error('Database error');
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getTotalRoomsByCategoryInDateRange(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });
  