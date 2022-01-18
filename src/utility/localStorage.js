//get key item
export const getItem = (key) => {
    //const data = typeof window !== 'undefined' ? localStorage.getItem(key) : '';
    const data = localStorage.getItem(key);
    try {
        return JSON.parse(data);
    } catch (error) {
        return data;
    };
};

//set key item
export const setItem = (key, value) => {
    const data = typeof value !== 'string' ? JSON.stringify(value) : value;
    return localStorage.setItem(key, data);
};

//remove item
export const removeItem = (key) => {
    localStorage.removeItem(key);
};

