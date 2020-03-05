declare module 'nanotimer' {
    export default class NanoTimer {
        constructor();
        
        /**
         * Clears current running interval.
         */
        clearInterval(): void;
        
        /**
         * Clears current running timeout.
         */
        clearTimeout(): void;

        /**
         * Returns true if the timer currently has a scheduled timeout, or false otherwise.
         */
        hasTimeout(): boolean;

        /**
         * 
         * @param task 
         * @param args 
         * @param interval 
         * @param callback 
         */
        setInterval(task: Function, args:[unknown]|"", interval:string, callback?: (err: string) => {}):void;

        /**
         * 
         * @param task 
         * @param args 
         * @param timeout 
         * @param callback 
         */
        setTimeout(task: Function, args:[unknown]|"", timeout:string, callback?: (err: string) => {}):void;

        /**
         * 
         * @param task 
         * @param args 
         * @param format 
         * @param callback 
         */
        time(task: Function, args:[unknown]|"", format:"s"|"m"|"u"|"n", callback?: (err: string) => {}): void;

    }
}
