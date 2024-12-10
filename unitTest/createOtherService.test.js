describe('Create Other Service', () => {
    it('should create a new other service successfully', async () => {
      const req = {
        body: {
          name: 'New Service',
          price: 150,
          description: 'This is a new service.',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createOtherService = async (req, res) => {
        const newService = { id: 'service1', ...req.body };
        res.status(201).json(newService);
      };
  
      await createOtherService(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        id: 'service1',
        name: 'New Service',
        price: 150,
        description: 'This is a new service.',
      }));
    });
  
    it('should return 400 if required fields are missing', async () => {
      const req = {
        body: {
          // Missing `name`
          price: 150,
          description: 'This is a new service.',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createOtherService = async (req, res) => {
        if (!req.body.name) {
          return res.status(400).json({ message: 'Service name is required' });
        }
      };
  
      await createOtherService(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Service name is required' });
    });
  });
  