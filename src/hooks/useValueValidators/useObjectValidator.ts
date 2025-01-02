export const useObjectValidator = () => {
    const isObjectDatatype = (datatype: string) => ['Object'].includes(datatype)
    return {
        isObjectDatatype
    }
}