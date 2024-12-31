const useHotKeysClassifier = (hotkeys: { key: string, event: string }[]) => {
    const getEventByKey = (e: React.KeyboardEvent) => {
        for(const hotkey of hotkeys) {
            if(e.altKey && e.key === hotkey.key) {
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