const maxItemAssociation = (purchases: Array<Array<string>>): Array<string> => {
    let associated: Array<Array<string>> = [];

    let getIndexElementInAssociated = (purchase: Array<string>): number => {
        let indexElement: number = -1;
        associated.some((itemAssociated: Array<string>, index: number) => {
            indexElement = itemAssociated.some((item: string) => purchase.includes(item)) ? index : indexElement
        })
        return indexElement
    }

    let sortFilteredAssociated = () => {
        return associated.map((itemAssociated: Array<string>) => {
            return itemAssociated.sort()
                .filter((item: string, index: number) => !itemAssociated.includes(item, index + 1))
        })
    }

    let findMaxAssociated = (filteredAssociated: Array<Array<string>>): Array<string> => {
        return filteredAssociated.sort((a, b) => a.length > b.length ? -1 : 1)[0]
    }

    for (let purchase of purchases) {
        if (!associated) {
            associated.push(purchase)
        } else {
            let indexElement = getIndexElementInAssociated(purchase)
            if (indexElement !== -1) {
                associated[indexElement].push(...purchase)
            } else {
                associated.push(purchase)
            }
        }
    }

    let filteredAssociated = sortFilteredAssociated();

    if (filteredAssociated.length === 1) {
        return filteredAssociated[0];
    }
    return findMaxAssociated(filteredAssociated)
}

console.log(maxItemAssociation([
    ["q", "w", 'a'],
    ["a", "b"],
    ["a", "c"],
    ["q", "e"],
    ["q", "r"],
]));

console.log(maxItemAssociation([["a", "b"], ["a", "c"], ["d", "e"]]));

export { };