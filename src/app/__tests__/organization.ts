import { Types } from 'mongoose';
import request from 'supertest';
import app from '../../app'; // Adjust the import to your app's entry point
import { Request, Response, NextFunction } from 'express';

// Correct the path to the auth middleware
jest.mock('../middlewares/auth.ts', () => {
  return jest.fn((role) => (req:Request, res:Response, next:NextFunction) => {
    req.user = { role }; // Simulate a user with the required role
    next();
  });
});

describe('Organization POST API', () => {
  it('should create an organization', async () => {
    const orgData = {
      name: 'Test Organizatio55n',
      owner: new Types.ObjectId('6791361f2d68985ea411e66f'),
    };

    try {
      const response = await request(app)
        .post('/api/v1/organization/create-organization')
        .send(orgData);

      console.log('Response Status:', response.statusCode);
      console.log('Response Body:', response.body);

      expect(response.statusCode).toBe(200);
    } catch (error) {
      console.error('Error during test execution:', error);
      throw error; // Re-throw the error to ensure the test fails
    }
  }, 20000);
}); 
