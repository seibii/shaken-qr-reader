import KeiCertificate from "../../../../src/data/certificate/keiCertificate";

describe("KeiCertificate", () => {
    describe(".encodedStrings", () => {
        it('should return expected', () => {
            const certificate = new KeiCertificate(
                "-  ",
                "11001100",
                "220415",
                "0212",
                "DBA-JF3",
                "0044",
                "-",
                "-",
                "0042",
                "- ",
                "-  ",
                "-",
                "-",
                "-",
                "-   ",
                "-    ",
                "",
                "品川　　７７７あ　　７７",
                "1",
                "DBA-JF3-000000",
                "S07B",
                "1",
                "東京都港区六本木２丁目２−６ 福吉町ビル 401",
                "整備　太郎",
                "貨物",
                "事業用",
                "021",
                "2",
                "4",
                "350",
                "250",
                "1320",
                "1330",
                "313",
                "1000",
                "km"
            );

            const expected = [
                "K/71/軽自動車/貨物/事業用/021/2/4/350/250/1320/1330/313/1000/km",
                "K/61/東京都港区六本木２丁目２−６ 福吉町ビル 401",
                "K/51/整備　太郎",
                "K/31/-  /11001100/220415/0212/DBA-JF3/0044/-/-/0042/- /-  /-/-/-/-   /-    /999999",
                "K/22/品川　　７７７あ　　７７/1/DBA-JF3-000000/S07B/1"
            ];

            expect(certificate.encodedStrings).toEqual(expected);
        });
    });
});
