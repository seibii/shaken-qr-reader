import {QRCode} from "jsqr";

export default class Payload51 {
    data: string[]

    constructor (qrCode: QRCode) {
        this.data = qrCode.data.trim().split('/')
    }

    get type(): string {
        return this.data[0]
    }

    get version(): string {
        return this.data[1]
    }

    get ownerName(): string {
        return this.data[2]
    }
}
