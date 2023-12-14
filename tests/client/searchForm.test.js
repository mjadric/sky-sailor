import axios from 'axios';
import { handleDepartureCityChange } from '../../client/src/components/SearchForm';

// Mock axios
jest.mock('axios');

describe('handleDepartureCityChange', () => {
  it('fetches departure towns on city change', async () => {
    const inputCity = 'City1';
    const setDepartureCity = jest.fn();
    const setDepartureTowns = jest.fn();
    const setLoading = jest.fn();

    // Mock axios.get
    axios.get.mockResolvedValue({
      data: {
        towns: [{ town_ID: 1, name: 'Town1' }, { town_ID: 2, name: 'Town2' }],
      },
    });

    // Simulate event
    const event = { target: { value: inputCity } };

    await handleDepartureCityChange(event, setDepartureCity, setDepartureTowns, setLoading);

    // Assertions
    expect(setDepartureCity).toHaveBeenCalledWith(inputCity);
    expect(setLoading).toHaveBeenCalledWith(true);
    expect(axios.get).toHaveBeenCalledWith(`http://localhost:8800/api/towns?query=${inputCity}`);
    expect(setDepartureTowns).toHaveBeenCalledWith([{ town_ID: 1, name: 'Town1' }, { town_ID: 2, name: 'Town2' }]);
    expect(setDepartureTowns).not.toHaveBeenCalledWith([]); // Assuming you clear towns only on successful fetch
    expect(setLoading).toHaveBeenCalledWith(false);
  });
});
