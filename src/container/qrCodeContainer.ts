import { QRCode } from 'jsqr'
import QRCodeContainerBase from './qrCodeContainerBase'
import Certificate from '../data/certificate/certificate'
import KeiCertificate from '../data/certificate/keiCertificate'
import { InvalidQRCode, ReadQRCode } from '../types'
import Payload21 from "../data/payload/normal/payload21";
import Payload22 from "../data/payload/normal/payload22";

const firstQRIndexes = [1, 2, 3]
const secondQRIndexes = [4, 5]

export default class QRCodeContainer implements QRCodeContainerBase {
    firstQRCodes: QRCode[] = []
    secondQRCodes: QRCode[] = []

    get missingIndex (): number[] {
      return firstQRIndexes.concat(secondQRIndexes).filter(index => this.readIndex.indexOf(index) === -1)
    }

    get isCompleted (): boolean {
      return this.missingIndex.length === 0
    }

    get result (): Certificate | KeiCertificate | null {
      if (this.isCompleted) {
        const firstQRCode = new Payload21(this.firstQRCodes)
        const secondQRCode = new Payload22(this.secondQRCodes)

        return new Certificate(
          firstQRCode.carIdentifierLocation,
          firstQRCode.carTypeNumberAndCategoryNumber,
          firstQRCode.expiresAt,
          firstQRCode.registeredAt,
          firstQRCode.model,
          firstQRCode.frontFrontAxleWeight,
          firstQRCode.frontRearAxleWeight,
          firstQRCode.rearFrontAxleWeight,
          firstQRCode.rearRearAxleWeight,
          firstQRCode.noiseRegulation,
          firstQRCode.emissionNoiseRegulation,
          firstQRCode.driveSystem,
          firstQRCode.measuredOpacimeter,
          firstQRCode.measuredNoxAndPm,
          firstQRCode.nox,
          firstQRCode.pm,
          firstQRCode.fuelType,
          secondQRCode.number,
          secondQRCode.numberType,
          secondQRCode.identifier,
          secondQRCode.engineModel,
          secondQRCode.sheetType
        )
      }

      return null
    }

    private get readIndex (): number[] {
      return this.firstQRCodes.map(qrCode => qrCode.structuredAppend.M)
        .concat(this.secondQRCodes.map(qrCode => qrCode.structuredAppend.M).map(index => index + 3))
    }

    push = (qrCode: QRCode) => {
      this.validate(qrCode)

      if (qrCode.structuredAppend.N === 3) {
        this.firstQRCodes.push(qrCode)
      } else if (qrCode.structuredAppend.N === 2) {
        this.secondQRCodes.push(qrCode)
      }
    }

    private validate = (qrCode: QRCode) => {
      if (!qrCode.structuredAppend) {
        throw new InvalidQRCode('This is not structured append QR code')
      } else if (!this.equalParity(qrCode)) {
        throw new InvalidQRCode('This is not the part of read QR codes')
      } else if (this.isRead(qrCode)) {
        throw new ReadQRCode('This QR code is already read')
      } else if (qrCode.structuredAppend.M === 0 && qrCode.data.split('/')[0] !== '2') {
        throw new InvalidQRCode('Cannot read this version of QR code')
      }
    }

    private isRead (qrCode: QRCode): boolean {
      const readFirst = qrCode.structuredAppend.N === 3 && this.readIndex.includes(qrCode.structuredAppend.M)
      const readSecond = qrCode.structuredAppend.N === 2 && this.readIndex.includes(qrCode.structuredAppend.M + 3)
      return readFirst || readSecond
    }

    private equalParity (qrCode: QRCode): boolean {
      if (qrCode.structuredAppend.N === 3) {
        const parity = this.firstQRCodes[0]?.structuredAppend.parity
        return !parity || parity === qrCode.structuredAppend.parity
      } else if (qrCode.structuredAppend.N === 2) {
        const parity = this.secondQRCodes[0]?.structuredAppend.parity
        return !parity || parity === qrCode.structuredAppend.parity
      }

      return false
    }
}
