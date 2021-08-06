import {
  useCallback,
  useState,
  SetStateAction,
  Dispatch,
  ChangeEvent,
} from 'react'

const useInput = <T extends string | number>(
  initialData: T,
): [
  T,
  (e: ChangeEvent<HTMLInputElement>) => void,
  Dispatch<SetStateAction<T>>,
] => {
  const [value, setValue] = useState(initialData)
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue((e.target.value as unknown) as T)
  }, [])
  return [value, handler, setValue]
}

export default useInput
