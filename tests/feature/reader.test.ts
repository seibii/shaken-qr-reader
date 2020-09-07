import { PNG } from 'pngjs';
import * as fs from "fs";
import ShakenQRReader from "../../src";

describe('ShakenQRReader', () => {
    const readPNGImage = (fileName: string): ImageData => {
        return PNG.sync.read(fs.readFileSync(fileName));
    }

    describe('when input is normal certificate', () => {
        const qrCodes = [
            "tests/resources/normal/first1.png",
            "tests/resources/normal/first2.png",
            "tests/resources/normal/first3.png",
            "tests/resources/normal/second1.png",
            "tests/resources/normal/second2.png"
        ].map(readPNGImage);

        it('should return missing index', () => {
            const reader = new ShakenQRReader();

            reader.push(qrCodes[0]);
            expect(reader.missingIndex).toEqual([2, 3, 4, 5]);
        });

        it('should read all of the code', () => {
            const reader = new ShakenQRReader();
            qrCodes.forEach(reader.push);

            expect(reader.isCompleted).toBeTruthy();
        });

        it('should return encoded strings', () => {
            const reader = new ShakenQRReader();
            qrCodes.forEach(reader.push);

            expect(reader.result.encodedStrings).toEqual([
                "2/-  /0101101/210328/9905/DAA-ZVW50/0062/-   /-   /0062/10/-  /0/0/-/-   /-    /999999/01",
                "2/品川　　７７７あ７７７７/1/DAA-ZVW50-100000/2ZR-FXE/1"
            ]);
        });
    });

    describe('when input is kei certificate', () => {
        const qrCodes = [
            "tests/resources/kei/1.png",
            "tests/resources/kei/2.png",
            "tests/resources/kei/3.png",
            "tests/resources/kei/4.png",
            "tests/resources/kei/5.png"
        ].map(readPNGImage);

        it('should return missing index', () => {
            const reader = new ShakenQRReader('kei');

            reader.push(qrCodes[0]);
            expect(reader.missingIndex).toEqual([2, 3, 4, 5]);
        });

        it('should be completed', () => {
            const reader = new ShakenQRReader('kei');
            qrCodes.forEach(reader.push);

            expect(reader.isCompleted).toBeTruthy();
        });

        it('should return encoded strings', () => {
            const reader = new ShakenQRReader('kei');
            qrCodes.forEach(reader.push);

            expect(reader.result.encodedStrings).toEqual([
                "K/71/軽自動車/貨物/事業用/021/2/4/350/250/1320/1330/313/1000/km",
                "K/61/東京都港区六本木２丁目２−６ 福吉町ビル 401",
                "K/51/整備　太郎",
                "K/31/-  /11001100/220415/0212/DBA-JF3/0044/-/-/0042/- /-  /-/-/-/-   /-    /999999",
                "K/22/品川　　７７７あ　　７７/1/DBA-JF3-000000/S07B/1"
            ]);
        });
    });

    describe('when input is old kei certificate', () => {
        const qrCodes = [
            "tests/resources/kei_old/1.png",
            "tests/resources/kei_old/2.png"
        ].map(readPNGImage);

        it('should return missing index', () => {
            const reader = new ShakenQRReader('kei_old');

            reader.push(qrCodes[0]);
            expect(reader.missingIndex).toEqual([2]);
        });

        it('should be completed', () => {
            const reader = new ShakenQRReader('kei_old');
            qrCodes.forEach(reader.push);

            expect(reader.isCompleted).toBeTruthy();
        });

        it('should return encoded strings', () => {
            const reader = new ShakenQRReader('kei_old');
            qrCodes.forEach(reader.push);

            expect(reader.result.encodedStrings).toEqual([
                "K/31/-  /11001100/220415/0212/DBA-JF3/0044/-/-/0042/- /-  /-/-/-/-   /-    /999999",
                "K/22/品川　　７７７あ　　７７/1/DBA-JF3-000000/S07B/1"
            ]);
        });
    });
});
