import {QRCode} from "jsqr";

export default class Payload22 {
    data: string[]

    constructor (qrCodes: QRCode[]) {
        this.data = qrCodes
            .sort((a, b) => a.structuredAppend.M - b.structuredAppend.M)
            .map(qrCode => qrCode.data)
            .join('')
            .trim()
            .split('/')
    }

    get version(): string {
        return this.data[0]
    }

    get number(): string {
        return this.data[1]
    }

    get numberType(): string {
        return this.data[2]
    }

    get identifier(): string {
        return this.data[3]
    }

    get engineModel(): string {
        return this.data[4]
    }

    get sheetType(): string {
        return this.data[5]
    }
}
