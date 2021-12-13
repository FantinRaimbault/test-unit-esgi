
export class Calculatrice {
    add(a, b) {
        return a + b
    }

    sub(a, b) {
        return a - b
    }

    mul(a, b) {
        return a * b
    }

    div(a, b) {
        return a / b
    }

    /**
     *
     * @param {Array} tab
     * @returns
     */
    avg(tab) {
        return tab.reduce((a, b) => a + b) / tab.length
    }
}