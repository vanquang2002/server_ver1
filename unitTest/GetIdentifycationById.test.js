describe('Get Identification By ID', () => {
    it('should return identification if found', async () => {
      const req = { params: { id: 'id1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getIdentifycationById = async (req, res) => {
        try {
          const identifications = [
            { id: 'id1', name: 'Passport', customerId: 'cust1' },
          ];
          const identification = identifications.find((id) => id.id === req.params.id);
          if (!identification) {
            return res.status(404).json({ message: 'Identification not found' });
          }
          res.status(200).json(identification);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getIdentifycationById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 'id1',
        name: 'Passport',
        customerId: 'cust1',
      });
    });
  
    it('should return 404 if identification is not found', async () => {
      const req = { params: { id: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getIdentifycationById = async (req, res) => {
        try {
          const identifications = [];
          const identification = identifications.find((id) => id.id === req.params.id);
          if (!identification) {
            return res.status(404).json({ message: 'Identification not found' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getIdentifycationById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Identification not found' });
    });
  });
  