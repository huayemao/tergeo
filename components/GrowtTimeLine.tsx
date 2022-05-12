import { Tooth } from '../typings/Tooth';
import { getTimeline, TimelineItem } from './IllustrationTab';

export const GrowtTimeLine = ({ tooth }: { tooth: Tooth; }) => (
  <>
    <ol className="relative border-l border-gray-200">
      {tooth &&
        getTimeline(tooth).map((e) => (
          <TimelineItem key={e.dateTime} record={e}></TimelineItem>
        ))}
    </ol>
  </>
);
