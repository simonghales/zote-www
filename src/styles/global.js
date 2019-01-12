import { injectGlobal } from 'emotion';
import reset from './reset';
import colors from './config/colors';
import fontFamilies from './config/fontFamilies';
import fontSizes from './config/fontSizes';

export const ROOT_FONT_SIZE = fontSizes.body;

export default injectGlobal`
    ${reset};
    
    * {
        box-sizing: border-box;
    }
    
    html {
        font-size: ${ROOT_FONT_SIZE}px;
    }
    
    body {
        ${fontFamilies.body};
        background-color: ${colors.siteBackground};
        color: ${colors.darkText};
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
