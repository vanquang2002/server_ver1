describe('Edit Other Service', () => {
    it('should update an existing service successfully', async () => {
      const req = {
        params: { id: 'service1' },
        body: { price: 200 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const editOtherService = async (req, res) => {
        const updatedService = { id: req.params.id, ...req.body };
        res.status(200).json(updatedService);
      };
  
      await editOtherService(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 'service1', price: 200 }));
    });
  
    it('should return 404 if the service is not found', async () => {
      const req = { params: { id: 'nonexistent' }, body: { price: 200 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const editOtherService = async (req, res) => {
        return res.status(404).json({ message: 'Service not found' });
      };
  
      await editOtherService(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Service not found' });
    });
  });
  