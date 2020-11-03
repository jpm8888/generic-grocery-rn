

export function chunk_array(arr, chunk) {
    let i, j, tempArray = [];
    for (i = 0 , j = arr.length; i < j; i += chunk) {
        tempArray.push(arr.slice(i, i + chunk));
    }
    return tempArray
}
