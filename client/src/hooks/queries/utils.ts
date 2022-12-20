import { useEffect, useState } from 'react'
import { Result } from '../../utils/Result'

/**
 * Represents the relevant request states needed to render UI properly.
 */
export type QueryState<E, V> = QueryLoading | QuerySuccess<V> | QueryFailure<E>

export type QueryLoading = { loaded: false; success: undefined }

export type QuerySuccess<V> = { loaded: true; success: true; value: V }

export type QueryFailure<E> = { loaded: true; success: false; error: E }

/**
 * Creates a query hook from an API function
 *
 * It is executed when the component is rendered and tracks whether it is
 * still running, has failed or has succeded.
 */
export const makeQueryHook =
  <A, E, V>(query: (args: A) => Promise<Result<E, V>>) =>
  (args: A) => {
    const [state, setState] = useState<QueryState<E, V>>({
      loaded: false,
      success: undefined,
    })

    useEffect(() => {
      query(args).then(r => setState({ ...r, loaded: true }))
    }, [])

    return state
  }
