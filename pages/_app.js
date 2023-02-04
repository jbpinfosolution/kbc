import "../styles/globals.css";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { setupIonicReact } from "@ionic/react";
import { AdMob } from "@capacitor-community/admob";

setupIonicReact();

export default function App({ Component, pageProps }) {
  AdMob.initialize({
    requestTrackingAuthorization: true,
    // testingDevices: ['68a97684-74c1-47c1-8551-10ca1ad1abe1'],
    // initializeForTesting: true,
  });
  return <Component {...pageProps} />;
}
