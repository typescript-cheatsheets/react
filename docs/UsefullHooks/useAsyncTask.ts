import { useCallback, useState } from 'react';

type TStatus = 'IDEAL' | 'PROCESSING' | 'ERROR' | 'SUCCESS';

/*
  Author : Adnan S Husain.
  This react typescript hooks is designed for users to make async calls and also know the current state of the request.
    usage example :
      const task = useAsyncTask(async(data : any) => await myApiRequest(data));
      
      task.run(data);
      
      useEffect(() => {
        console.log(task.status);
      },task.status)
*/

function useAsyncTask<T extends any[], R = any>(task: (...args: T) => Promise<R>) {

    const [status, setStatus] = useState<TStatus>('IDEAL');
    const [message, setMessage] = useState('');

    const run = useCallback(async (...arg: T) => {
        setStatus('PROCESSING');
        try {
            const resp: R = await task(...arg);
            setStatus('SUCCESS');
            return resp;
        } catch (error) {
            let message = error?.response?.data?.error?.message || error.message;
            setMessage(message);
            setStatus('ERROR');
            throw error
        }

    }, []);

    const reset = useCallback(() => {
        setMessage("");
        setStatus('IDEAL');
    }, []);


    return {
        run,
        status,
        message,
        reset
    }
}

export default useAsyncTask;
