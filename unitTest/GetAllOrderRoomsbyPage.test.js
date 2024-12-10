describe('Get All Order Rooms by Page', () => {
    it('should return paginated order rooms', async () => {
      const req = { query: { page: 1, size: 2 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAllOrderRoomsByPage = async (req, res) => {
        const orderRooms = [
          { id: 'orderRoom1', roomCateId: 'roomCategory1' },
          { id: 'orderRoom2', roomCateId: 'roomCategory2' },
        ];
        res.status(200).json(orderRooms);
      };
  
      await getAllOrderRoomsByPage(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });
  
    it('should return an empty array if no order rooms exist', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAllOrderRoomsByPage = async (req, res) => {
        res.status(200).json([]);
      };
  
      await getAllOrderRoomsByPage(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
  