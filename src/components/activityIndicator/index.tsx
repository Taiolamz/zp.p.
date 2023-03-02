import { memo } from "react";
import "./style.css";

function ActivityIndicator() {
  return (
    <div>
      <div className='loader'></div>
    </div>
  );
}

export default memo(ActivityIndicator);
