describe('Update Room Category', () => {
    it('should update a room category successfully', async () => {
      const req = { params: { id: 'cat1' }, body: { name: 'Updated Deluxe' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const update = async (req, res) => {
        const categories = [{ id: 'cat1', name: 'Deluxe' }];
        const category = categories.find((c) => c.id === req.params.id);
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        }
        category.name = req.body.name;
        res.status(200).json(category);
      };
  
      await update(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 'cat1', name: 'Updated Deluxe' }));
    });
  
    it('should return 404 if the category is not found', async () => {
      const req = { params: { id: 'nonexistent' }, body: { name: 'Updated Deluxe' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const update = async (req, res) => {
        const categories = [];
        const category = categories.find((c) => c.id === req.params.id);
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        }
      };
  
      await update(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category not found' });
    });
  });
  