import { User } from '../types';

// Mock user data for testing
const MOCK_USERS = [
  {
    id: '1',
    username: 'test',
    password: 'test123'
  }
];

export const loginUser = async (username: string, password: string): Promise<{ token: string; user: User }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const user = MOCK_USERS.find(u => u.username === username && u.password === password);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Generate a mock JWT token
  const token = btoa(JSON.stringify({ userId: user.id, username: user.username }));

  return {
    token,
    user: {
      id: user.id,
      username: user.username
    }
  };
};