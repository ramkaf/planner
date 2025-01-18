import { Address } from "src/address/entities/address.entity";
import { IAddressRepository } from "../address-repository.interface";

export class MockAddressRepository implements IAddressRepository {
  private mockData: Address[] = [];

  create = jest.fn((address) => ({ ...address, id: this.mockData.length + 1 }));

  save = jest.fn((address) => {
    const index = this.mockData.findIndex((item) => item.id === address.id);
    if (index > -1) {
      this.mockData[index] = address;
    } else {
      this.mockData.push(address);
    }
    return Promise.resolve(address); // Ensure save returns a Promise
  });

  find = jest.fn(() => Promise.resolve([...this.mockData])); // Return a Promise

  findOne = jest.fn(({ where: { id } }) =>
    Promise.resolve(this.mockData.find((address) => address.id === id) || null)
  );

  remove = jest.fn((address) => {
    const index = this.mockData.findIndex((item) => item.id === address.id);
    if (index > -1) {
      this.mockData.splice(index, 1);
    }
    return Promise.resolve(); // Ensure remove returns a Promise
  });

  setMockData(data: Address[]): void {
    this.mockData = [...data];
  }
}
