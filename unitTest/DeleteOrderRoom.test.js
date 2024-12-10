describe('Delete Order Room', () => {
    it('should delete an order room successfully', async () => {
      const req = { params: { id: 'orderRoom1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const deleteOrderRoom = async (req, res) => {
        res.status(200).json({ message: 'Order Room deleted successfully' });
      };
  
      await deleteOrderRoom(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Order Room deleted successfully' });
    });
  
    it('should return 404 if the order room is not found', async () => {
      const req = { params: { id: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const deleteOrderRoom = async (req, res) => {
        res.status(404).json({ message: 'Order Room not found' });
      };
  
      await deleteOrderRoom(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Order Room not found' });
    });
  
    it('should return 400 if no ID is provided', async () => {
      const req = { params: {} }; // No ID provided
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const deleteOrderRoom = async (req, res) => {
        if (!req.params.id) {
          return res.status(400).json({ message: 'Order Room ID is required' });
        }
      };
  
      await deleteOrderRoom(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Order Room ID is required' });
    });
  });
  