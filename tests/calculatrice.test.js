import { Calculatrice } from '../src/calculatrice';

it('should adds 1 + 2 to equal 3', () => {
    const c = new Calculatrice()
    expect(
        c.add(1, 2)
    ).toBe(3);
});
