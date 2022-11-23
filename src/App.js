import './App.css';
import React, { useRef, useEffect, useState } from "react";
import ReactHlsPlayer from '@gumlet/react-hls-player';

function App() {
  const playerRef = useRef(null);
  const [gumletLoaded, setGumletLoaded] = useState(false);

   // Create the Gumlet Configuration JSON
   const gumletConfig = {
    property_id: 'BNVzRZKD', // required:  please replace with correct property id.
  };

  function _loadGumletScript() {
    return new Promise(async function (resolve, reject) {
      if (document.querySelector("script#gumlet-insights-sdk")) {
        resolve();
      } else {
        const script = document.createElement("script");
        script.src = "https://cdn.gumlytics.com/insights/1.1.2/gumlet-insights.min.js";
        script.id = "gumlet-insights-sdk";
        script.async = false;
        document.body.appendChild(script);
        script.onload = () => resolve();
      }
    });
  }

  function _attachHLSObjectToGumletSDK(hlsObject) {
    let gumlet = window.gumlet.insights(gumletConfig);
    gumlet.registerHLSJSPlayer(hlsObject);
  }

  useEffect(() => {
    _loadGumletScript().then(() => {
      setGumletLoaded(true);
    });
  }, []);

  // Until the gumlet script is loaded on the page i.e. the state variable is set, show a loader to 
  // the user
  if(!gumletLoaded){
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="App">
      <ReactHlsPlayer
        src="https://video.gumlet.io/5f462c1561cf8a766464ffc4/635789f017629894d4d125a4/main.m3u8"
        autoPlay={false}
        controls={true}
        width="100%"
        height="auto"
        playerRef={playerRef}
        getHLSRef={(hlsJSObject) => {_attachHLSObjectToGumletSDK(hlsJSObject);}}
      />
    </div>
  );
}

export default App;
