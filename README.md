# shaken-qr-reader
[![npm version](https://badge.fury.io/js/shaken-qr-reader.svg)](https://badge.fury.io/js/shaken-qr-reader)
[![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/seibii/shaken-qr-reader.svg)](https://libraries.io/github/seibii/shaken-qr-reader)
![npm bundle size](https://img.shields.io/bundlephobia/min/shaken-qr-reader.svg)
![npm](https://img.shields.io/npm/dt/shaken-qr-reader.svg)
![GitHub](https://img.shields.io/github/license/seibii/shaken-qr-reader.svg)

`shaken-qr-reader` is a library to read/parse Japanese `車検証` QR code 

### Installation

```
npm install shaken-qr-reader --save
```
```
yarn add shaken-qr-reade 
```

### Usage

```typescript
const images = ... // common ImageData type objects. You can get from cameras or uploaded files etc...
const reader = new ShakenQRReader(); // or new ShakenQRReader('kei'); for 軽自動車

images.forEach((image) => {
    try {
        reader.push(image);
    } catch (error) {
        if (error instanceof InvalidQRCode) {
            console.log("The image is not valid shaken QR code.");
        } else if (error instanceof ReadQRCocde) {
            console.log("The image is already read.");
        }
    }
});

console.log(reader.isCompleted); // Whether all the QR codes are read or not
console.log(reader.missingIndex); // Indexs for the QR code which is not read
console.log(reader.result);
```

see example directory for real usage.

### Development 

#### Install dependencies
```
yarn
```

#### Run tests
```
yarn test
```

#### Run lint
```
yarn lint
```

### License

see [LICENSE](./LICENSE)
