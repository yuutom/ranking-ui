import {
  CheckIcon,
  XMarkIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';

export enum ResultStatus {
  WIN = "勝ち",
  DEFEATE = "負け",
  BYE_WIN = "不戦勝",
  BYE_DEFEATE = "不戦敗",
  TBD = "未実施"
}

export function getStatusIconAndStyle(status: ResultStatus) {
  switch (status) {
    case ResultStatus.WIN:
      return {
        icon: CheckIcon,
        bgColor: 'bg-green-500',
      };
    case ResultStatus.DEFEATE:
      return {
        icon: XMarkIcon,
        bgColor: 'bg-red-500',
      };
    case ResultStatus.BYE_WIN:
      return {
        icon: ArrowRightIcon,
        bgColor: 'bg-blue-500',
      };
    case ResultStatus.BYE_DEFEATE:
      return {
        icon: ExclamationTriangleIcon,
        bgColor: 'bg-yellow-500',
      };
    default:
      return {
        icon: ExclamationTriangleIcon,
        bgColor: 'bg-gray-400',
      };
  }
}
