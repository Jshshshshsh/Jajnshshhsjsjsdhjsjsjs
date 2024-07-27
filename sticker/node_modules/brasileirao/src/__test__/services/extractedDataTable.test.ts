import { extractedDataTable } from "../../services";

import { readFileSync } from 'fs';
import { resolve } from 'path';

const mockFilePathGE = resolve(__dirname, '__mocks__', 'mock-ge.txt');
const mockFilePathCNN = resolve(__dirname, '__mocks__', 'mock-cnn-raw.html');
const mockFilePathCNNError = resolve(__dirname, '__mocks__', 'mock-cnn-error.html');
const mockFilePathCNNErrorImage = resolve(__dirname, '__mocks__', 'mock-cnn-error-image.html'); 
const mockFilePathCNNErrorAcronym = resolve(__dirname, '__mocks__', 'mock-cnn-error-acronym.html');
const mockFilePathCNNErrorExtractImage = resolve(__dirname, '__mocks__', 'mock-cnn-error-extract-image-text.html');

//import mockCNNSuccess from "./__mocks__/mock-cnn-matchesTableRows.json";



describe('extractData', () => {
  it("Should return the data extracted from GE's provider file", async () => {
    const mockData = readFileSync(mockFilePathGE, 'utf8');
    const table = extractedDataTable(mockData, 'GE');

    expect(table[4].popularName).toBe('Vasco');
  });

  it("Should throw an error if the table couldn't be found", async () => {
    const mockData = '';

    expect(() => extractedDataTable(mockData, 'CNN')).toThrowError('Não foi possível encontrar a tabela'); 
  });

  it("Should return the data extracted from CNN's provider file", async () => {
    const mockData = readFileSync(mockFilePathCNN, 'utf8');
    const table = extractedDataTable(mockData, 'CNN');

    expect(table[4].popularName).toBe('Vasco');
  }); 

  it("Should throw an error if score information is not found", async () => {
    const mockData = readFileSync(mockFilePathCNNError, 'utf8');

    expect(() => extractedDataTable(mockData, 'CNN')).toThrowError('Não foi possível encontrar os de pontuação');
  });

  it("Should throw an error if it can't find the images", async () => {
    const mockData = readFileSync(mockFilePathCNNErrorExtractImage, 'utf8');

    expect(() => extractedDataTable(mockData, 'CNN')).toThrowError('Não foi possível extrair a imagem e o nome'); 
  });

  it("Should throw an error if it can't extract the images", async () => {
    const mockData = readFileSync(mockFilePathCNNErrorImage, 'utf8');

    expect(() => extractedDataTable(mockData, 'CNN')).toThrowError('Não foi possível encontrar a imagem'); 
  });

   it("Should throw an error if it can't extract the acronym", async () => {
    const mockData = readFileSync(mockFilePathCNNErrorAcronym, 'utf8');

    expect(() => extractedDataTable(mockData, 'CNN')).toThrowError('Não foi possível encontrar a sigla');
  });

  it("Should throw an error if it can't find the values to extract", async () => {
    const mockData = 'lorem ipsum';

    expect(() => extractedDataTable(mockData, 'GE')).toThrowError('Não foi possível encontrar a tabela EXDD');
  });

});