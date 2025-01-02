export class ThemeStyles {
    public static BACKGROUND_LEVEL_1 = '#003d63';
    public static BACKGROUND_LEVEL_2 = '#004f80';
    public static BACKGROUND_LEVEL_3 = '#005e99';
    public static BACKGROUND_LEVEL_4 = '#006eb3';
    public static BACKGROUND_LEVEL_5 = '#006eb3';

    public static TEXT_COLOR_LEVEL_1 = 'rgb(0, 61, 99)';
    public static TEXT_COLOR_LEVEL_2 = 'whitesmoke';
    public static TEXT_COLOR_LEVEL_3 = 'whitesmoke';
    public static TEXT_COLOR_LEVEL_4 = 'whitesmoke';
    public static TEXT_COLOR_LEVEL_5 = 'whitesmoke';

    static getBgForLevel(level: number) {
        if ((level + 1) === 1) {
            return this.BACKGROUND_LEVEL_1;
        }
        if ((level + 1) === 2) {
            return this.BACKGROUND_LEVEL_2;
        }
        if ((level + 1) === 3) {
            return this.BACKGROUND_LEVEL_3;
        }
        if ((level + 1) === 4) {
            return this.BACKGROUND_LEVEL_4;
        }
        if ((level + 1) === 5) {
            return this.BACKGROUND_LEVEL_5;
        }

    }

}