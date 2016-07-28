import { guid } from './utils';


describe('guid', () => {

    let guid1 = guid();
    let guid2 = guid();

    it('should always return a random GUID', () => {
        expect(guid1).not.toEqual(guid2);
    });
});