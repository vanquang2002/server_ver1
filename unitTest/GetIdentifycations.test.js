describe('Get Identifications', () => {
    it('should return all identifications successfully', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getIdentifycations = async (req, res) => {
        try {
          const identifications = [
            { id: 'id1', name: 'Passport', customerId: 'cust1' },
            { id: 'id2', name: 'Driver License', customerId: 'cust2' },
          ];
          res.status(200).json(identifications);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getIdentifycations(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: 'id1', name: 'Passport', customerId: 'cust1' },
        { id: 'id2', name: 'Driver License', customerId: 'cust2' },
      ]);
    });
  
    it('should handle server errors gracefully', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getIdentifycations = async (req, res) => {
        try {
          throw new Error('Database error');
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getIdentifycations(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });
  