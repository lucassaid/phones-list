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

export const validateRange = ({from, to}, alert) => {
  if(!from || !to) {
    alert({title: 'Rango incompleto'})
    return false
  } else if(to <= from) {
    alert({title: 'El número final debe ser mayor al inicial'})
    return false
  } else if(to - from  > 200) {
    alert({title: 'El límite de números es 200'})
    return false
  }
  return true
}

export const generateSequence = (from, to, alert, setGenerating) => {
  if(!validateRange({from, to}, alert)) return
  setGenerating(true)
  const mapArr = (o, n) => from + n
  const numbersArr = Array.from(new Array(to - from + 1), mapArr)
  return shuffle(numbersArr)
}