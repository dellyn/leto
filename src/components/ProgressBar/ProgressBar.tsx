import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./styles.scss";

interface IProgressBar {
  numberOfTasksDone: number;
  numberOfTasksInBlank: number;
}
const ProgressBar = (props: IProgressBar) => {
  const { numberOfTasksDone, numberOfTasksInBlank } = props;

  const percantage =
    numberOfTasksDone > 0 && (numberOfTasksDone / numberOfTasksInBlank) * 100;

  return (
    <div className="progress-bar">
      <CircularProgressbar
        value={percantage}
        styles={buildStyles({
          pathColor: "#10d37f",
          trailColor: "#c5c5c5",
        })}
      />
    </div>
  );
};

export default ProgressBar;
