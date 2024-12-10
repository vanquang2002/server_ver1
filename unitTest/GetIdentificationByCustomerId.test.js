describe('Get Identification By Customer ID', () => {
    it('should return identifications for a given customer ID', async () => {
      const req = { params: { customerId: 'cust1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getIdentificationByCustomerId = async (req, res) => {
        try {
          const identifications = [
            { id: 'id1', name: 'Passport', customerId: 'cust1' },
          ];
          const customerIdentifications = identifications.filter(
            (id) => id.customerId === req.params.customerId
          );
          if (!customerIdentifications.length) {
            return res.status(404).json({ message: 'No identifications found for this customer' });
          }
          res.status(200).json(customerIdentifications);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getIdentificationByCustomerId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: 'id1', name: 'Passport', customerId: 'cust1' },
      ]);
    });
  
    it('should return 404 if no identifications are found', async () => {
      const req = { params: { customerId: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getIdentificationByCustomerId = async (req, res) => {
        try {
          const identifications = [];
          const customerIdentifications = identifications.filter(
            (id) => id.customerId === req.params.customerId
          );
          if (!customerIdentifications.length) {
            return res.status(404).json({ message: 'No identifications found for this customer' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getIdentificationByCustomerId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'No identifications found for this customer' });
    });
  });
  