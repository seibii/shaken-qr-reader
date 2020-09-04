import { QRCode } from 'jsqr'
import KeiCertificate from '../data/certificate/keiCertificate'
import Certificate from '../data/certificate/certificate'

export default interface QRCodeContainerBase {
    readonly missingIndex: number[]
    readonly isCompleted: boolean
    readonly result: Certificate | KeiCertificate | null

    push(qrCode: QRCode)
}
