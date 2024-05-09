export function getTypedArray(array, Type) {
    const TYPES = ['Number', 'String'];

    const arrayConstructor = value => TYPES.includes(Type.name) ? Type(value) : new Type(value);
    const hasElements = Array.isArray(array) && !!array.length;

    return hasElements ? array.map(el => arrayConstructor(el)) : [];
};

export const getString = value => value ? String(value) : '';

export const getNumber = value => Number(value) || 0;

export const getBoolean = value => Boolean(value);