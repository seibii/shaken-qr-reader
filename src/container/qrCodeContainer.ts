import { QRCode } from 'jsqr'
import QRCodeContainerBase from './qrCodeContainerBase'
import Certificate from '../data/certificate'
import KeiCertificate from '../data/keiCertificate'
import { InvalidQRCode, ReadQRCode } from '../types'

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
        const firstCodes = this.firstQRCodes
          .sort((a, b) => a.structuredAppend.M - b.structuredAppend.M)
          .map(qrCode => qrCode.data)
          .join('')
          .trim()
          .split('/')
          .filter((_, i) => i > 0)

        const secondCodes = this.secondQRCodes
          .sort((a, b) => a.structuredAppend.M - b.structuredAppend.M)
          .map(qrCode => qrCode.data)
          .join('')
          .trim()
          .split('/')
          .filter((_, i) => i > 0)
        const data = firstCodes.concat(secondCodes)

        return new Certificate(
          data[0],
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          data[6],
          data[7],
          data[8],
          data[9],
          data[10],
          data[11],
          data[12],
          data[13],
          data[14],
          data[15],
          data[17],
          data[18],
          data[19],
          data[20],
          data[21],
          data[22]
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
