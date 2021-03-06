import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EMPTY, of } from 'rxjs';

import { CharactersResourceService } from '../data-access';
import { CharactersService } from '../characters.service';
import { Character } from '../Character';
import mockCharacterShape from './mock-character-shape';

describe('CharactersService', () => {
  let resource: CharactersResourceService;
  let service: CharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(CharactersService);
    resource = TestBed.get(CharactersResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('listCharacters()', () => {
    test('when called, then requests data from resource service', fakeAsync(() => {
      jest.spyOn(resource, 'fetchCharacters').mockReturnValueOnce(EMPTY);

      service.listCharacters();

      expect(resource.fetchCharacters).toHaveBeenCalledTimes(1);
    }));

    test('when received data, then returns it as Character instances', () => {
      const mockData = mockCharacterShape();

      jest.spyOn(resource, 'fetchCharacters').mockReturnValueOnce(of([mockData]));

      service.listCharacters().subscribe(data => {
        data.forEach(model => {
          expect(model).toBeInstanceOf(Character);
        });
      });
    });
  });

  describe('listHouseCharacters()', () => {
    test('when called, then requests data from resource service', fakeAsync(() => {
      jest.spyOn(resource, 'fetchCharacters').mockReturnValueOnce(EMPTY);

      service.listHouseCharacters(1);

      expect(resource.fetchCharacters).toHaveBeenCalledTimes(1);
      expect(resource.fetchCharacters).toHaveBeenCalledWith({ houseId: 1 });
    }));

    test('when received data, then returns it as Character instances', () => {
      const mockData = mockCharacterShape();

      jest.spyOn(resource, 'fetchCharacters').mockReturnValueOnce(of([mockData]));

      service.listHouseCharacters(1).subscribe(data => {
        data.forEach(model => {
          expect(model).toBeInstanceOf(Character);
        });
      });
    });
  });

  describe('getCharacter()', () => {
    test('when called, then requests data from resource service', fakeAsync(() => {
      jest.spyOn(resource, 'fetchCharacter').mockReturnValueOnce(EMPTY);

      service.getCharacter(1);

      expect(resource.fetchCharacter).toHaveBeenCalledTimes(1);
      expect(resource.fetchCharacter).toHaveBeenCalledWith(1);
    }));

    test('when received data, then returns it as Character instances', () => {
      const mockData = mockCharacterShape();

      jest.spyOn(resource, 'fetchCharacter').mockReturnValueOnce(of(mockData));

      service.getCharacter(1).subscribe(data => {
        expect(data).toBeInstanceOf(Character);
      });
    });
  });
});
