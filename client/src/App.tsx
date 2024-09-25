import { VideoPlayer } from "6pp";
import { useState } from "react";

const App = () => {
  const [quality, setQuality] = useState<number>(480);

  return (
    <div>
      <VideoPlayer setQuality={setQuality} src="http://localhost:5000/video" />
    </div>
  );
};

export default App;
