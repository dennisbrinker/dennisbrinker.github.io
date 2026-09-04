export function autoResolve(object) {
    return new Promise((resolve) => {
        resolve(object);
    });
}

export class SnackMessenger {
    #messageHandlers = [];
    #commandObjects = [];

    constructor() {

    }

    addMessageListener(command, listener) {
        this.#messageHandlers.push({ command: command, listener: listener});
    }

    async sendMessage(command, data) {
        const handlers = this.#messageHandlers.filter(mh => mh.command == command);
        for(const handler of handlers) {
            await handler.listener(data);
        }
    }

    onCommand(command, data) {
        this.#commandObjects.push({command: command, data: data})
    }

    sendCommand(command, args) {
        //const data = this.#commandObjects.find(o => o.command === command).data;
        const data = this.#commandObjects.find(o => o.command === command)?.data;

        return autoResolve(data);
    }
}

export function addCss(fileName) {
    document.getElementById('irep-css').setAttribute('href', fileName);
}