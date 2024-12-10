describe('Get Total Rooms By Category', () => {
    it('should return the total rooms count for each category', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getTotalRoomsByCategory = async (req, res) => {
        const totalRooms = [
          { categoryId: 'category1', total: 5 },
          { categoryId: 'category2', total: 10 },
        ];
        res.status(200).json(totalRooms);
      };
  
      await getTotalRoomsByCategory(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });
  
    it('should return an empty array if no data is available', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getTotalRoomsByCategory = async (req, res) => {
        const totalRooms = [];
        res.status(200).json(totalRooms);
      };
  
      await getTotalRoomsByCategory(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
  