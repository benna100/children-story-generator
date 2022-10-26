export function hasLocalStorage(key) {
    let stableDiffusionSessionStorage = localStorage.getItem(key);
    const doesSessionStorageExist = stableDiffusionSessionStorage && stableDiffusionSessionStorage !== "null" && stableDiffusionSessionStorage !== ""
    return doesSessionStorageExist;
}

