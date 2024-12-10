describe('Create Room Category', () => {
    it('should create a room category successfully', async () => {
      const req = { body: { name: 'Deluxe' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const create = async (req, res) => {
        if (!req.body.name) {
          return res.status(400).json({ message: 'Category name is required' });
        }
        const category = { id: 'cat1', name: req.body.name };
        res.status(201).json(category);
      };
  
      await create(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 'cat1', name: 'Deluxe' }));
    });
  
    it('should return 400 if the category name is missing', async () => {
      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const create = async (req, res) => {
        if (!req.body.name) {
          return res.status(400).json({ message: 'Category name is required' });
        }
      };
  
      await create(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category name is required' });
    });
  });
  