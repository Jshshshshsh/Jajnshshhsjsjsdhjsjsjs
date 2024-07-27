import request from '../../services/request';
import axios from 'axios'

describe('Request', () => {
  beforeEach(() => {
    jest.spyOn(request, 'get').mockResolvedValue({ data: { message: 'Hello, World!' } });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should successfully make a GET request', async () => {
    const result = await request.get('https://example.com/api/message');

    expect(result).toEqual({ data: { message: 'Hello, World!' }});

  });


});