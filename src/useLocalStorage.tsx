import { Dispatch, SetStateAction, useEffect, useState } from "react";
 
type SetValue<T> = Dispatch<SetStateAction<T>>;

function useLocalStorage<T>(key: string, defaultValue: T): [T, SetValue<T>] {
    const readValue = (): T => {
        if (typeof window === 'undefined') return defaultValue;

        try {
            const item = window.localStorage.getItem(key);
            return item ? (parseJSON(item) as T) : defaultValue;
        } catch(error) {
            console.warn(`#useLocalStorage: an error occurred loading the localStorage key “${key}”:`, error);
            return defaultValue;
        }
    };

    const [storedValue, setStoredValue] = useState<T>(readValue);

    const setValue: SetValue<T> = (value: unknown) => {
        if (typeof window === 'undefined') console.warn(`#useLocalStorage: impossible to set the localStorage “${key}” inside a no-client context.`);

        try {
            const newValue = value instanceof Function ? value(storedValue) : value;

            window.localStorage.setItem(key, JSON.stringify(newValue));
            setStoredValue(newValue);
        } catch(error) {
            console.warn(`#useLocalStorage: error setting the localStorage key “${key}”:`, error);
        }
    };

    useEffect(() => {
        setStoredValue(readValue());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [storedValue, setValue];
};

function parseJSON<T>(value: string | null): T | undefined {
    try {
        return value === 'undefined' ? undefined : JSON.parse(value ?? '');
    } catch {
        console.log('parsing error on', {value});
        return undefined;
    }
};

export default useLocalStorage;