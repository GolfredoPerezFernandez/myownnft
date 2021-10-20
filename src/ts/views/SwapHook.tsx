

import {  Fonts, } from '../app/Styles';

const _styles = {  
  slider: RX.Styles.createViewStyle({
    overflow: 'hidden' // for custom animations
  }),
  sliderContentContainer: RX.Styles.createViewStyle({
    alignSelf:'center'
      }),
      titleStyle55: RX.Styles.createTextStyle({
        font:Fonts.displayBold,
        fontSize:18,
        textAlign:'center',
        color:'white',
        alignSelf:'center'
      }),
      titleStyle0: RX.Styles.createTextStyle({
        font:Fonts.displayBold,
        fontSize:16,
        textAlign:'center',
        color:'black',
        alignSelf:'center'
      }),
  titleStyle: RX.Styles.createTextStyle({
    font:Fonts.displayBold,
    fontSize:24,
    textAlign:'center',
    color:'black',
    alignSelf:'center'
  }),
  titleStyle2s: RX.Styles.createTextStyle({
    font:Fonts.displayBold,
    fontSize:32,
    textAlign:'left',
    color:'white',
    alignSelf:'flex-start'
  }),
  titleStyle2s2: RX.Styles.createTextStyle({
    font:Fonts.displayBold,
    fontSize:32,
    textAlign:'left',
    color:'#FF296D',
    alignSelf:'flex-start'
  }),
  titleStyle2: RX.Styles.createTextStyle({
    font:Fonts.displayBold,
    fontSize:40,
    textAlign:'center',
    color:'black',
    alignSelf:'center'
  }),
  titleStyle22: RX.Styles.createTextStyle({
    font:Fonts.displayBold,
    fontSize:32,
    textAlign:'center',
    color:'white',
    alignSelf:'center'
  }),
  titleStyle3: RX.Styles.createTextStyle({
    font:Fonts.displayRegular,
    fontSize:14,
    textAlign:'left',
    color:'gray',
    alignSelf:'center'
  }),
  titleStyle4: RX.Styles.createTextStyle({
    font:Fonts.displayBold,
    fontSize:15,
    textAlign:'center',
    color:'black',
    alignSelf:'center'
  }),
  titleStyle33: RX.Styles.createTextStyle({
    font:Fonts.displayBold,
    fontSize:40,
    textAlign:'left',
    color:'black',
    alignSelf:'flex-start'
  }),
  titleStyle33s: RX.Styles.createTextStyle({
    font:Fonts.displayBold,
    fontSize:32,
    textAlign:'left',
    color:'#FF296D',
    alignSelf:'flex-start'
  }),
  buttomStyle: RX.Styles.createTextStyle({
    font:Fonts.displayBold,
    fontSize:15,
    color:'white',
    textAlign:'center',
    alignSelf:'center'
  }),
  contentStyle: RX.Styles.createTextStyle({
    font:Fonts.displayRegular,
    fontSize:16,
    color:'white',
    textAlign:'center',
    alignSelf:'center'
  }),
  contentStyle2: RX.Styles.createTextStyle({
    font:Fonts.displayBold,
    fontSize:18,
    color:'white',
    textAlign:'center',
    alignSelf:'center'
  }),
  contentStyle3: RX.Styles.createTextStyle({
    font:Fonts.displayBold,
    fontSize:18,
    color:'white',
    textAlign:'center',
    alignSelf:'center'
  })
}




  
export const SwapHook = ({
}: {
}) => {  

  return ( <RX.View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                 
                  <RX.Text style={_styles.titleStyle3}>{"Swap Created By Golfredo" }</RX.Text>
                  
      
         </RX.View>

	);
};

import * as RX from 'reactxp'

