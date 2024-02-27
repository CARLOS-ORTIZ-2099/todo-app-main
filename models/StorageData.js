export class StorageData {
    static saveTheme() {

    }

    static setStorageTodos(data) {
        localStorage.setItem('task-oop', JSON.stringify(data))
    }

    static getStorageTodos() {
        return JSON.parse(localStorage.getItem('task-oop'))
    }
}


