export const shuffle = sourceArray => {
  const copy = Array.from(sourceArray)
  for (let i = 0; i < copy.length - 1; i++) {
      const j = i + Math.floor(Math.random() * (copy.length - i));
      const temp = copy[j];
      copy[j] = copy[i];
      copy[i] = temp;
  }
  return copy;
}

export const validateRange = ({from, to}) => {
  if(!from || !to) throw new Error('Campos incompletos')
  if(to <= from) throw new Error('El número final debe ser mayor al inicial')
  if(to - from  > 200) throw new Error('El límite de números es 200')
}

export const generateSequence = ({from, to}) => {
  const mapArr = (o, n) => from + n
  return Array.from(new Array(to - from + 1), mapArr)
}