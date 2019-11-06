'use strict';


import {Reactor, TimeUnit, OutPort, InPort} from './reactor';
import * as globals from './globals';
import { ShowDeadline } from './deadline';
import { Logger } from './logger';


// This test shows the ShowDeadline reactor is able to trigger a reaction on
// a contained reactor's output.
describe('OutputEventTest', function () {

    //Tell the reactor runtime to successfully terminate after 3 seconds.
    globals.setExecutionTimeout([3, TimeUnit.secs]);
    //Ensure the test will run for 5 seconds.
    jest.setTimeout(5000);

    it('start runtime', done => {
        console.log("starting test");

        function failRuntime(){
            throw new Error("Runtime has failed.");
        };

        function failReactor(){
            throw new Error("Reactor has failed.");
        };

        var sDeadline = new ShowDeadline( done, failReactor, null, "ShowDeadline");
    
        globals.startRuntime(()=>null, failRuntime);
    })
});