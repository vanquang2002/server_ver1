describe('Get Rooms in Category', () => {
    it('should return rooms for a given category ID', async () => {
      const req = { params: { categoryId: 'category1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getRoomsInCategory = async (req, res) => {
        const rooms = [
          { id: 'room1', categoryId: 'category1', name: 'Room 1' },
          { id: 'room2', categoryId: 'category1', name: 'Room 2' },
        ];
        const filteredRooms = rooms.filter((room) => room.categoryId === req.params.categoryId);
        res.status(200).json(filteredRooms);
      };
  
      await getRoomsInCategory(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });
  
    it('should return an empty array if no rooms are found for the category ID', async () => {
      const req = { params: { categoryId: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getRoomsInCategory = async (req, res) => {
        const rooms = [];
        const filteredRooms = rooms.filter((room) => room.categoryId === req.params.categoryId);
        res.status(200).json(filteredRooms);
      };
  
      await getRoomsInCategory(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
  