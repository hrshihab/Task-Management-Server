import request from 'supertest';
import app from '../../app'; // Assuming your Express app is exported from here
//import { User } from '../modules/user/user.model';

//import bcrypt from 'bcrypt';

jest.mock('../modules/user/user.model'); // Mock the User model

describe('POST /api/v1/auth/login', () => {
  const loginEndpoint = '/api/v1/auth/login';

  it('should return 200 and a token for valid credentials', async () => {
    // Mock the database query for finding a user
    // const mockUser = {
    //   _id: 'user123',
    //   email: 'test@gmail.com',
    //   password: 'hashed_password', // Assume this is the hashed password
    //   role: 'user',
    //   status: 'Active', // User is active
    // };
    // (User.findOne as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app)
      .post(loginEndpoint)
      .send({
        email: 'test@gmail.com',
        password: 'hashed_password',
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.accessToken).toBe('mockedToken');
  });

//   it('should return 401 for invalid credentials', async () => {
//     // Mock the database query for finding a user
//     (User.findOne as jest.Mock).mockResolvedValue(null);

//     const response = await request(app)
//       .post(loginEndpoint)
//       .send({
//         email: 'test@gmail.com',
//         password: 'wrongPassword',
//       });

//     expect(response.status).toBe(401);
//     expect(response.body.success).toBe(false);
//     expect(response.body.message).toBe('Invalid email or password!');
//   });

//   it('should return 403 if the user is inactive', async () => {
//     // Mock the database query for finding a user
//     const mockUser = {
//       _id: 'user123',
//       email: 'test@mail.com',
//       password: await bcrypt.hash('password123', 10),
//       role: 'user',
//       status: 'Inactive', // User is inactive
//     };
//     (User.findOne as jest.Mock).mockResolvedValue(mockUser);

//     const response = await request(app)
//       .post(loginEndpoint)
//       .send({
//         email: 'test@mail.com',
//         password: 'password123',
//       });

//     expect(response.status).toBe(403);
//     expect(response.body.success).toBe(false);
//     expect(response.body.message).toBe('Your account is blocked!');
//   });

//   it('should return 500 for server errors', async () => {
//     // Mock the database query to throw an error
//     (User.findOne as jest.Mock).mockRejectedValue(new Error('Server Error'));

//     const response = await request(app)
//       .post(loginEndpoint)
//       .send({
//         email: 'test@mail.com',
//         password: 'password123',
//       });

//     expect(response.status).toBe(500);
//     expect(response.body.success).toBe(false);
//     expect(response.body.message).toBe('Something went wrong!');
//   });
});
