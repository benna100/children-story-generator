export function hasSessionStorage(key) {
    let stableDiffusionSessionStorage = sessionStorage.getItem(key);
    const doesSessionStorageExist = stableDiffusionSessionStorage && stableDiffusionSessionStorage !== "null" && stableDiffusionSessionStorage !== ""
    return doesSessionStorageExist;
}

