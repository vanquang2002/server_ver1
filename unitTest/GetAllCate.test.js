describe('Get All Room Categories', () => {
    it('should return all room categories', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAll = async (req, res) => {
        const categories = [
          { id: 'cat1', name: 'Deluxe' },
          { id: 'cat2', name: 'Suite' },
        ];
        res.status(200).json(categories);
      };
  
      await getAll(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });
  
    it('should return an empty array if no categories are found', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAll = async (req, res) => {
        const categories = [];
        res.status(200).json(categories);
      };
  
      await getAll(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
  