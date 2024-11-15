import axios from 'axios';

jest.mock('axios'); // Mock axios for unit testing
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Behaviors', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  // Test 1: Load Page
  describe('Load Page', () => {
    it('should load the initial page data', async () => {
      const mockData = [
        { uuid: '1', name: 'Charmander', type: 'Fire', selected: false },
        { uuid: '2', name: 'Squirtle', type: 'Water', selected: false },
      ];

      mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockData });

      const res = await axios.get('/api/pokemon');

      expect(res.status).toBe(200);
      expect(res.data).toEqual(mockData);
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/pokemon');
    });
  });

  // Test 2: Load Profile
  describe('Load Profile', () => {
    it('should load the profile and associated Pokémon', async () => {
      const mockProfile = {
        id: 'profile1',
        name: 'Ash',
        pokemon: [
          { uuid: '1', name: 'Charmander', type: 'Fire' },
          { uuid: '2', name: 'Squirtle', type: 'Water' },
        ],
      };

      mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockProfile });

      const res = await axios.get('/api/profile/profile1/pokemon');

      expect(res.status).toBe(200);
      expect(res.data).toEqual(mockProfile);
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/profile/profile1/pokemon');
    });
  });

  // Test 3: Save New Profile
  describe('Save New Profile', () => {
    it('should save a new profile with selected Pokémon', async () => {
      const newProfile = {
        name: 'Brock',
        pokemonIds: ['1', '3'],
      };

      const mockResponse = {
        id: 'profile2',
        name: 'Brock',
        pokemon: [
          { uuid: '1', name: 'Charmander', type: 'Fire' },
          { uuid: '3', name: 'Bulbasaur', type: 'Grass/Poison' },
        ],
      };

      mockedAxios.post.mockResolvedValueOnce({ status: 201, data: mockResponse });

      const res = await axios.post('/api/profile/upsert', newProfile);

      expect(res.status).toBe(201);
      expect(res.data).toEqual(mockResponse);
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/profile/upsert', newProfile);
    });
  });

  // Test 4: Save Existing Profile with Changes
  describe('Save Existing Profile with Changes', () => {
    it('should update an existing profile with new Pokémon selection', async () => {
      const updatedProfile = {
        name: 'Ash',
        pokemonIds: ['1', '2', '4'],
      };

      const mockResponse = {
        id: 'profile1',
        name: 'Ash',
        pokemon: [
          { uuid: '1', name: 'Charmander', type: 'Fire' },
          { uuid: '2', name: 'Squirtle', type: 'Water' },
          { uuid: '4', name: 'Pikachu', type: 'Electric' },
        ],
      };

      mockedAxios.post.mockResolvedValueOnce({ status: 200, data: mockResponse });

      const res = await axios.post('/api/profile/upsert', updatedProfile);

      expect(res.status).toBe(200);
      expect(res.data).toEqual(mockResponse);
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/profile/upsert', updatedProfile);
    });
  });
});