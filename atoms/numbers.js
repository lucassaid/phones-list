import {
  atom,
  selector
} from 'recoil';

const numbersState = atom({
  key: 'numbersState',
  default: {},
});

export const numbersSelector = selector({
  key: 'getNumbersState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const numbers = get(numbersState);

    return Object.keys(numbers).map(id => ({ ...numbers[id], id}));
  },
});

export default numbersState