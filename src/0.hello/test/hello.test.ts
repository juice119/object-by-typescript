import { hello } from '../src/hello';

describe('0.0.hello test를 수행합니다.', () => {
  it('hello함수는 "0.0.hello"를 응답합니다.', () => {
    expect(hello()).toBe('hello');
  });
});
