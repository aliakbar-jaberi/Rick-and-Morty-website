import { ThreeDot } from "react-loading-indicators";

function Loder() {
  return (
    <div className=" loder">
      <ThreeDot
        color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]}
        size="medium"
        text="loding..."
        textColor="#ffffff"
      />
    </div>
  );
}

export default Loder;
