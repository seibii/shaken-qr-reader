import {QRCode} from "jsqr";

export default class Payload71 {
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

    get carType(): string {
        return this.data[2]
    }

    get use(): string {
      return this.data[3]
    }

    get purpose(): string {
      return this.data[4]
    }

    get shape(): string {
      return this.data[5]
    }

    get capacity1(): string {
      return this.data[6]
    }

    get capacity2(): string {
      return this.data[7]
    }

    get maxCarrying1(): string {
      return this.data[8]
    }

    get maxCarrying2(): string {
      return this.data[9]
    }

    get weight1(): string {
      return this.data[10]
    }

    get weight2(): string {
      return this.data[11]
    }

    get code(): string {
      return this.data[12]
    }

    get mileage(): string {
      return this.data[13]
    }

    get mileageType(): string {
      return this.data[14]
    }
}
