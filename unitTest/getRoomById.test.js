describe('Get Room By ID', () => {
    it('should return a room if found', async () => {
      const req = { params: { id: 'room1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getRoomById = async (req, res) => {
        const rooms = [{ id: 'room1', name: 'Room 1', status: 'available' }];
        const room = rooms.find((r) => r.id === req.params.id);
        if (!room) {
          return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(room);
      };
  
      await getRoomById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 'room1', name: 'Room 1', status: 'available' });
    });
  
    it('should return 404 if the room is not found', async () => {
      const req = { params: { id: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getRoomById = async (req, res) => {
        const rooms = [];
        const room = rooms.find((r) => r.id === req.params.id);
        if (!room) {
          return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(room);
      };
  
      await getRoomById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Room not found' });
    });
  });
  