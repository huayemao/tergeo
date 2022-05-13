import { Tooth } from '../typings/Tooth';
import { getToothBaseInfo } from '../lib/tooth';

export const Intro = ({ tooth }: { tooth: Tooth; }) => {
  // console.log(tooth)
  const { toothType } = getToothBaseInfo(tooth.name);
  return <div>{toothType}</div>;
};
