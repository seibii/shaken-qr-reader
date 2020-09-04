import {QRCode} from "jsqr";

export default class Payload21 {
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

    get carIdentifierLocation(): string {
        return this.data[1]
    }

    get carTypeNumberAndCategoryNumber(): string {
        return this.data[2]
    }

    get expiresAt(): string {
        return this.data[3]
    }

    get registeredAt(): string {
        return this.data[4]
    }

    get model(): string {
        return this.data[5]
    }

    get frontFrontAxleWeight(): string {
        return this.data[6]
    }

    get frontRearAxleWeight(): string {
        return this.data[7]
    }

    get rearFrontAxleWeight(): string {
        return this.data[8]
    }

    get rearRearAxleWeight(): string {
        return this.data[9]
    }

    get noiseRegulation(): string {
        return this.data[10]
    }

    get emissionNoiseRegulation(): string {
        return this.data[11]
    }

    get driveSystem(): string {
        return this.data[12]
    }

    get measuredOpacimeter(): string {
        return this.data[13]
    }

    get measuredNoxAndPm(): string {
        return this.data[14]
    }

    get nox(): string {
        return this.data[15]
    }

    get pm(): string {
        return this.data[16]
    }

    get none(): string {
        return this.data[17]
    }

    get fuelType(): string {
        return this.data[18]
    }
}
