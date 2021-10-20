

import { Fonts, FontSizes, } from '../app/Styles';


const _styles = {
  slider: RX.Styles.createViewStyle({
    alignSelf: 'center',
    overflow: 'hidden' // for custom animations
  }),
  titleStyle: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    alignSelf: 'center'
  }),
  titleStyle2: RX.Styles.createTextStyle({
    font: Fonts.displayRegular,
    fontSize: 16,
    width: 400,
    textAlign: 'center',
    color: 'black',
    alignSelf: 'center'
  }),
  label: RX.Styles.createTextStyle({
    font: Fonts.displayRegular,
    fontSize: FontSizes.size14,
    color: 'white',
  })
}
import * as UI from '@sproutch/ui';


export const DocsHook = ({
}: {

}) => {



  return (<RX.View style={{ flex: 1, backgroundColor: '#434040', alignItems: 'center', justifyContent: 'center' }}>
    <UI.Paper elevation={10} style={{ root: { borderRadius: 18, width: 500, height: 600, } }} >
      <RX.Text style={[_styles.titleStyle, { marginTop: 40 }]}>{"My Own NFT Protocol"}</RX.Text>
      <RX.Text style={_styles.titleStyle2}>{"En Construccion "}</RX.Text>

    </UI.Paper>
  </RX.View >


  );

};

import * as RX from 'reactxp'
