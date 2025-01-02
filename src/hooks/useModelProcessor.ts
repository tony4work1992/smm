const useModelProcessor = () => {
    const getInputPath = (path: string) => {
        const inputPath = path?.split('.').join('.fields.');
        if (!inputPath) {
            throw new Error(`Path is empty: ${path}`)
        }
        return inputPath;

    }
    return { getInputPath }
}
export default useModelProcessor;