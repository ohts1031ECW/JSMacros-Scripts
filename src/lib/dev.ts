function showArray(Array:any[]){
    for(const Index in Array){
        Chat.log(`Index: ${Index}, Value: ${Array[Index]}`)
    }
}

export {
    showArray
}