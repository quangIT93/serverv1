// Description: Sort children category by name alphabetically (unicode, vietnamese)

const sortChildrenCategory = (listChildrenCategory) => {
    let newList = listChildrenCategory.sort((a, b) => a.name.localeCompare(b.name));

    // move "Khác" to the end of list
    for (let i = 0; i < newList.length; i++) {
        if (newList[i].name === "Khác") {
            newList.push(newList[i]);
            newList.splice(i, 1);
        }
    }

    return listChildrenCategory;
}

export { sortChildrenCategory };