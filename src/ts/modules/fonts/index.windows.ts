/**
* index.windows.ts
* Copyright: Microsoft 2018
*
* Windows implementation of "fonts" module.
*/

import { FontBase } from './Fonts';

class Fonts implements FontBase {
    monospace = 'Poppins';
    displayLight = 'Poppins Light';
    displayRegular = 'Poppins';
    displaySemibold = 'Poppins SemiBold';
    displayBold = 'Poppins Bold';
}

export default new Fonts();
