export const useStringUtilities = () => {
    const trim = (str: string) => {
        if (str.length > 17) {
            return str.slice(0, 17).concat('...');
        }
        return str;
    }
    return {
        trim
    }
}