import { injectGlobal } from 'emotion';
import reset from './reset';
import colors from './config/colors';
import fontFamilies from './config/fontFamilies';
import fontSizes from './config/fontSizes';

export default injectGlobal`
    ${reset};
    
    * {
        box-sizing: border-box;
    }
    
    body {
        ${fontFamilies.body};
        background-color: ${colors.siteBackground};
        color: ${colors.darkText};
        font-size: ${fontSizes.body};
        line-height: 1.35;
    }
    
    img {
        max-width: 100%;
        max-height: 100%;
    }
    
    strong {
        font-weight: 900;
    }
    
`;
