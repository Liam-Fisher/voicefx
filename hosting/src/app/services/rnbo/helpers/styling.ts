export const defaultDesktopSizes = {
    'dial': [60,60],
    'number': [80,30],
    'slider': [120,20],
    'umenu': [150,40],
    'toggle': [40,20],
    'function': [200, 100],
    'kslider': [300, 100],
    'textbutton': [100, 30],
}
export const defaultHandsetSizes = {
    'dial': [60,60],
    'number': [80,30],
    'slider': [120,20],
    'umenu': [150,40],
    'toggle': [40,20],
    'function': [200, 100],
    'kslider': [240, 80],
    'textbutton': [100, 30],
}
export function _getDefaultSize(elementType: string) {

    return defaultDesktopSizes[elementType as keyof typeof defaultDesktopSizes].map((v: number) => (window.innerWidth < 400) ? v*0.8 : v);
}