

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


export const InvolveHook = ({
}: {

}) => {



  return (<RX.View style={{ flex: 1, backgroundColor: '#434040', alignItems: 'center', justifyContent: 'center' }}>
    <UI.Paper elevation={10} style={{ root: { borderRadius: 18, width: 500, height: 600, } }} >
      <RX.Text style={[_styles.titleStyle, { marginTop: 40 }]}>{"Community."}</RX.Text>
      <RX.Text style={_styles.titleStyle2}>{"Inspirados por las posibilidades ofertas por las nuevas tecnologías, pensamos que la creación de un campo de experiencia sensoriales nuevas puede favorecer el inter-cambio. Así mismo decidimos acompañar aficionados como profesionales de la production artística y cultural en la difusión de sus producciones artísticas y culturales"}</RX.Text>

    </UI.Paper>
  </RX.View >


  );

};

import * as RX from 'reactxp'
