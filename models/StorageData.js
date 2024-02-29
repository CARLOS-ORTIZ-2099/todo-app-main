export class StorageData {
    static saveThemeColor(theme) {
        localStorage.setItem('theme', theme)
    }

    static getThemeColor() {
        return localStorage.getItem('theme') || 'light'
    }

    static setStorageTodos(data) {
        localStorage.setItem('task-oop', JSON.stringify(data))
    }

    static getStorageTodos() {
        return JSON.parse(localStorage.getItem('task-oop'))
    }
}


