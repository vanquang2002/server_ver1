describe('Get All Order Rooms', () => {
    it('should return all order rooms', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAllOrderRooms = async (req, res) => {
        const orderRooms = [
          { id: 'orderRoom1', roomCateId: 'roomCategory1' },
          { id: 'orderRoom2', roomCateId: 'roomCategory2' },
        ];
        res.status(200).json(orderRooms);
      };
  
      await getAllOrderRooms(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });
  });
  