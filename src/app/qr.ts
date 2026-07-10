import qrFactory from 'qrcode-generator';

export function createQrSvg(value: string, size = 23): string {
    const qr = qrFactory(0, 'M');
    qr.addData(value);
    qr.make();

    const moduleCount = qr.getModuleCount();
    const rects: string[] = [];
    for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
            if (qr.isDark(row, col)) {
                rects.push(`<rect x="${col}" y="${row}" width="1" height="1"/>`);
            }
        }
    }

    return [
        `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${moduleCount} ${moduleCount}" shape-rendering="crispEdges">`,
        '<rect width="100%" height="100%" fill="#fff"/>',
        '<g fill="#000">',
        rects.join(''),
        '</g>',
        '</svg>'
    ].join('');
}
