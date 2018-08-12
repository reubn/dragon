import React from 'react'

import {enabled, disabled} from './style'

export default ({signal, ...props}) => {

  let pattern = [0, 0, 0, 0]
  if(signal >= -80) pattern = [1, 0, 0, 0]
  if(signal >= -70) pattern = [1, 1, 0, 0]
  if(signal >= -60) pattern = [1, 1, 1, 0]
  if(signal >= -50) pattern = [1, 1, 1, 1]

  const [first, second, third, fourth] = pattern.map(s => s ? enabled : disabled)

  return (
    <svg viewBox="0 0 42 32" {...props}>
      <path
        d="M0,9.60869408 C0.0562886167,9.39451113 0.101465423,9.17662423 0.171419322,8.96698702 C0.285175081,8.62594422 0.477892039,8.32861911 0.735035052,8.07784574 C1.97812678,6.86564821 3.32484456,5.78129263 4.76747186,4.81518242 C7.01354481,3.31104732 9.42674387,2.15379153 12.0025514,1.33771882 C13.1828726,0.963761499 14.3809559,0.653276183 15.6057524,0.46417898 C16.4524387,0.333446844 17.3026045,0.220308408 18.1543135,0.127906407 C19.4619716,-0.0140217208 20.7754943,-0.0318679622 22.0876139,0.0449606682 C22.9767552,0.0970122056 23.8670469,0.163879491 24.7502395,0.275923582 C26.4052258,0.485897519 28.026063,0.862324136 29.6162304,1.36967931 C31.1811718,1.86898123 32.6902174,2.50168099 34.145107,3.26295226 C35.7978205,4.12773735 37.3551576,5.14110081 38.7988512,6.32187099 C39.4526241,6.85658479 40.0805256,7.42412894 40.7030957,7.99540509 C41.2736422,8.51892289 41.5462183,9.18880233 41.5171761,9.96020331 C41.4691091,11.235929 40.517534,12.2640801 39.2492443,12.4042124 C38.4731573,12.4899641 37.7781079,12.267307 37.2071685,11.7212569 C35.61745,10.2009031 33.8697249,8.89860449 31.9286936,7.85793852 C29.9836217,6.81508386 27.9310514,6.0725287 25.7715439,5.62014331 C24.8490953,5.42692127 23.918425,5.28939859 22.9807397,5.20597583 C21.7641929,5.09771985 20.5440824,5.07970525 19.3250101,5.14977139 C18.0911782,5.22070739 16.8682617,5.38199701 15.6577759,5.63958898 C13.5841324,6.08086256 11.6096815,6.79297248 9.7350405,7.78136243 C8.34109752,8.5163133 7.0301564,9.37865716 5.82222401,10.3913191 C5.2535294,10.8680607 4.71603765,11.3819539 4.15042965,11.8625397 C3.23985044,12.6362697 1.75095199,12.5909245 0.871772056,11.7851499 C0.399435922,11.3522101 0.106039224,10.8306565 0.0267132418,10.1920641 C0.0233740866,10.1652667 0.00914760172,10.1398442 0,10.1137764 C0,9.94541562 0,9.77705485 0,9.60869408"
        className={fourth}
      />

      <path
        d="M20.7741446,8.48745907 C23.4981657,8.51352693 26.1122191,9.04535054 28.6203737,10.1034699 C30.3696982,10.8415074 31.9887114,11.8003781 33.4609141,12.9971987 C34.0579495,13.4825266 34.6395517,13.993726 35.1785587,14.5419368 C35.8907809,15.266337 36.098482,16.155787 35.7760711,17.1238894 C35.4563259,18.0840509 34.768937,18.6652323 33.7692669,18.8369603 C32.9175017,18.9832938 32.1671739,18.7385253 31.5528815,18.1313603 C30.2774645,16.8706468 28.8436481,15.8362663 27.2230635,15.0659877 C26.0459131,14.5064688 24.8160096,14.1079869 23.5334092,13.8687182 C22.4223404,13.661438 21.3020117,13.5798392 20.1751731,13.624118 C18.4002297,13.6938475 16.6864013,14.0600041 15.041236,14.7381332 C13.3520162,15.4344453 11.8384249,16.405017 10.4915668,17.6375301 C10.2606881,17.8487948 10.0448776,18.0776251 9.80482323,18.2775816 C8.30963931,19.5230584 6.06031139,18.7392549 5.66842365,16.833888 C5.48718328,15.9526878 5.71598556,15.1731493 6.34719814,14.5336871 C7.80997261,13.0517756 9.4703465,11.8337977 11.3104736,10.8586241 C12.8947203,10.019065 14.5607343,9.4015458 16.3081227,9.00494395 C17.1670993,8.80995412 18.0346623,8.66092678 18.9145999,8.59955928 C19.5340553,8.55637475 20.1542683,8.52441426 20.7741446,8.48745907"
        className={third}
      />
      <path
        d="M20.4589816,17.012039 C22.7809011,17.0160235 24.6865486,17.4881913 26.4727441,18.4349681 C27.6624935,19.0656194 28.7116898,19.8814677 29.6214833,20.8738141 C30.6141664,21.9565702 30.5272642,23.5687929 29.4293556,24.5512903 C28.4362515,25.4400106 26.8511349,25.3884081 25.9343544,24.4137395 C24.90654,23.3210501 23.6707158,22.6042541 22.2093724,22.2772975 C21.390634,22.0940929 20.5654979,22.0683898 19.7347778,22.1996271 C18.4746255,22.3987417 17.3459349,22.8940591 16.3566751,23.6978134 C16.1073328,23.9004075 15.8767908,24.1284241 15.6528429,24.3594712 C15.257588,24.767241 14.7905832,25.0424828 14.2310643,25.136821 C13.3233753,25.289889 12.5404416,25.0317919 11.906423,24.3635961 C11.3649467,23.7929653 11.149024,23.1015638 11.229304,22.3236248 C11.2849192,21.7845897 11.5036479,21.3090547 11.8701412,20.9090295 C13.5985329,19.0225752 15.7255467,17.8273821 18.2175386,17.2786102 C19.0527483,17.094676 19.9010621,17.0016848 20.4589816,17.012039"
        className={second}
      />
      <path
        d="M20.7536635,31.9999972 C19.0664922,31.9976962 17.6772633,30.6033043 17.6785541,28.9134673 C17.6798448,27.2284566 19.0811396,25.8275827 20.7623621,25.8305291 C22.4473448,25.8334754 23.853073,27.2442825 23.8476574,28.9269642 C23.8422137,30.6108244 22.4412557,32.0022981 20.7536635,31.9999972"
        className={first}
      />
    </svg>
  )
}
