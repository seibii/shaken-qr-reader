import Certificate from "../../src/data/certificate";

describe("Certificate", () => {
   describe(".encodedStrings", () => {
       it("should return expected", () => {
           const certificate = new Certificate(
               '-  ',
               '0101101',
               '210328',
               '9905',
               'DAA-ZVW50',
               '0062',
               '-   ',
               '-   ',
               '0062',
               '10',
               '-  ',
               '0',
               '0',
               '-',
               '-   ',
               '-    ',
               '01',
               '品川　　７７７あ７７７７',
               '1',
               'DAA-ZVW50-100000',
               '2ZR-FXE',
               '1',
           );

           const expected = [
               "2/-  /0101101/210328/9905/DAA-ZVW50/0062/-   /-   /0062/10/-  /0/0/-/-   /-    /999999/01",
               "2/品川　　７７７あ７７７７/1/DAA-ZVW50-100000/2ZR-FXE/1"
           ];

           expect(certificate.encodedStrings).toEqual(expected);
       });
   });
});
