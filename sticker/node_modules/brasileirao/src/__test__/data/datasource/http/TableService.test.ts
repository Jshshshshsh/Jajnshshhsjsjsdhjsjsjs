import {TableService} from '../../../../data/datasource/http'

describe('TableService', () => {
  it("Should return the league's standings table", async () => {
    const liga = 'a'; 
    const provider = 'GE'; 
    const result = await TableService(provider, liga);

    expect(result.provider).toBe(provider); 
    expect(result.data).toBeDefined(); 
  });

  it("Should throw an error if the league doesn't exist", async () => {
    const liga = 'c'; 
    const provider = 'CNN'; 
    await expect(TableService(provider, liga)).rejects.toThrow(); 
  });


});