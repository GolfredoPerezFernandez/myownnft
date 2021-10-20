/**
* index.web.ts
* Copyright: Microsoft 2018
*
* Web implementation of "fonts" module.
*/

import { FontBase } from './Fonts';

class Fonts implements FontBase {
    monospace = 'monospace';

    displayLight = '"SF Light", "Poppins System Light", "Poppins Light", sans-serif';
    displayRegular = '"SF Regular", "Poppins System Regular", "Poppins Regular", sans-serif';
    displaySemibold = '"SF Semibold", "Poppins System Semibold", "Poppins Semibold", sans-serif';
    displayBold = '"SF Bold", "Poppins System Bold", "Poppins Bold", sans-serif';
}

export default new Fonts();
