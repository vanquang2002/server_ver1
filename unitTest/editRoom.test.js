describe('Edit Room', () => {
    it('should update the room details successfully', async () => {
      const req = { params: { id: 'room1' }, body: { status: 'occupied' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const editRoom = async (req, res) => {
        const rooms = [{ id: 'room1', name: 'Room 1', status: 'available' }];
        const room = rooms.find((r) => r.id === req.params.id);
        if (!room) {
          return res.status(404).json({ message: 'Room not found' });
        }
        Object.assign(room, req.body);
        res.status(200).json(room);
      };
  
      await editRoom(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 'room1', status: 'occupied' }));
    });
  
    it('should return 404 if the room is not found', async () => {
      const req = { params: { id: 'nonexistent' }, body: { status: 'occupied' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const editRoom = async (req, res) => {
        const rooms = [];
        const room = rooms.find((r) => r.id === req.params.id);
        if (!room) {
          return res.status(404).json({ message: 'Room not found' });
        }
      };
  
      await editRoom(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Room not found' });
    });
  });
  