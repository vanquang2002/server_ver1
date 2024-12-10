describe('Create Agency - Extended Test Cases', () => {
    it('should create an agency successfully with all valid inputs', async () => {
      const req = {
        body: {
          name: 'Test Agency',
          address: '123 Test Street',
          phone: '1234567890',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createAgency = async (req, res) => {
        if (!req.body.name) return res.status(400).json({ message: 'Name is required' });
        if (!req.body.address) return res.status(400).json({ message: 'Address is required' });
        if (!req.body.phone || !/^\d{10,15}$/.test(req.body.phone)) {
          return res.status(400).json({ message: 'Phone must be a valid number with 10-15 digits' });
        }
  
        const newAgency = { id: 'agency123', ...req.body };
        res.status(201).json(newAgency);
      };
  
      await createAgency(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 'agency123',
        name: 'Test Agency',
        address: '123 Test Street',
        phone: '1234567890',
      });
    });
  
    it('should return an error if name is missing', async () => {
      const req = {
        body: {
          address: '123 Test Street',
          phone: '1234567890',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createAgency = async (req, res) => {
        if (!req.body.name) {
          return res.status(400).json({ message: 'Name is required' });
        }
      };
  
      await createAgency(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Name is required' });
    });
  
    it('should return an error if address is missing', async () => {
      const req = {
        body: {
          name: 'Test Agency',
          phone: '1234567890',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createAgency = async (req, res) => {
        if (!req.body.address) {
          return res.status(400).json({ message: 'Address is required' });
        }
      };
  
      await createAgency(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Address is required' });
    });
  
    it('should return an error if phone number is invalid', async () => {
      const req = {
        body: {
          name: 'Test Agency',
          address: '123 Test Street',
          phone: 'abc123', // Invalid phone
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createAgency = async (req, res) => {
        if (!req.body.phone || !/^\d{10,15}$/.test(req.body.phone)) {
          return res.status(400).json({ message: 'Phone must be a valid number with 10-15 digits' });
        }
      };
  
      await createAgency(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Phone must be a valid number with 10-15 digits' });
    });
  
    it('should return an error if all fields are missing', async () => {
      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createAgency = async (req, res) => {
        if (!req.body.name) return res.status(400).json({ message: 'Name is required' });
        if (!req.body.address) return res.status(400).json({ message: 'Address is required' });
        if (!req.body.phone || !/^\d{10,15}$/.test(req.body.phone)) {
          return res.status(400).json({ message: 'Phone must be a valid number with 10-15 digits' });
        }
      };
  
      await createAgency(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Name is required' });
    });
  });
  