import { TextStyle } from "../attributes";


export function rgbToHex(rgb: [number, number, number, number]): string {
    return '#' + rgb.map(c => c.toString(16).padStart(2, '0')).join('');
}

function addTextStyles<T extends TextStyle>(t: T, objExp: Record<string, string>) {
    Object.defineProperty(objExp, 'font-size.px', {value: t?.fontsize ?? 12});
    // TODO:
        // add oterh ttext ppropterties
    
}


export const defaultSizes = {
    'dial': [60, 60],
    'number': [60, 30],
    'slider': [100, 20],
    'umenu': [100, 20],
    'toggle': [60, 30],
    'kslider': [400, 100],
    'function': [200, 100],
    'multislider': [200, 100],
    'pictslider': [200, 200],
    'nodes': [200, 200],
    'matrixctrl': [400, 200]
}