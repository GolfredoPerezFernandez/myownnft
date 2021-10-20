

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


export const RoadHook = ({
}: {

}) => {



  return (<RX.View style={{ flex: 1, backgroundColor: '#434040', alignItems: 'center', justifyContent: 'center' }}>
    <UI.Paper elevation={10} style={{ root: { borderRadius: 18, width: 500, height: 600, } }} >
      <RX.Text style={[_styles.titleStyle, { marginTop: 40 }]}>{"Road Map Csb."}</RX.Text>
      <RX.Text style={_styles.titleStyle2}>{"2018. Consulta de los amateurs y profesionales franceses y extranjeros (realizadores, fotógrafos, profesores...)   "}</RX.Text>

      <RX.Text style={_styles.titleStyle2}>{"2019. Formulación de una propuesta de trabajo inter-disciplinaria, tomando en cuenta la importancia de lo local en el marco de la globalización.   2020. Constitución del equipo de trabajo inicial y determinación del eco-sistema de implementación de la solución digital "}</RX.Text>
      <RX.Text style={_styles.titleStyle2}>{"2020. Constitución del equipo de trabajo inicial y determinación del eco-sistema de implementación de la solución digital "}</RX.Text>

    </UI.Paper>
  </RX.View >


  );

};

import * as RX from 'reactxp'
