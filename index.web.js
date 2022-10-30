// setimmediate is added only for 'react-native-rating-bar', as it uses gesture-handler
// and gesture-handler's GestureDetector was causing error related to setimmediate.
import 'setimmediate';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Use prebuilt version of RNVI in dist folder
// import Icon from 'react-native-vector-icons/dist/MaterialIcons';

// Generate required css
import materialiconFont from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import workSansBold from './src/assets/fonts/WorkSans-Bold.ttf';
import workSansMedium from './src/assets/fonts/WorkSans-Medium.ttf';
import workSansRegular from './src/assets/fonts/WorkSans-Regular.ttf';
import workSansSemiBold from './src/assets/fonts/WorkSans-SemiBold.ttf';

const iconFontStyles = `@font-face {
  font-family: MaterialIcons;
  src: url(${materialiconFont});
}
@font-face {
  font-family: WorkSans-Bold;
  src: url(${workSansBold});
}
@font-face {
  font-family: WorkSans-Medium;
  src: url(${workSansMedium});
}
@font-face {
  font-family: WorkSans-Regular;
  src: url(${workSansRegular});
}
@font-face {
  font-family: WorkSans-SemiBold;
  src: url(${workSansSemiBold});
}`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

if (module.hot) {
  module.hot.accept();
}
AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
