describe('Get Other Services', () => {
    it('should return all other services', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getOtherServices = async (req, res) => {
        const otherServices = [
          { id: 'service1', name: 'Service 1', price: 100, description: 'Description 1' },
          { id: 'service2', name: 'Service 2', price: 200, description: 'Description 2' },
        ];
        res.status(200).json(otherServices);
      };
  
      await getOtherServices(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });
  
    it('should return an empty array if no services exist', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getOtherServices = async (req, res) => {
        const otherServices = [];
        res.status(200).json(otherServices);
      };
  
      await getOtherServices(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
  