import { ResultStatus } from "../enum/ResultStatus";


export function ResultStatusIcon(result: ResultStatus) {
  switch (result) {
    case ResultStatus.WIN:
    case ResultStatus.BYE_WIN:
      return (
        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
          <div className="size-1.5 rounded-full bg-emerald-500" />
        </div>
      );
    case ResultStatus.DEFEATE:
    case ResultStatus.BYE_DEFEATE:
      return (
        <div className="flex-none rounded-full bg-rose-500/20 p-1">
          <div className="size-1.5 rounded-full bg-rose-500" />
        </div>
      );
    case ResultStatus.TBD:
    default:
      return (
        <div className="flex-none rounded-full bg-gray-300 p-1">
          <div className="size-1.5 rounded-full bg-gray-500" />
        </div>
      );
  }
}
