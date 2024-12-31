const useHotKeysClassifier = (hotkeys: { key: string, event: string }[]) => {
    const getEventByKey = (e: React.KeyboardEvent<HTMLElement>) => {
        for (const hotkey of hotkeys) {
            if (e.altKey && e.code === hotkey.key) {
                e.preventDefault()
                return hotkey.event;
            }
        }
        return null;
    }
    return {
        getEventByKey
    }
}

export default useHotKeysClassifier;