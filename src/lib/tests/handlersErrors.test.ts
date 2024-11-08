import {
  listError,
  htmlElementNotFound,
  elementNotFound,
  nodeNotFound,
} from '../handlers/handlersErrors';

describe('listError', () => {
  it('returns an error when list is empty', () => {
    const error = listError([], 'test context', ['Array']);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toContain('Error capturing elements for List');
  });

  it('returns an error when expected namespaces are missing', () => {
    const error = listError([{}], 'test context', []);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toContain('Error capturing Expected namespaces');
  });
});
describe('htmlElementNotFound', () => {
  it('returns an error when HTMLElement is not found', () => {
    const error = htmlElementNotFound(null, 'Test Context', ['HTMLElement']);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toContain('HTMLELEMENT ERROR');
  });
});
describe('elementNotFound', () => {
  it('returns an error when Element is not found', () => {
    const error = elementNotFound(null, 'Test Context', ['HTMLElement']);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toContain('ELEMENT ERROR');
  });
});
describe('nodeNotFound', () => {
  it('returns an error when Node is not found', () => {
    const error = nodeNotFound(null, 'Test Context', ['Node']);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toContain('NODE ERROR');
  });
});
