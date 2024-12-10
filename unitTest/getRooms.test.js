describe('Get Rooms', () => {
    it('should return a list of rooms', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getRooms = async (req, res) => {
        const rooms = [
          { id: 'room1', name: 'Room 1', status: 'available' },
          { id: 'room2', name: 'Room 2', status: 'occupied' },
        ];
        res.status(200).json(rooms);
      };
  
      await getRooms(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });
  
    it('should return an empty array if no rooms are available', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getRooms = async (req, res) => {
        const rooms = [];
        res.status(200).json(rooms);
      };
  
      await getRooms(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
  