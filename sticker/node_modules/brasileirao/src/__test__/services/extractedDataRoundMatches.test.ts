import { extractedDataRoundMatches } from "../../services";

import { readFileSync } from 'fs';
import { resolve } from 'path';

const mockFilePathGE = resolve(__dirname, '__mocks__', 'mock-ge.txt');

describe('extractedDataRoundMatches', () => {
  it("Should return the data extracted from GE's provider file", async () => {
    const mockData = readFileSync(mockFilePathGE, 'utf8');
    const table = extractedDataRoundMatches(mockData, 'GE');

    expect(table.round_information.current).toBe(3);
  });

  it("Should return an error if the provider is different from CNN", async () => {
    const mockData = readFileSync(mockFilePathGE, 'utf8');

    expect(() => extractedDataRoundMatches(mockData, 'CNN')).toThrowError('No momento apenas o provider GE é suportado');
  });

  it("Should throw an error if it can't find the values to extract", async () => {
    const mockData = 'lorem ipsum';

    expect(() => extractedDataRoundMatches(mockData, 'GE')).toThrowError('Não foi possível encontrar dados das partidas');
  });

});