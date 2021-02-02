import { QRCode } from 'jsqr'
import QRCodeContainerBase from './qrCodeContainerBase'
import KeiCertificate from '../data/certificate/keiCertificate'
import Certificate from '../data/certificate/certificate'
import { InvalidQRCode, ReadQRCode } from '../types'
import Payload22 from '../data/payload/kei/payload22'
import Payload31 from '../data/payload/kei/payload31'
import Payload51 from '../data/payload/kei/payload51'
import Payload61 from '../data/payload/kei/payload61'
import Payload71 from '../data/payload/kei/payload71'

const qrTypeVersions = ['71', '61', '51', '31', '22']

export default class QRCodeContainerKei implements QRCodeContainerBase {
    qrCodes: QRCode[] = [];

    get missingIndex (): number[] {
      return qrTypeVersions
        .map(index => this.readQRTypeVersions.indexOf(index) === -1 ? qrTypeVersions.indexOf(index) + 1 : null)
        .filter(index => index !== null)
    }

    get isCompleted (): boolean {
      return this.missingIndex.length === 0
    }

    get result (): Certificate | KeiCertificate | null {
      if (this.isCompleted) {
        const payload22 = new Payload22(this.qrCodes.find((qrCode) => qrCode.data.split('/')[1] === '22'))
        const payload31 = new Payload31(this.qrCodes.find((qrCode) => qrCode.data.split('/')[1] === '31'))
        const payload51 = new Payload51(this.qrCodes.find((qrCode) => qrCode.data.split('/')[1] === '51'))
        const payload61 = new Payload61(this.qrCodes.find((qrCode) => qrCode.data.split('/')[1] === '61'))
        const payload71 = new Payload71(this.qrCodes.find((qrCode) => qrCode.data.split('/')[1] === '71'))

        return new KeiCertificate(
          payload31.carIdentifierLocation,
          payload31.carTypeNumberAndCategoryNumber,
          payload31.expiresAt,
          payload31.registeredAt,
          payload31.model,
          payload31.frontFrontAxleWeight,
          payload31.frontRearAxleWeight,
          payload31.rearFrontAxleWeight,
          payload31.rearRearAxleWeight,
          payload31.noiseRegulation,
          payload31.emissionNoiseRegulation,
          payload31.driveSystem,
          payload31.measuredOpacimeter,
          payload31.measuredNoxAndPm,
          payload31.nox,
          payload31.pm,
          '01',
          payload22.number,
          payload22.numberType,
          payload22.identifier,
          payload22.engineModel,
          payload22.sheetType,
          payload61.ownerAddress,
          payload51.ownerName,
          payload71.use,
          payload71.purpose,
          payload71.shape,
          payload71.capacity1,
          payload71.capacity2,
          payload71.maxCarrying1,
          payload71.maxCarrying2,
          payload71.weight1,
          payload71.weight2,
          payload71.code,
          payload71.mileage,
          payload71.mileageType
        )
      }

      return null
    }

    private get readQRTypeVersions (): string[] {
      return this.qrCodes.map(qrCode => qrCode.data.split('/')[1])
    }

    push = (qrCode: QRCode) => {
      this.validate(qrCode)

      this.qrCodes.push(qrCode)
    }

    private validate = (qrCode: QRCode) => {
      if (qrCode.data.split('/')[0] !== 'K') {
        throw new InvalidQRCode('This is not a Kei QR code')
      } else if (!qrTypeVersions.includes(qrCode.data.split('/')[1])) {
        throw new InvalidQRCode('Cannot read this version of Kei QR code')
      } else if (this.readQRTypeVersions.includes(qrCode.data.split('/')[1])) {
        throw new ReadQRCode('This QR code is already read')
      }
    }
}
