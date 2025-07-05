// components/RatingChart.tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import type { RatingRecord } from '../types/RatingRecord';
import { DateUtils } from '../utils/DateUtils';
import { getFilterdRecord } from '../data/ratingHistoryJson';

type Props = {
  ratingHistory: RatingRecord[];
  playerId: string;
};

export const RatingChart = ({ playerId }: Props) => {
  const data = getFilterdRecord(playerId)
  .map(r => ({
    date: DateUtils.formatJapaneseDate(r.date),
    rating: r.rating,
  }));

  if (data.length === 0) return <p>レーティングデータがありません。</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="linear" dataKey="rating" stroke="#8884d8" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};
