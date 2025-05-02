export default BatchIterable
/**
 * @extends {GenericBatchIterable<any>}
 */
declare class BatchIterable extends GenericBatchIterable<any> {
  constructor(
    _iterable?:
      | GenericBatchIterable<any>
      | AsyncIterable<Iterable<any>>
      | Iterable<Iterable<any>>
      | undefined,
  )
}
import GenericBatchIterable from "./GenericBatchIterable.js"
//# sourceMappingURL=BatchIterable.d.ts.map
