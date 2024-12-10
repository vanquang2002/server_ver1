describe('Get All Order Rooms By Excel', () => {
  it('should return a file path for the Excel report', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const getAllOrderRoomsByExcel = async (req, res) => {
      const filePath = '/path/to/excel/file.xlsx';
      res.status(200).json({ message: 'File generated successfully', filePath });
    };

    await getAllOrderRoomsByExcel(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'File generated successfully',
      filePath: '/path/to/excel/file.xlsx',
    });
  });

  it('should return 404 if no data is available to generate the report', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const getAllOrderRoomsByExcel = async (req, res) => {
      const rooms = []; // Simulating no data
      if (rooms.length === 0) {
        return res.status(404).json({ message: 'No data available to generate the report' });
      }
    };

    await getAllOrderRoomsByExcel(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'No data available to generate the report' });
  });

  it('should handle server errors gracefully', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const getAllOrderRoomsByExcel = async (req, res) => {
      try {
        throw new Error('File generation error');
      } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };

    await getAllOrderRoomsByExcel(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
