import {useState} from 'react';

export const useSetInput = () => {
  const [input, setInput] = useState({});

  const handleSetInput = (event) => setInput({
    ...input,
    [event.currentTarget.name]: event.currentTarget.value
  });

  return [input, handleSetInput];
}