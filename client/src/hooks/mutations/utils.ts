import { useState } from 'react'
import { Result } from '../../utils/Result'

/**
 * Creates a mutation hook from an API function.
 *
 * It can be executed at any time and tracks whether it is still running.
 */
export const makeMutationHook =
  <A, E, V>(query: (args: A) => Promise<Result<E, V>>) =>
  () => {
    const [fetching, setFetching] = useState(false)

    const execute = (args: A) => {
      setFetching(true)
      return query(args).then(r => {
        setFetching(false)
        return r
      })
    }

    return { fetching, execute }
  }
