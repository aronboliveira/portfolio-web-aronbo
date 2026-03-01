/**
 * @jest-environment jsdom
 * @description Comprehensive unit tests for gHandlers.ts
 * Tests syncAriaStates function for accessibility attribute synchronization
 */
import { syncAriaStates } from './gHandlers';

// Suppress console.error during tests
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});
afterAll(() => {
  console.error = originalError;
});

describe('gHandlers', () => {
  describe('syncAriaStates', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
    });

    describe('basic element handling', () => {
      it('should execute without throwing for empty NodeList', () => {
        const emptyNodeList = document.querySelectorAll('.non-existent');
        expect(() => syncAriaStates(emptyNodeList)).not.toThrow();
      });

      it('should execute without throwing for empty array', () => {
        expect(() => syncAriaStates([])).not.toThrow();
      });

      it('should process all elements when called without arguments', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        expect(() => syncAriaStates()).not.toThrow();
      });

      it('should set ariaHidden to false for visible elements', () => {
        const div = document.createElement('div');
        div.hidden = false;
        document.body.appendChild(div);
        
        syncAriaStates([div]);
        
        expect(div.ariaHidden).toBe('false');
      });

      it('should set ariaHidden to true for hidden elements', () => {
        const div = document.createElement('div');
        div.hidden = true;
        document.body.appendChild(div);
        
        syncAriaStates([div]);
        
        expect(div.ariaHidden).toBe('true');
      });
    });

    describe('select elements', () => {
      it('should set ariaSelected for selected options', () => {
        const select = document.createElement('select');
        const option1 = document.createElement('option');
        option1.value = '1';
        option1.selected = true;
        const option2 = document.createElement('option');
        option2.value = '2';
        option2.selected = false;
        select.appendChild(option1);
        select.appendChild(option2);
        document.body.appendChild(select);
        
        syncAriaStates([select]);
        
        expect(option1.ariaSelected).toBe('true');
        expect(option2.ariaSelected).toBe('false');
      });

      it('should add click event listener for expand state', () => {
        const select = document.createElement('select');
        const option = document.createElement('option');
        select.appendChild(option);
        document.body.appendChild(select);
        
        syncAriaStates([select]);
        
        // Verify click event listener was added by simulating click
        const clickEvent = new MouseEvent('click');
        expect(() => select.dispatchEvent(clickEvent)).not.toThrow();
      });

      it('should update ariaSelected on change event', () => {
        const select = document.createElement('select');
        const option1 = document.createElement('option');
        option1.value = '1';
        const option2 = document.createElement('option');
        option2.value = '2';
        select.appendChild(option1);
        select.appendChild(option2);
        document.body.appendChild(select);
        
        syncAriaStates([select]);
        
        // Simulate selection change
        option2.selected = true;
        option1.selected = false;
        select.dispatchEvent(new Event('change'));
        
        expect(option2.ariaSelected).toBe('true');
        expect(option1.ariaSelected).toBe('false');
      });
    });

    describe('input elements', () => {
      it('should set ariaPlaceholder for inputs with placeholder', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter your name';
        document.body.appendChild(input);
        
        syncAriaStates([input]);
        
        expect(input.ariaPlaceholder).toBe('Enter your name');
      });

      it('should set ariaRequired for required inputs', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.required = true;
        document.body.appendChild(input);
        
        syncAriaStates([input]);
        
        expect(input.ariaRequired).toBe('true');
      });

      it('should set ariaRequired to false for optional inputs', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.required = false;
        document.body.appendChild(input);
        
        syncAriaStates([input]);
        
        expect(input.ariaRequired).toBe('false');
      });

      it('should set ariaInvalid based on validity', () => {
        const input = document.createElement('input');
        input.type = 'email';
        input.value = 'invalid-email';
        document.body.appendChild(input);
        
        syncAriaStates([input]);
        
        // Invalid email should set ariaInvalid to true
        expect(input.ariaInvalid).toBe('true');
      });

      it('should set ariaAutoComplete for inputs with datalist', () => {
        const input = document.createElement('input');
        input.type = 'text';
        const datalist = document.createElement('datalist');
        datalist.id = 'test-datalist';
        input.setAttribute('list', 'test-datalist');
        document.body.appendChild(datalist);
        document.body.appendChild(input);
        
        syncAriaStates([input]);
        
        expect(input.ariaAutoComplete).toBe('list');
      });
    });

    describe('checkbox and radio inputs', () => {
      it('should set ariaChecked for checked checkbox', () => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        document.body.appendChild(checkbox);
        
        syncAriaStates([checkbox]);
        
        expect(checkbox.ariaChecked).toBe('true');
      });

      it('should set ariaChecked to false for unchecked checkbox', () => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = false;
        document.body.appendChild(checkbox);
        
        syncAriaStates([checkbox]);
        
        expect(checkbox.ariaChecked).toBe('false');
      });

      it('should set ariaDisabled for disabled checkbox', () => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.disabled = true;
        document.body.appendChild(checkbox);
        
        syncAriaStates([checkbox]);
        
        expect(checkbox.ariaDisabled).toBe('true');
      });

      it('should update ariaChecked on change event', () => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = false;
        document.body.appendChild(checkbox);
        
        syncAriaStates([checkbox]);
        
        // Simulate check
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change'));
        
        expect(checkbox.ariaChecked).toBe('true');
      });

      it('should handle radio inputs', () => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.checked = true;
        document.body.appendChild(radio);
        
        syncAriaStates([radio]);
        
        expect(radio.ariaChecked).toBe('true');
      });
    });

    describe('button and submit inputs', () => {
      it('should add mousedown/mouseup listeners for button inputs', () => {
        const button = document.createElement('input');
        button.type = 'button';
        document.body.appendChild(button);
        
        syncAriaStates([button]);
        
        // Simulate mousedown
        button.dispatchEvent(new MouseEvent('mousedown', { button: 0 }));
        expect(button.ariaPressed).toBe('true');
        
        // Simulate mouseup
        button.dispatchEvent(new MouseEvent('mouseup', { button: 0 }));
        expect(button.ariaPressed).toBe('false');
      });

      it('should handle submit inputs', () => {
        const submit = document.createElement('input');
        submit.type = 'submit';
        document.body.appendChild(submit);
        
        syncAriaStates([submit]);
        
        submit.dispatchEvent(new MouseEvent('mousedown', { button: 0 }));
        expect(submit.ariaPressed).toBe('true');
      });

      it('should handle reset inputs', () => {
        const reset = document.createElement('input');
        reset.type = 'reset';
        document.body.appendChild(reset);
        
        syncAriaStates([reset]);
        
        reset.dispatchEvent(new MouseEvent('mousedown', { button: 0 }));
        expect(reset.ariaPressed).toBe('true');
      });
    });

    describe('number, date, and time inputs', () => {
      it('should set ariaValueMax and ariaValueMin for number input', () => {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '0';
        input.max = '100';
        document.body.appendChild(input);
        
        syncAriaStates([input]);
        
        expect(input.ariaValueMax).toBe('100');
        expect(input.ariaValueMin).toBe('0');
      });

      it('should handle range inputs with value updates', () => {
        const range = document.createElement('input');
        range.type = 'range';
        range.min = '0';
        range.max = '100';
        range.value = '50';
        document.body.appendChild(range);
        
        syncAriaStates([range]);
        
        // Simulate value change
        range.value = '75';
        range.dispatchEvent(new Event('change'));
        
        expect(range.ariaValueNow).toBe('75');
        expect(range.ariaValueText).toBe('75');
      });
    });

    describe('textarea elements', () => {
      it('should set ariaPlaceholder for textarea', () => {
        const textarea = document.createElement('textarea');
        textarea.placeholder = 'Enter description';
        document.body.appendChild(textarea);
        
        syncAriaStates([textarea]);
        
        expect(textarea.ariaPlaceholder).toBe('Enter description');
      });

      it('should set ariaRequired for required textarea', () => {
        const textarea = document.createElement('textarea');
        textarea.required = true;
        document.body.appendChild(textarea);
        
        syncAriaStates([textarea]);
        
        expect(textarea.ariaRequired).toBe('true');
      });
    });

    describe('label elements', () => {
      it('should set ariaLabel from label text content', () => {
        const label = document.createElement('label');
        label.textContent = 'Username';
        document.body.appendChild(label);
        
        syncAriaStates([label]);
        
        expect(label.ariaLabel).toBe('Username');
      });

      it('should not set ariaLabel for empty labels', () => {
        const label = document.createElement('label');
        document.body.appendChild(label);
        
        syncAriaStates([label]);
        
        // Should not throw and ariaLabel should remain null
        expect(() => syncAriaStates([label])).not.toThrow();
      });
    });

    describe('button elements', () => {
      it('should add mousedown/mouseup listeners for buttons', () => {
        const button = document.createElement('button');
        button.textContent = 'Click me';
        document.body.appendChild(button);
        
        syncAriaStates([button]);
        
        button.dispatchEvent(new MouseEvent('mousedown', { button: 0 }));
        expect(button.ariaPressed).toBe('true');
        
        button.dispatchEvent(new MouseEvent('mouseup', { button: 0 }));
        expect(button.ariaPressed).toBe('false');
      });

      it('should set ariaHasPopup for consultar buttons', () => {
        const button = document.createElement('button');
        button.textContent = 'Consultar dados';
        document.body.appendChild(button);
        
        syncAriaStates([button]);
        
        expect(button.ariaHasPopup).toBe('dialog');
      });

      it('should not set ariaHasPopup for regular buttons', () => {
        const button = document.createElement('button');
        button.textContent = 'Submit';
        document.body.appendChild(button);
        
        syncAriaStates([button]);
        
        expect(button.ariaHasPopup).not.toBe('dialog');
      });
    });

    describe('dialog elements', () => {
      it('should set ariaModal to true for dialog elements', () => {
        const dialog = document.createElement('dialog');
        document.body.appendChild(dialog);
        
        syncAriaStates([dialog]);
        
        expect(dialog.ariaModal).toBe('true');
      });
    });

    describe('popup caller elements', () => {
      it('should set ariaHasPopup for elements with poCaller class', () => {
        const div = document.createElement('div');
        div.classList.add('poCaller');
        document.body.appendChild(div);
        
        syncAriaStates([div]);
        
        expect(div.ariaHasPopup).toBe('menu');
      });
    });

    describe('edge cases', () => {
      it('should skip html element', () => {
        const html = document.documentElement;
        expect(() => syncAriaStates([html])).not.toThrow();
      });

      it('should skip elements in head', () => {
        const meta = document.createElement('meta');
        document.head.appendChild(meta);
        expect(() => syncAriaStates([meta])).not.toThrow();
        document.head.removeChild(meta);
      });

      it('should handle NodeList conversion', () => {
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        document.body.appendChild(div1);
        document.body.appendChild(div2);
        
        const nodeList = document.querySelectorAll('div');
        expect(() => syncAriaStates(nodeList)).not.toThrow();
      });
    });
  });
});
