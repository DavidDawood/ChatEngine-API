import { interval, map, Observable } from 'rxjs';
import { EventEmitter } from 'typeorm/platform/PlatformTools';

// export const ConvertMessageEvent = async (
//   promiseFunc: Promise<any>,
//   miliseconds: number,
// ): Promise<Observable<any>> => {
//   EventEmitter.setMaxListeners(10);
//   return interval(miliseconds).pipe(
//     await promiseFunc.then((x) => map(() => ({ data: x } as MessageEvent))),
//   );
// };
