export class SnackMessenger {
    #messageCallback;
    #messageHandlers = [];
    #commands = {};

    constructor() {
        this.#messageCallback = this.#onMessage.bind(this);

        window.addEventListener('message', this.#messageCallback);
    }

    addMessageListener(command, listener) {
        this.#messageHandlers.push({ command: command, listener: listener});
    }

    async #onMessage(messageEvent) {
        if (this.#messageHandlers.length === 0) {
            return;
        }

        const handlers = this.#messageHandlers.filter(mh => mh.command == messageEvent.data.command);
        for(const handler of handlers) {
            const data = await handler.listener(messageEvent.data.args);
            messageEvent.source?.postMessage({id: messageEvent.data.id, args: data, success: true}, "*");
        }
    }

    sendCommand(command, args) {
        const commandId = this.#uuidv4();

        const promise = new Promise((resolve) => {
            window.parent.postMessage({ id: commandId, command: command, args: args}, "*");
            const receiveCommand = (event) => {
                const messageEvent = event;

                if(messageEvent.data.id == commandId) {
                    resolve(messageEvent.data.args);
                    window.removeEventListener('message', receiveCommand);
                }
            }
            window.addEventListener('message', receiveCommand);
        });

        this.#commands[commandId] = promise;
        return promise;
    }

    #uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => {
                const i = parseInt(c);
                return (i ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> i / 4).toString(16);
            }
        );
    }
}

export function addCss(fileName) {
    document.getElementById('irep-css').setAttribute('href', fileName);
}