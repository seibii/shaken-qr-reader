import { QRCode } from 'jsqr'
import QRCodeContainerBase from './qrCodeContainerBase'
import KeiCertificate from '../data/keiCertificate'
import Certificate from '../data/certificate'
import { InvalidQRCode, ReadQRCode } from '../types'

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
        return new KeiCertificate(this.qrCodes.map(qrCode => qrCode.data.trim().split('/')))
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
