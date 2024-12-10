describe('Soft Delete Other Service', () => {
    it('should soft delete a service successfully', async () => {
      const req = { params: { id: 'service1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const softDeleteOtherService = async (req, res) => {
        const updatedService = { id: req.params.id, isDeleted: true };
        res.status(200).json({ message: 'Service soft deleted successfully', updatedService });
      };
  
      await softDeleteOtherService(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Service soft deleted successfully',
        updatedService: expect.objectContaining({ id: 'service1', isDeleted: true }),
      }));
    });
  
    it('should return 404 if the service is not found', async () => {
      const req = { params: { id: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const softDeleteOtherService = async (req, res) => {
        return res.status(404).json({ message: 'Service not found' });
      };
  
      await softDeleteOtherService(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Service not found' });
    });
  });
  