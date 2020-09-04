import {QRCode} from "jsqr";

export default class Payload22 {
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

    get number(): string {
      return this.data[2]
    }

    get numberType(): string {
      return this.data[3]
    }

    get identifier(): string {
      return this.data[4]
    }

    get engineModel(): string {
      return this.data[5]
    }

    get sheetType(): string {
      return this.data[6]
    }
}
