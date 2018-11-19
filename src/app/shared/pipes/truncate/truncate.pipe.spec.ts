import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
    let pipe: TruncatePipe;

    beforeEach(() => {
        pipe = new TruncatePipe();
    });

    it( 'create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should fail and return', () => {
        expect(pipe.transform('', [150]))
            .toBe('');
    });

    it('should truncate the text to 10 characters followed by ellipses', () => {
        expect(pipe.transform('123456789101112131415', [10]))
            .toBe('1234567891...');
    });
});
