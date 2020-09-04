import {QRCode} from "jsqr";

export default class Payload31 {
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

    get carIdentifierLocation(): string {
      return this.data[2]
    }

    get carTypeNumberAndCategoryNumber(): string {
      return this.data[3]
    }

    get expiresAt(): string {
      return this.data[4]
    }

    get registeredAt(): string {
      return this.data[5]
    }

    get model(): string {
      return this.data[6]
    }

    get frontFrontAxleWeight(): string {
      return this.data[7]
    }

    get frontRearAxleWeight(): string {
      return this.data[8]
    }

    get rearFrontAxleWeight(): string {
      return this.data[9]
    }

    get rearRearAxleWeight (): string {
      return this.data[10]
    }

    get noiseRegulation (): string {
      return this.data[11]
    }

    get emissionNoiseRegulation (): string {
      return this.data[12]
    }

    get driveSystem (): string {
      return this.data[13]
    }

    get measuredOpacimeter (): string {
      return this.data[14]
    }

    get measuredNoxAndPm (): string {
      return this.data[15]
    }

    get nox (): string {
      return this.data[16]
    }

    get pm (): string {
      return this.data[17]
    }
}
