const useModelProcessor = () => {
    const getInputPath = (path: string) => {
        return path?.split('.').join('.fields.');

    }
    return { getInputPath }
}
export default useModelProcessor;