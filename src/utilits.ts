export const myRequest = async (url: string, option: {}) => {
    try {
        const response = await fetch(url, option);
        if (response.status !== 200) {
            return { status: 'ERROR', value: response.status };
        }
        if (response === undefined) {
            return { status: 'ERROR', value: 'ошибка сети' };
        };
        const json = await response.json();
        console.log(await response)
        return json;
    } catch (error) {
        console.log(error);
        return { status: 'ERROR', value: error };
    };
};

