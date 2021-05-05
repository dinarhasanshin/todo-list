export const updateObjectInArray = (prevObject, newObj, ObjPropName, PropName) => {
    return prevObject.map((item) => {
        if (item[ObjPropName] === newObj[ObjPropName]) {
            return {...item, ...newObj}
        }
        return item
    })
}