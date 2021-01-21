import {
  atom,
  selector
} from 'recoil';

const numbersState = atom({
  key: 'numbersState',
  default: {},
  persistence_UNSTABLE: {
    type: 'numbersState'
  },
});

export const numbersSelector = selector({
  key: 'getNumbersState',
  get: ({get}) => {
    const numbers = get(numbersState);

    return Object.keys(numbers).map(id => ({ ...numbers[id], id}));
  },
});

export default numbersState