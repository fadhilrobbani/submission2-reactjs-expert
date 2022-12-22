import { useState } from 'react';

function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const handleValueChange = (ev) => setValue(ev.target.value);
  return [value, handleValueChange];
}

export default useInput;
