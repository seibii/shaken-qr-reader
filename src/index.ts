import jsQR from "jsqr";
import Certificate from "./data/certificate/certificate"
import KeiCertificate from "./data/certificate/keiCertificate"
import {CarType} from "./types";
import QRCodeContainerBase from "./container/qrCodeContainerBase";
import QRCodeContainer from "./container/qrCodeContainer";
import QRCodeContainerKei from "./container/qrCodeContainerKei";
import QRCodeContainerKeiOld from "./container/qrCodeContainerKeiOld";

export default class ShakenQRReader {
    private qrCodeContainer: QRCodeContainerBase

    get missingIndex(): number[] {
        return this.qrCodeContainer.missingIndex;
    }

    get isCompleted(): boolean {
        return this.qrCodeContainer.isCompleted;
    }

    get result(): Certificate | KeiCertificate | null {
        return this.qrCodeContainer.result;
    }

    constructor(private carType: CarType = 'normal') {
        if (carType === 'kei_old') {
            this.qrCodeContainer = new QRCodeContainerKeiOld();
        } else if (carType === 'kei') {
            this.qrCodeContainer = new QRCodeContainerKei();
        } else {
            this.qrCodeContainer = new QRCodeContainer();
        }
    }

    push = (image: ImageData) => {
        const qrCode = jsQR(image.data, image.width, image.height, { inversionAttempts: "dontInvert" });
        if (qrCode) {
            this.qrCodeContainer.push(qrCode);
        }
    }
}
