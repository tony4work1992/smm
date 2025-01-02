export const useListValidator = () => {
    const isListDatatype = (datatype: string) => ['List'].includes(datatype)
    return {
        isListDatatype
    }
}