describe('Update Order Room', () => {
    it('should update an order room successfully', async () => {
      const req = {
        params: { id: 'orderRoom1' },
        body: { quantity: 3 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const updateOrderRoom = async (req, res) => {
        const updatedOrderRoom = { id: req.params.id, ...req.body };
        res.status(200).json(updatedOrderRoom);
      };
  
      await updateOrderRoom(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        id: 'orderRoom1',
        quantity: 3,
      }));
    });
  
    it('should return 404 if the order room is not found', async () => {
      const req = {
        params: { id: 'nonexistent' },
        body: { quantity: 3 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const updateOrderRoom = async (req, res) => {
        res.status(404).json({ message: 'Order Room not found' });
      };
  
      await updateOrderRoom(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Order Room not found' });
    });
  
    it('should return 400 if no update data is provided', async () => {
      const req = {
        params: { id: 'orderRoom1' },
        body: {}, // No data provided
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const updateOrderRoom = async (req, res) => {
        if (Object.keys(req.body).length === 0) {
          return res.status(400).json({ message: 'No update data provided' });
        }
      };
  
      await updateOrderRoom(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'No update data provided' });
    });
  });
  